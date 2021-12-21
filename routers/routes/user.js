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
  verifyAccount,
  //   verifyEmail,
  //   forgetPassword,
  //   resetPassword,
  //   googlelogin
} = require("../controllers/user");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
// const isResetTokenValid = require("../middleware/user");

userRouter.post("/newUser", newUser);
userRouter.post("/newSpecialist", newSpecialist);
userRouter.post("/newAdmin", newAdmin);
userRouter.get("/getUsers", authentication, authorization, getUsers);
userRouter.post("/login", login);
userRouter.put("/updateProfile", updateProfile);
userRouter.put("/deleteAccount", deleteAccount);
userRouter.post("/verifyAccount", verifyAccount);

// Admin
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

// userRouter.post("/login", login);
// userRouter.post("/verifyEmail", verifyEmail);
// userRouter.post("/forgetPassword", forgetPassword);
// userRouter.post("/resetPassword", isResetTokenValid, resetPassword);
// log in with google
// userRouter.post("/googlelogin", googlelogin)

module.exports = userRouter;
