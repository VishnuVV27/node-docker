const Post = require("../models/blogpost");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.json({
      status: "Success",
      results: posts.length,
      data: { posts },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      return res.status(500).json({
        status: "Not found",
      });
    }
    res.json({
      status: "Success",
      data: post,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.json({
      status: "Created",
      data: { post },
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "Success",
      data: post,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.json({
      status: "Success",
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
