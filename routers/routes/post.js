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
  getPostById,
  getResearchById,
  getEventById,
  deletePost,
  deletePostByAdmin,
  postComments,
  updatePost,
} = require("../controllers/post");

postRouter.post("/newPost", authentication, newPost); //by any user
postRouter.post("/newResearch", authentication, authorization, newResearch); //only by admin or specialist
postRouter.post("/newEvent", authentication, authorization, newEvent); //only by admin or specialist
postRouter.get("/getPosts", authentication, getPosts);
postRouter.get("/getResearch", authentication, getResearch);
postRouter.get("/getEvent", authentication, getEvent);
postRouter.get("/getPostById/:id", authentication, getPostById);
postRouter.get("/getResearchById/:id", authentication, getResearchById);
postRouter.get("/getEventById/:id", authentication, getEventById);
postRouter.put("/deletePost/:id", authentication, deletePost);
postRouter.put(
  "/deletePostByAdmin/:id",
  authentication,
  authorization,
  deletePostByAdmin
);  //only by admin or specialist
postRouter.get("/postComments/:id", authentication, postComments);
postRouter.put("/updatePost/:id", authentication, updatePost);

module.exports = postRouter;
