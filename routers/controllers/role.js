const roleModel = require("./../../db/models/roles");

const newRole = (req, res) => {
  const { role, Permissions } = req.body;
  try {
    const newRole = new roleModel({
      role,
      Permissions,
    });
    newRole.save().then((result) => {
      res
        .status(201)
        .json({ message: "role has been created successfully", result });
    });
  } catch {
    (err) => {
      res
        .status(400)
        .json({ message: "role has not been created, try again", err });
    };
  }
};

const roles = (req, res) => {
  try {
    roleModel.find().then((result) => {
      res
        .status(200)
        .json({ message: "roles has been shown successfully", result });
    });
  } catch {
    (err) => {
      res
        .status(400)
        .json({ message: "role has not been shown, try again", err });
    };
  }
};

module.exports = { newRole, roles };
