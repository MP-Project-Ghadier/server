const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
require("./db/index.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const userRouter = require("./routers/routes/user");
app.use(userRouter);

const statusRouter = require("./routers/routes/status");
app.use(statusRouter);

const postRouter = require("./routers/routes/post");
app.use(postRouter);

const commentRouter = require("./routers/routes/comment");
app.use(commentRouter);

app.get("*", (req, res) => {res.sendFile(``)});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});
