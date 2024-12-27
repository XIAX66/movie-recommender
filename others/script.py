import pandas as pd

# 读取数据集
file_path = "./movies.csv"
df = pd.read_csv(file_path, low_memory=False, na_values=["", "NaN", "NULL"])
print("原始数据列名:", df.columns)

# 1. 只保留指定的列
columns_to_keep = [
    "MOVIE_ID", "NAME", "ALIAS", "ACTORS", "COVER", "DIRECTORS", 
    "DOUBAN_SCORE", "DOUBAN_VOTES", "GENRES", "LANGUAGES", 
    "MINS", "REGIONS", "RELEASE_DATE", "STORYLINE", "TAGS"
]
df = df[columns_to_keep]

# 2. 去除所有列中的前后空格
df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

# 3. 删除空值的行
df = df.dropna(subset=columns_to_keep)

# 4. 转换数值列的数据类型（如果需要）
df['MOVIE_ID'] = pd.to_numeric(df['MOVIE_ID'], errors='coerce')
df['DOUBAN_SCORE'] = pd.to_numeric(df['DOUBAN_SCORE'], errors='coerce')
df['DOUBAN_VOTES'] = pd.to_numeric(df['DOUBAN_VOTES'], errors='coerce')
df['MINS'] = pd.to_numeric(df['MINS'], errors='coerce')

# 5. 再次删除因转换无效而变成 NaN 的行
df = df.dropna(subset=['MOVIE_ID', 'DOUBAN_SCORE', 'DOUBAN_VOTES', 'MINS'])

# 6. 保存清理后的数据到新的 CSV 文件
output_file = "cleaned_movies.csv"
df.to_csv(output_file, index=False, encoding='utf-8')

print(f"清理后的数据已保存到 {output_file}")
# # import pandas as pd

# # # 读取数据集
# # file_path = "./cleaned_movies_metadata.csv"
# # df = pd.read_csv(file_path, low_memory=False, na_values=["", "NaN", "NULL"])

# # # 显示列名
# # print(df.columns)

# # # 检查每列的空值数量
# # print("每列的空值数量:")
# # print(df.isnull().sum())

# # # 处理空值 - 删除 'overview' 列中有空值的行
# # df_cleaned = df.dropna(subset=['overview'])

# # # 或者，填充 'overview' 列中的空值为一个默认值（如空字符串）
# # # df['overview'] = df['overview'].fillna("No overview available")

# # # 处理空值后，重新检查空值数量
# # print("处理空值后的每列空值数量:")
# # print(df_cleaned.isnull().sum())  # 如果选择填充，则检查填充后的结果

# # # 保存清理后的数据到新的 CSV 文件
# # output_file = "cleaned_movies_metadata.csv"
# # df_cleaned.to_csv(output_file, index=False, encoding='utf-8')

# # print(f"清理后的数据已保存到 {output_file}")
# import pandas as pd

# # 读取数据集
# file_path = "./cleaned_movies_metadata.csv"
# df = pd.read_csv(file_path, low_memory=False, na_values=["", "NaN", "NULL"])

# # 检查每列的空值数量
# print("每列的空值数量:")
# print(df.isnull().sum())

# # 确保 'id' 列为字符串类型（以便更好地检查内容）
# df['id'] = df['id'].astype(str)

# # 筛选出无法转换为整数的 `id` 值
# invalid_ids = df[~df['id'].str.isdigit()]

# # 打印无法转换的记录
# print("以下记录的 'id' 无法转换为整数:")
# print(invalid_ids)

# # 删除这些记录
# df_cleaned = df[df['id'].str.isdigit()]

# # 将 `id` 列转换为整数类型
# df_cleaned['id'] = df_cleaned['id'].astype(int)

# # 检查清洗后数据的空值数量
# print("清洗后数据的空值数量:")
# print(df_cleaned.isnull().sum())

# # # 保存清理后的数据到新的 CSV 文件
# # output_file = "cleaned_movies_metadata.csv"
# # df_cleaned.to_csv(output_file, index=False, encoding='utf-8')
# # print(f"清理后的数据已保存到 {output_file}")