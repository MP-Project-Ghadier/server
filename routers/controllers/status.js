const statusModel = require("./../../db/models/status");

const newStatus = async (req, res) => {
  const { status } = req.body;
  const newStatus = new statusModel({
    status,
  });
  newStatus
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "status has been created successfully", result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const allStatus = (req, res) => {
  statusModel
    .find({})
    .then((result) => {
      if (result.length > 0) res.status(200).json(result);
      else res.status(404).json({ message: "there is no status yet." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { newStatus, allStatus };
