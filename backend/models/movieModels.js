const mongoose = require('mongoose');

// 定义 MovieSchema
const MovieSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
      alias: 'MOVIE_ID',
    },
    NAME: {
      type: String,
      required: true,
    },
    ALIAS: {
      type: String,
    },
    ACTORS: {
      type: String, // 或者 Array<String>，如果你希望以数组形式存储
    },
    COVER: {
      type: String, // URL 可以进一步验证格式
    },
    DIRECTORS: {
      type: String, // 或者 Array<String>，如果需要更具体
    },
    DOUBAN_SCORE: {
      type: Number,
      default: 0.0,
    },
    DOUBAN_VOTES: {
      type: Number,
      default: 0.0,
    },
    GENRES: {
      type: String, // 或者 Array<String>，如果需要更灵活的结构
    },
    LANGUAGES: {
      type: String,
    },
    MINS: {
      type: Number,
      default: 0.0,
    },
    REGIONS: {
      type: String, // 如果多地区需要解析为数组，可以改为 Array<String>
    },
    RELEASE_DATE: {
      type: Date, // 使用 Date 类型处理时间
    },
    STORYLINE: {
      type: String,
    },
    TAGS: {
      type: String, // 或者 Array<String>，根据需求存储标签
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  },
);

const Movie = mongoose.model('Movie', MovieSchema);

// 导出模型
module.exports = Movie;
