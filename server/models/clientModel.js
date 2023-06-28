const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "1687782150224-default_profile_photo.jpg",
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Professional: {
      type: Schema.Types.ObjectId,
      ref: "Professional",
    },
    Shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    Chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
