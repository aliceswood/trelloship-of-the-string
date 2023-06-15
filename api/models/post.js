const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  message: String,
  likedByUsers: [],
});

const PostSchema = new mongoose.Schema({
  username: String,
  message: String,
  comments: [CommentsSchema],
  likedByUsers: []
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// get comment ability in here