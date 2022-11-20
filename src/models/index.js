const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spiderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    category: String,
    email: String,
    bio: String,
    instagram: String,
    website: String,
    profile: String,
    getInfo: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Spider = mongoose.model('spider', spiderSchema);

module.exports = Spider;
