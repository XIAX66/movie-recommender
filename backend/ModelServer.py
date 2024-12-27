from flask import Flask, request, jsonify
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, hash
from pyspark.ml.recommendation import ALSModel
from pyspark.sql.types import IntegerType
from pyspark.sql import Row
import hashlib

def convert_to_numeric_id(mongo_id):
    hash_object = hashlib.md5(mongo_id.encode())
    numeric_id = int(hash_object.hexdigest()[:8], 16) % (2**31)
    return numeric_id

app = Flask(__name__)

# 初始化 SparkSession
spark = SparkSession.builder \
    .appName("MovieLensAnalysis") \
    .config("spark.executor.memory", "4g") \
    .config("spark.driver.memory", "4g") \
    .getOrCreate()

# 设置 HDFS 路径
hdfs_path = "hdfs://localhost:9000/usr/xiax/archive/"

# 加载 movies.csv 和 ratings.csv
movies_df = spark.read.csv(hdfs_path + "cleaned_movies.csv", header=True, inferSchema=True)
ratings_df = spark.read.csv(hdfs_path + "filtered_ratings.csv", header=True, inferSchema=True)

# 删除包含空值的行
movies_df = movies_df.dropna()
ratings_df = ratings_df.dropna()

# 将 USER_MD5 和 MOVIE_ID 转换为数值类型
ratings_df = ratings_df.withColumn("userId", hash(col("USER_MD5"))) \
                       .withColumn("movieId", col("MOVIE_ID").cast("int"))

model_path = "file:///Users/xiax/data/code/movie-recommender/als_model"

try:
    loaded_model = ALSModel.load(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print("Model not found. Training a new model.")

@app.route('/api/v1/recommend', methods=['POST'])
def recommend():
    data = request.json
    new_user_id = convert_to_numeric_id(data.get("_id"))
    new_user_ratings = data.get("ratedMovies")

    # Create new user ratings DataFrame
    new_user_ratings_data = [
        Row(userId=new_user_id, movieId=int(movie_id), RATING=float(rating))
        for movie_id, rating in new_user_ratings.items()
    ]
    new_user_ratings_df = spark.createDataFrame(new_user_ratings_data)

    # Add missing columns to match ratings_df
    new_user_ratings_df = new_user_ratings_df \
        .withColumn("RATING_ID", lit(None).cast("int")) \
        .withColumn("USER_MD5", lit(None).cast("string")) \
        .withColumn("MOVIE_ID", col("movieId").cast("int")) \
        .withColumn("RATING_TIME", lit(None).cast("timestamp"))

    # Align column order
    new_user_ratings_df = new_user_ratings_df.select(
        "RATING_ID", "USER_MD5", "MOVIE_ID", "RATING", "RATING_TIME", "userId", "movieId"
    )
    
    ratings_df.show()
    new_user_ratings_df.show()
    print("ratings_df columns:", ratings_df.columns)
    print("new_user_ratings_df columns:", new_user_ratings_df.columns)
    
    # Combine datasets
    updated_ratings_df = ratings_df.union(new_user_ratings_df)

    # Retrain the model if necessary
    global loaded_model
    if loaded_model:
        from pyspark.ml.recommendation import ALS
        als = ALS(
            maxIter=5,
            regParam=0.05,
            rank=10,
            userCol="userId",
            itemCol="movieId",
            ratingCol="RATING",
            coldStartStrategy="drop"
        )
        loaded_model = als.fit(updated_ratings_df)
        loaded_model.write().overwrite().save(model_path)

    # Predict for new user
    unrated_movies = movies_df.join(
        new_user_ratings_df.select("movieId"), 
        movies_df["MOVIE_ID"] == new_user_ratings_df["movieId"],
        how="left_anti"
    )

    user_unrated_movies = unrated_movies.select(
        col("MOVIE_ID").cast(IntegerType()).alias("movieId")
    ).filter(col("movieId").isNotNull()).withColumn("userId", lit(new_user_id))

    recommendations = loaded_model.transform(user_unrated_movies)
    top_20_recommendations = recommendations.orderBy(col("prediction").desc()).limit(20)

    recommended_movies = top_20_recommendations.join(
        movies_df,
        top_20_recommendations["movieId"] == movies_df["MOVIE_ID"]
    ).select("MOVIE_ID", "NAME", "GENRES", "REGIONS", "RELEASE_DATE").orderBy(col("prediction").desc())

    result = recommended_movies.toPandas().to_dict(orient="records")
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)