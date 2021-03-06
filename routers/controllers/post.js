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
      isVerified: true,
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  } catch (error) {
    // console.log(error);
    res.status(400).send(error);
  }
};

// new research by admin or specialist
const newResearch = async (req, res) => {
  const { title, desc, location } = req.body;
  try {
    const newPost = new postModel({
      title,
      desc,
      location,
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
  const { title, desc, img } = req.body;
  try {
    const newPost = new postModel({
      title,
      desc,
      img,
      isVerified: true,
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

// new event by admin
const newCenter = async (req, res) => {
  const { title, desc, img, location } = req.body;
  try {
    const newPost = new postModel({
      title,
      desc,
      img,
      location,
      isVerified: true,
      type: "center",
      user: req.token.id,
    });
    newPost
      .save()
      .then((result) => {
        // console.log(result);
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
      .find({ isDel: false, isVerified: true, type: "post" })
      .populate("user")
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
      .find({ isDel: false, type: "research", isVerified: true })
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
      .populate("user", " -_id")
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

//get all centers
const getCenter = (req, res) => {
  try {
    postModel
      .find({ isDel: false, type: "center" })
      .populate("user", "name -_id")
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => 
      console.log(err)
      );
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    await postModel
      .findById(id)
      .populate("user comments")
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => console.log(err));
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
      .populate("user", " -_id")
      .then(async (result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCenterById = (req, res) => {
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
          .find({ post: id, isDel: false })
          .populate("user")
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
  const { title, desc, location, img } = req.body;
  // console.log(title, desc);
  try {
    postModel
      .findOne({
        post: id,
        user: req.token.id,
        isDel: false,
      })
      .populate("user", "name -_id")
      .then((result) => {
        if (result) {
          postModel
            .findByIdAndUpdate(
              id,
              { title, desc, location, img, _id: id, isVerified: false },
              { new: true }
            )
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

// approve post by admin
const approvePost = (req, res) => {
  const { id } = req.body;
  try {
    postModel
      .findOne({
        post: id,
        isDel: false,
      })
      .populate("user", "name -_id")
      .then((result) => {
        if (result) {
          postModel
            .findByIdAndUpdate(id, { isVerified: true }, { new: true })
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

// all user posts
const getPostsByUserId = async (req, res) => {
  const { user } = req.body;
  try {
    postModel
      .find({ user })
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => console.log("err:", err));
  } catch (error) {
    res.status(400).json(error);
  }
};

// all research needed approve
const reseachNeedApprove = async (req, res) => {
  try {
    postModel
      .find({ isDel: false, isVerified: false, type: "research" })
      .populate("user", "name -_id")
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = {
  newPost,
  newResearch,
  newEvent,
  newCenter,
  getPosts,
  getResearch,
  getEvent,
  getCenter,
  getPostById,
  getResearchById,
  getEventById,
  getCenterById,
  deletePost,
  deletePostByAdmin,
  postComments,
  updatePost,
  approvePost,
  getPostsByUserId,
  reseachNeedApprove,
};
