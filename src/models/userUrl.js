const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userUrlSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const UserUrl = mongoose.model('userUrl', userUrlSchema);

module.exports = UserUrl;
