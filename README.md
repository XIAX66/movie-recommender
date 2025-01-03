# movie-recommender

### **一、项目结构与框架**

**项目结构概览**

项目包含以下主要模块和目录，划分为前端、后端、推荐模型及其他资源：

```
.
├── als_model         # Spark ALS 模型文件（itemFactors、userFactors 等）
├── backend           # 后端代码及相关资源
│   ├── controllers   # 控制器层，包含用户和电影的业务逻辑
│   ├── data          # 数据处理脚本及样例数据
│   ├── models        # 数据模型（Mongoose 定义）
│   ├── routes        # 路由定义
│   ├── utils         # 工具函数（错误处理、异步处理等）
│   ├── server.js     # 后端服务主入口
│   └── ModelServer.py # 基于 Flask 和 PySpark 的推荐模型服务
├── frontend          # 前端代码及相关资源
│   ├── src           # 前端核心代码
│   │   ├── components # 通用组件
│   │   ├── context    # Context API 状态管理
│   │   ├── features   # 前端页面及功能模块
│   │   ├── ui         # UI 页面
│   │   └── utils      # 工具函数
│   ├── public        # 公共静态资源
│   └── vite.config.js # Vite 项目配置文件
├── others            # 其他辅助资源
│   ├── 脚本和文档
│   ├── 开发流程图
│   └── 项目结构图
├── LICENSE           # 项目许可证
├── README.md         # 项目说明文档
└── structure.txt     # 生成的项目目录结构文本
```

**项目框架**

1. **前端**

• **框架与工具**: 使用 React 框架和 Vite 构建工具。

• **样式**: 使用 TailwindCSS 进行样式设计，Ant Design 作为组件库。

• **状态管理**: 采用 Context API 和 useReducer 管理全局状态。

• **核心功能**: 提供用户注册、登录、电影推荐展示、用户历史记录(待开发)等页面。

2. **后端**

• **框架**: Node.js 和 Express。

• **数据库**: MongoDB，使用 Mongoose 定义模型。

• **功能模块**:

• 用户认证（JWT + Crypto）。

• API 接口（电影推荐、用户行为数据上传等）。

• 数据预处理（通过 Python 脚本清洗数据）。

• **CORS 与安全**: 配置 Helmet 和 CORS，防御 NoSQL 注入与 XSS 攻击。

3. **推荐模型**

• **模型类型**: 使用 Spark ALS 模型。

• **数据存储**: HDFS 存储电影数据及用户评分。

• **模型加载与更新**: 提供基于 Flask 的 API，支持动态加载模型与实时推荐。

4. **部署环境**

• 前端与后端独立运行，采用 Axios 进行跨域交互。

• 推荐系统运行在本地 Spark 集群，数据通过 HDFS 管理。

**技术亮点**

• **高性能推荐模型**: Spark ALS 提供了分布式计算能力，能处理大规模用户和电影数据。

• **全栈开发**: 前后端分离，开发体验优化，同时提供了灵活的扩展能力。

• **数据安全**: 完备的安全处理策略，保障用户数据的安全性和可靠性。

### **二、项目设计与实践**

**2.1 系统架构设计**

本项目采用前后端分离架构，推荐系统服务通过 Spark 和 Flask 提供支持，系统整体架构如下：

1. **前端**

• **技术栈**: React + Vite + TailwindCSS + Ant Design。

• **主要功能**:

• 用户界面设计，包括推荐页面、用户信息展示、电影详情等。

• 动态路由与页面切换，通过 React Router 实现。

• Axios 实现与后端的 API 通信。

2. **后端**

• **技术栈**: Node.js + Express + MongoDB。

• **核心模块**:

• **用户管理**: 用户注册、登录、密码加密（JWT + Crypto）、权限验证。

• **电影数据管理**: 提供电影数据查询、用户评分上传等功能。

• **API 接口**: 提供 RESTful API 与前端交互。

3. **推荐模型服务**

• **技术栈**: PySpark + Flask。

• **模型设计**:

• 使用 Spark ALS 算法训练推荐模型。

• 支持基于用户评分数据的实时推荐。

• **数据处理**:

• 使用 HDFS 存储电影数据（清洗后）和用户评分数据。

• 动态更新模型以适应新用户评分数据。

**2.2 数据流与交互设计**

1. **用户评分上传与存储**

• 用户在前端选择电影评分。

• Axios 将评分数据发送至后端（Node.js），后端处理后存入 MongoDB。

• 后端通过 Flask 接口将评分数据同步至 Spark 环境，更新推荐模型。

2. **推荐请求与响应**

• 用户登录后触发推荐请求。

• 后端调用 Flask 服务，根据用户历史评分生成推荐电影。

• Spark 计算完成后，返回推荐结果，前端展示推荐内容。

3. **数据预处理**

• 后端通过 Python 脚本清洗原始数据，生成符合 Spark 模型训练的 CSV 文件。

• 数据存储于 HDFS，并加载至 Spark 环境进行模型训练。

**2.3 核心功能实现**

1. **推荐算法实现**

• **Spark ALS 模型训练**:

• 数据格式: 用户评分数据格式为 (userId, movieId, rating)。

• 模型参数: 使用 10 个隐语义特征，5 次迭代。

• **实时推荐**:

• 基于用户未评分电影进行预测。

• 提供评分最高的前 20 部电影作为推荐结果。

2. **用户认证与安全**

• **密码加密**: 使用 crypto.createHash('sha256') 对密码加密。

• **身份验证**: 使用 JWT 生成令牌，确保 API 安全访问。

• **防护策略**:

• 使用 Helmet 设置安全 HTTP 头。

• 配置 CORS 允许前端跨域访问。

3. **前端交互**

• **状态管理**: 使用 Context API 管理用户登录状态、推荐列表等。

• **动态路由**: React Router 实现页面切换。

• **组件化开发**: 通过 Ant Design 和 TailwindCSS 快速构建 UI。

**2.4 项目实践**

1. **开发工具与环境**

• **开发工具**: VS Code、MongoDB Compass、Postman（API 测试）、Draw.io（流程图）。

• **部署环境**:

• 前端运行在 Vite 本地服务器。

• 后端与推荐服务运行于独立的本地环境，Spark 使用 HDFS 数据存储。

2. **问题与解决**

• **跨域问题**: 配置 CORS 中间件解决前后端跨域问题。

• **大数据存储**: 使用 HDFS 存储清洗后的电影数据。

• **模型更新效率**: 针对新用户评分，使用 Spark 重新训练模型。

**2.5 总结与优化方向**

• **已完成**:

• 实现从数据预处理到推荐的完整流程。

• 构建了用户友好的前端界面。

• **优化方向**:

• 引入消息队列（如 Kafka）处理实时评分数据。

• 优化 Spark 模型训练流程，减少延迟。

• 部署至云平台以提高系统扩展性。

### **三、页面成果展示**

![[录屏2024-12-26 下午2.36.11.mov]]
（若无法播放可查看附件）

### **四、系统使用说明**

**4.1 数据准备**

1. **确保数据集已存储至 HDFS**

• 将清洗后的 movies.csv 和 ratings.csv 文件上传到 HDFS 中：

```
hdfs dfs -put cleaned_movies.csv /usr/xiax/archive/

hdfs dfs -put filtered_ratings.csv /usr/xiax/archive/
```

• 确保 HDFS 服务正常运行。

**4.2 启动推荐模型服务**

1. 进入后端目录：

```
cd backend
```

2. 安装 Python 依赖：

```
pip install -r requirements.txt
```

3. 修改 ModelServer.py 中的路径：

• **文件路径**: 将 model_path 修改为推荐模型的本地路径。

• **HDFS 路径**: 将 hdfs_path 修改为实际 HDFS 数据集路径。

4. 启动推荐服务：

```
python3 ModelServer.py
```

**4.3 启动后端服务**

1. 确保后端依赖安装：

```
npm i --legacy-peer-deps
```

2. 在 backend 目录下配置环境变量文件 config.env：

```
_NODE__ENV=production

_PORT_=3000

_USERNA_ME=xiayh66

_DATABA_SE_PASSWORD=EsS2OFPaWs6JwqcL

_DATABA_SE_LOCAL=mongodb://localhost:27017/movie_recommender

_DATABA_SE=mongodb+srv://xiayh66:<PASSWORD>@cluster0.fnghc.mongodb.net/movie_recommender?retryWrites=true&w=majority&appName=Cluster0



_JWT__SECRET=xx-ultra-secure-and-ultra-long-secret

_JWT__EXPIRES_IN=90d

_JWT__COOKIE_EXPIRES_IN=90



_EMAIL__USERNAME=100d859c4ea04c

_EMAIL__PASSWORD=2023d382a3d7ba

_EMAIL__HOST=sandbox.smtp.mailtrap.io

_EMAIL__PORT=25
```

3. 启动后端服务：

```
npm start
```

**4.4 启动前端服务**

1. 进入前端目录：

```
cd frontend
```

2. 安装前端依赖：

```
  npm i --legacy-peer-deps
```

3. 启动开发服务器：

```
  npm run dev
```

4. 在浏览器中访问开发环境地址（通常为 http://localhost:5173）。

**4.5 注意事项**

1. 确保 HDFS 服务和 Spark 环境已正确配置并启动。
2. 如果模型文件路径不一致，需在 ModelServer.py 中同步修改 model_path。
3. MongoDB 使用远程服务时，需确保网络连接正常(使用 amazon cloud 存储，需要科学上网)并修改 DATABASE 的 `<PASSWORD>` 占位符为实际密码。
4. 邮件服务配置需验证 EMAIL_HOST 和 EMAIL_PORT 是否匹配。

完成以上步骤后，整个推荐系统将正常运行，可通过前端页面体验完整的推荐功能。

### 五、**说明**

本项目所有部分均为 22 届计科夏宇晗开发，由于功能尚不完善，暂未打包，项目文件仅为开发文件，配置过程如遇到问题，敬请联系：`xiayh66@gmail.com`
