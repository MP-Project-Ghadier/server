const commentModel = require("../../db/models/comments");
const postModel = require("../../db/models/posts");

// add new comment
const newComment = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body;
  try {
    const newComment = new commentModel({
      desc,
      user: req.token.id,
      post: id,
    });
    newComment.save().then((result) => {
      postModel
        .findByIdAndUpdate(id, { $push: { comments: result._id } })
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
    res.status(201).json(result);
  } catch {
    (err) => {
      res.status(400).json(err);
    };
  }
};

const comments = (req, res) => {
  try {
    commentModel
      .find({ isDel: false })
      .populate("user post")
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

// update comment by id
const updateComment = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body; //update comment desc
  try {
    commentModel
      .findByIdAndUpdate(id, { desc }, { new: true })
      .exec()
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

// soft delete to one comment
const deleteComment = (req, res) => {
  const { id } = req.params; //comment id
  try {
    commentModel
      .findByIdAndUpdate(id, { isDel: true }, { new: true })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  newComment,
  comments,
  updateComment,
  deleteComment,
};
