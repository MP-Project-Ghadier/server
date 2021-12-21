const roleModel = require("./../../db/models/roles");

const newRole = (req, res) => {
  const { role, Permissions } = req.body;
  const newRole = new roleModel({
    role,
    Permissions,
  });
  newRole
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "role has been created successfully", result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const roles = (req, res) => {
  roleModel
    .find({})
    .then((result) => {
      if (result.length > 0) res.status(200).json(result);
      else res.status(404).json({ message: "there is no roles yet." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { newRole, roles };
