const fs = require('fs');
const Post = require('../models/posts');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      count: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: post,
  });
};
exports.createPost = async (req, res, next) => {
  const newPost = req.body;
  const imageName = req.file.filename;
  newPost.image = imageName;
  try {
    await Post.create(newPost);
    res.status(201).json({
      status: 'success',
      data: newPost,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error occured!',
    });
  }
};
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  let newImage = '';
  if (req.file) {
    newImage = req.file.filename;
    try {
      fs.unlinkSync(`./uploads/${req.body.old_image}`);
    } catch (error) {
      console.log(error);
    }
  } else {
    newImage = req.body.old_image;
  }
  const newPost = req.body;
  newPost.image = newImage;
  try {
    await Post.findByIdAndUpdate(id, newPost);
    res.status(200).json({
      status: 'success',
      message: 'Updated successfully',
      data: newPost,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to update',
    });
  }
};
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Post.findByIdAndDelete(id);
    if (result.image !== '') {
      try {
        fs.unlinkSync(`./uploads/${result.image}`);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({
      status: 'success',
      message: 'Post has been deleted successfully',
    });
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: error.message,
    });
  }
};
