const postModel = require("./../../db/models/posts");
const commentModel = require("./../../db/models/comments");

// new post by user
const newPost = async (req, res) => {
  const { title, desc } = req.body;
  try {
    const newPost = new postModel({
      title,
      desc,
      type: "post",
      user: req.token.id,
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

// new research by admin or specialist
const newResearch = async (req, res) => {
  const { title, desc } = req.body;
  try {
    const newPost = new postModel({
      title,
      desc,
      type: "research",
      user: req.token.id,
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
// new event by admin
const newEvent = async (req, res) => {
  const { title, desc } = req.body;
  try {
    const newPost = new postModel({
      title,
      desc,
      type: "event",
      user: req.token.id,
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
// get all posts
const getPosts = (req, res) => {
  try {
    postModel
      .find({ isDel: false, type: "post" })
      .populate("user", "name -_id")
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
//get all research
const getResearch = (req, res) => {
  try {
    postModel
      .find({ isDel: false, type: "research" })
      .populate("user", "name -_id")
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
//get all events
const getEvent = (req, res) => {
  try {
    postModel
      .find({ isDel: false, type: "event" })
      .populate("user", "name -_id")
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPostById = (req, res) => {
  const { id } = req.params;
  try {
    postModel
      .findById(id)
      .populate("user", "name -_id")
      .then(async (result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getResearchById = (req, res) => {
  const { id } = req.params;
  try {
    postModel
      .findById(id)
      .populate("user", "name -_id")
      .then(async (result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventById = (req, res) => {
  const { id } = req.params;
  try {
    postModel
      .findById(id)
      .populate("user", "name -_id")
      .then(async (result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

//delete a post
const deletePost = (req, res) => {
  const { id } = req.params;
  try {
    postModel.findOne({ post: id, isDel: false }).then((result) => {
      if (result) {
        postModel
          .findByIdAndUpdate(id, { isDel: true }, { new: true })
          .exec()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//delete any post by admin
const deletePostByAdmin = (req, res) => {
  const { id } = req.params;
  try {
    postModel
      .findByIdAndUpdate(id, { isDel: true }, { new: true })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

// all comments of the post
const postComments = async (req, res) => {
  const { id } = req.params; //post id
  try {
    let allPost = [];
    postModel
      .findOne({ _id: id }, { isDel: false })
      .populate("user")
      .then((result) => {
        allPost.push(result);
        commentModel
          .find({ post: id })
          .populate("user", "name")
          .then((result2) => {
            allPost.push(result2);
            res.status(200).json(allPost);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;
  try {
    postModel
      .findOne({ post: id, user: req.token.id, isDel: false })
      .populate("user", "name -_id")
      .then((result) => {
        if (result) {
          postModel
            .findByIdAndUpdate(id, { title, desc, _id: id }, { new: true })
            .then((result) => {
              res.status(200).json(result);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  newPost,
  newResearch,
  newEvent,
  getPosts,
  getResearch,
  getEvent,
  getPostById,
  getResearchById,
  getEventById,
  deletePost,
  deletePostByAdmin,
  postComments,
  updatePost,
};