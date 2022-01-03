const express = require("express");
const postRouter = express.Router();

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const {
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
} = require("../controllers/post");

postRouter.post("/newPost", authentication, newPost); //by any user
postRouter.post("/newResearch", authentication, authorization, newResearch); //only by admin or specialist
postRouter.post("/newEvent", authentication, authorization, newEvent); //only by admin or specialist
postRouter.post("/newCenter", authentication, authorization, newCenter); //only by admin or specialist
postRouter.get("/getPosts", authentication, getPosts);
postRouter.get("/getResearch", getResearch);
postRouter.get("/getEvent", getEvent);
postRouter.get("/getCenter", getCenter);
postRouter.get("/getPostById/:id", authentication, getPostById);
postRouter.get("/getResearchById/:id", getResearchById);
postRouter.get("/getEventById/:id", getEventById);
postRouter.get("/getCenterById/:id", getCenterById);
postRouter.put("/deletePost/:id", authentication, deletePost);
postRouter.put(
  "/deletePostByAdmin/:id",
  authentication,
  authorization,
  deletePostByAdmin
); //only by admin or specialist

postRouter.get("/postComments/:id", authentication, postComments);
postRouter.put("/updatePost/:id", authentication, authorization, updatePost);
postRouter.put("/approvePost", authentication, authorization, approvePost);

module.exports = postRouter;
