import express, { Express, Request, Response } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

// GET ALL POSTS --- Add pic + user pics
const posts_get = async (req: Request, res: Response) => {
  try {
    const postsData = await Post.find({})
      .select("text comments likes createdAt")
      .populate({
        path: "comments",
        select: "text likes createdAt",
        populate: { path: "user", select: "first_name last_name" }, // + profile pic
      })
      .populate({ path: "user", select: "first_name last_name" }) // + profile pic
      .sort({ createdAt: "desc" })
      .exec();
    if (postsData) {
      res.json({
        posts: postsData.map((post) => {
          post.text = validator.unescape(post.text);
          return post;
        }),
      });
    } else {
      res.status(404).json({ info: "No posts yet." });
    }
  } catch {
    res.status(404).json({ info: "No posts yet." });
  }
};

// POST CREATE --- Add pic + user pics
const post_create = [
  body("text")
    .trim()
    .exists()
    .withMessage("Post must be present")
    .isLength({ min: 5 })
    .withMessage("Post must be at least 5 characters long.")
    .isLength({ max: 300 })
    .withMessage("Post must be maximum 300 characters long.")
    .escape(),
  async (req: Request, res: Response) => {
    const { text } = req.body;
    const { userID } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(text),
      });
    }

    try {
      const user = await User.findById(userID); // Get the post writer
      if (user) {
        const newPost = new Post({
          user: userID,
          text,
          comments: [],
          likes: [],
        });
        Promise.all([
          newPost.save(),
          user.updateOne({ $push: { posts: newPost } }),
        ])
          .then(() => {
            res.status(200).json({
              info: "Post was created successfully.",
            });
          })
          .catch((err) => {
            res.status(500).json({ info: err.message });
          });
      } else {
        res
          .status(404)
          .json({ info: "No user was not found to make this post." });
      }
    } catch {
      res
        .status(404)
        .json({ info: "No user was not found to make this post." });
    }
  },
];

// GET POST --- Add pic + user pics
const post_get = async (req: Request, res: Response) => {
  const { postID } = req.params;
  try {
    const post = await Post.findById(postID)
      .populate({
        path: "comments",
        select: "text likes createdAt",
        populate: { path: "user", select: "first_name last_name" }, // + profile pic
      })
      .populate({ path: "user", select: "first_name last_name" }); // + profile pic
    if (post) {
      post.text = validator.unescape(post.text);
      res.json({ post });
    } else {
      res.status(404).json({ info: "This post doesn't exist" });
    }
  } catch {
    res.status(404).json({ info: "This post doesn't exist." });
  }
};

// UPDATE A POST - COMPLETE
// router.put("/:postID/:userID", auth, postControllers.post_update);
const post_update = [
  body("updatedText")
    .trim()
    .exists()
    .withMessage("Post must be present")
    .isLength({ min: 5 })
    .withMessage("Post must be at least 5 characters long.")
    .isLength({ max: 300 })
    .withMessage("Post must be maximum 300 characters long.")
    .escape(),
  async (req: Request, res: Response) => {
    const { postID, userID } = req.params;
    const { updatedText } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(updatedText),
      });
    }
    try {
      const post = await Post.findById(postID);
      const user = await User.findById(userID);
      if (post && user && post.user?.equals(userID)) {
        await Post.findByIdAndUpdate(postID, {
          text: updatedText,
        }).then(() => {
          res.status(200).json({ info: "Post was successfully updated!" });
        });
      } else {
        res.status(403).json({ info: "You cannot edit this post." });
      }
    } catch {
      res.status(404).json({ info: "This post doesn't exist." });
    }
  },
];

const post_delete = asyncHandler(async (req, res, next) => {
  const { postID, userID } = req.params;
  const post = await Post.findById(postID);
  const user = await User.findById(userID);
  if (post && user) {
    // Clean-up sequence
    const comments = post.comments;
    for (const comment of comments) {
      await Comment.findByIdAndDelete(comment);
    }
    Promise.all([
      post.deleteOne(),
      User.findByIdAndUpdate(userID, { $pull: { posts: postID } }),
    ])
      .then(() => {
        res.status(200).json({ info: "Post was deleted successfully!" });
      })
      .catch((err) => {
        res.status(500).json({ info: err.message });
      });
  } else {
    res.status(404).json({ info: "You cannot delete this post." });
  }
});

const post_like = asyncHandler(async (req, res, next) => {
  const { postID, userID }: any = req.params;
  const post = await Post.findById(postID);
  if (post) {
    if (post.likes.includes(userID)) {
      //@ts-ignore
      await post.updateOne({ $pull: { likes: userID } });
      res.json({ info: `${userID} has disliked post ${postID}` });
    } else {
      await post.updateOne({ $push: { likes: userID } });
      res.json({ info: `${userID} has liked post ${postID}` });
    }
  } else {
    res.status(404).json({ info: "Post was not found!" });
  }
});
export default {
  posts_get,
  post_get,
  post_create,
  post_update,
  post_delete,
  post_like,
};
