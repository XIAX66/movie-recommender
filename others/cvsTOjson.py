import pandas as pd

# 读取 CSV 文件
csv_file = "cleaned_movies.csv"  # 替换为你的实际文件路径
json_file = "cleaned_movies.json"  # 输出的 JSON 文件路径

try:
    # 使用 Pandas 加载 CSV 文件
    df = pd.read_csv(csv_file)

    # 将 DataFrame 转换为 JSON 文件
    df.to_json(json_file, orient="records", lines=False, force_ascii=False, indent=4)

    print(f"成功将 {csv_file} 转换为 {json_file}")
except Exception as e:
    print(f"转换失败: {e}")