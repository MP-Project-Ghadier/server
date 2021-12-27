const express = require("express");
const userRouter = express.Router();

const {
  newUser,
  newSpecialist,
  newAdmin,
  getUsers,
  login,
  updateProfile,
  deleteAccount,
  approveSpecialist,
  rejectSpecialist,
  deleteUser,
  verifyEmail,
  forgetPass,
  resetPass,
  googlelogin,
} = require("../controllers/user");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

userRouter.post("/newUser", newUser);
userRouter.post("/newSpecialist", newSpecialist);
userRouter.post("/newAdmin", newAdmin);
userRouter.post("/login", login);
userRouter.get("/verifyEmail/:token", verifyEmail);
userRouter.post("/forgetPass", forgetPass);
userRouter.post("/resetPass/:id", resetPass);

// log in with google
userRouter.post("/googlelogin", googlelogin);

userRouter.put("/updateProfile", authentication, updateProfile);
userRouter.put("/deleteAccount", authentication, deleteAccount);

// Admin
userRouter.get("/getUsers", authentication, authorization, getUsers);

userRouter.put(
  "/approveSpecialist",
  authentication,
  authorization,
  approveSpecialist
);

userRouter.put(
  "/rejectSpecialist",
  authentication,
  authorization,
  rejectSpecialist
);

userRouter.put("/deleteUser", authentication, authorization, deleteUser);

module.exports = userRouter;
