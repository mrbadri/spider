const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spiderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    haveInfo: {
      type: Boolean,
      default: false,
    },
    source: String,
    email: String,
    bio: String,
    instagram: String,
    website: String,
    profile: String,
  },
  { timestamps: true }
);

const Spider = mongoose.model('spider', spiderSchema);

module.exports = Spider;
