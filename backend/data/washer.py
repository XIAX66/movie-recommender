import json
import requests

# 读取 testData.json 文件
with open("data/movies_metadata.json", "r") as file:
    data = json.load(file)

# 遍历每部电影，调用 API 获取 poster_path
for movie in data:
    imdb_id = movie.get("imdb_id")
    if not imdb_id:
        continue
    
    api_url = f"https://api.themoviedb.org/3/find/{imdb_id}?api_key=4f3616d4b27d3b04bc92b6084eebd54f&external_source=imdb_id"
    response = requests.get(api_url)
    
    if response.status_code == 200:
        api_data = response.json()
        movie_results = api_data.get("movie_results", [])
        if movie_results and "poster_path" in movie_results[0]:
            poster_path = movie_results[0]["poster_path"]
            # 添加 image_url 属性
            movie["image_url"] = f"https://image.tmdb.org/t/p/w500{poster_path}"
        else:
            movie["image_url"] = None  # 如果没有 poster_path
    else:
        movie["image_url"] = None  # 如果 API 请求失败

# 保存结果到新的 JSON 文件
with open("data/movies_metadata.json", "w") as file:
    json.dump(data, file, indent=4)

print("数据更新完成，保存为 movies_metadata.json")