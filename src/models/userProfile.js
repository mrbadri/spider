const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spiderSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    categories: {
      type: [String],
      default: []
    },
    haveInfo: {
      type: Boolean,
      default: false
    },
    source: String,
    email: String,
    bio: String,
    instagram: String,
    website: String,
    location: String,
    medium: String,
    linkedin: String,
    twitter: String,
    skills: {
      type: [String],
      default: []
    },
    members: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', spiderSchema);

module.exports = UserProfile;
