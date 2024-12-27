import pandas as pd

# 文件路径
cleaned_movies_path = "./cleaned_movies.csv"
ratings_path = "./ratings.csv"
output_ratings_path = "./filtered_ratings.csv"

# 读取 cleaned_movies.csv，获取并转换 MOVIE_ID 列为数值类型
cleaned_movies_df = pd.read_csv(cleaned_movies_path)
cleaned_movies_df['MOVIE_ID'] = pd.to_numeric(cleaned_movies_df['MOVIE_ID'], errors='coerce')  # 转为数字，错误转换为 NaN
cleaned_movies_df = cleaned_movies_df.dropna(subset=['MOVIE_ID'])  # 删除 MOVIE_ID 为空的行
valid_movie_ids = set(cleaned_movies_df['MOVIE_ID'].astype(int))  # 转为整数集合

# 读取 ratings.csv，并转换 MOVIE_ID 列为数值类型
ratings_df = pd.read_csv(ratings_path)
ratings_df['MOVIE_ID'] = pd.to_numeric(ratings_df['MOVIE_ID'], errors='coerce')  # 转为数字，错误转换为 NaN
ratings_df = ratings_df.dropna(subset=['MOVIE_ID'])  # 删除 MOVIE_ID 为空的行

# 过滤掉 ratings.csv 中不在 valid_movie_ids 中的行
filtered_ratings_df = ratings_df[ratings_df['MOVIE_ID'].astype(int).isin(valid_movie_ids)]

# 保存过滤后的数据
filtered_ratings_df.to_csv(output_ratings_path, index=False, encoding='utf-8')

print(f"清理后的评分数据已保存到 {output_ratings_path}")