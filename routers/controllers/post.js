const postModel = require("./../../db/models/posts");

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
    postModel.find({ isDel: false, type: "post" }).then((result) => {
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
    postModel.find({ isDel: false, type: "research" }).then((result) => {
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
    postModel.find({ isDel: false, type: "event" }).then((result) => {
      // console.log(result);
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//there is a problem with this code, 
//but i feel sleepy so I will continue tomorrow ان شاء الله
const getPostById = (req, res) => {
  const { id } = req.params;
  try {
    console.log("result");

    postModel.findById(id).then(async (result) => {
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
  getPosts,
  getResearch,
  getEvent,
  getPostById,
};
