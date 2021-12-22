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
userRouter.put("/updateProfile", updateProfile);
userRouter.put("/deleteAccount", deleteAccount);
userRouter.put("/verifyAccount/:id", verifyAccount);
userRouter.post("/forgetPass", forgetPass);
userRouter.post("/resetPass/:id", resetPass);

// log in with google
userRouter.post("/googlelogin", googlelogin);

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
