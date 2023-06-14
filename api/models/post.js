const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  message: String,
});

const PostSchema = new mongoose.Schema({
  username: String,
  message: String,
  comments: [CommentsSchema],
  likeCount: {type: Number, default: 0},
  photo: {type: String},
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// get comment ability in here