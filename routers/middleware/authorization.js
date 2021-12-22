const roleModel = require("./../../db/models/roles");
const authorization = async (req, res, next) => {
  try {
    console.log("role token", req.token.role);
    const roleId = req.token.role;
    const result = await roleModel.findById(roleId);
    console.log(result);
    if (result.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  } catch (error) {
    res.status(403).json(error);
  }
};
module.exports = authorization;
