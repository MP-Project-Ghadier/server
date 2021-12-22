const express = require("express");
const postRouter = express.Router();

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const {
  newPost,
  newResearch,
  newEvent,
  getPosts,
  getResearch,
  getEvent, 
  getPostById
} = require("../controllers/post");

postRouter.post("/newPost", authentication, newPost); //by any user
postRouter.post("/newResearch", authentication, authorization, newResearch); //only by admin or specialist
postRouter.post("/newEvent", authentication, authorization, newEvent); //only by admin or specialist
postRouter.get("/getPosts", getPosts);
postRouter.get("/getResearch", authentication, getResearch);
postRouter.get("/getEvent", authentication, getEvent);
postRouter.get("/getPostById", getPostById);

module.exports = postRouter;
