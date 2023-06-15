const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/add-comment", PostsController.addCommentToPost);
router.post("/add-like", PostsController.UpdateLikePost);
router.post("/add-like-comment", PostsController.UpdateLikeComment);

module.exports = router;

// addComment controller invoked in here