const userModel = require("./../../db/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

const newUser = async (req, res) => {
  //status will be approved by default
  const { name, email, password } = req.body;
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    name,
    email: savedEmail,
    password: hashedPassword,
    // role: user
    role: "61c17227bfafd96433645c8f",
    // status: approved
    status: "61c17bf397fb360ba8b98336",
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const newSpecialist = async (req, res) => {
  // status will be pending by default till the admin give approve
  const { name, email, password } = req.body;
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newSpecialist = new userModel({
    name,
    email: savedEmail,
    password: hashedPassword,
    // role: specialist
    role: "61c17200bfafd96433645c8d",
    // status: pending
    status: "61c17bea97fb360ba8b98334",
  });
  newSpecialist
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const newAdmin = async (req, res) => {
  // status will be pending by default till the admin give approve
  const { name, email, password } = req.body;
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newAdmin = new userModel({
    name,
    email: savedEmail,
    password: hashedPassword,
    // role: admin
    role: "61c17200bfafd96433645c8d",
    // status: pending
    status: "61c17bea97fb360ba8b98334",
  });
  newAdmin
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUsers = async (req, res) => {
  userModel
    .find({ isDel: false })
    .then((result) => {
      if (result.length > 0) res.status(200).json(result);
      else res.status(404).json({ message: "there is no users yet." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (result.email == savedEmail) {
          const hashedPassword = await bcrypt.compare(
            password,
            result.password
          );
          const payload = {
            role: result.role,
          };
          const options = {
            expiresIn: "600m",
          };
          if (hashedPassword) {
            const token = jwt.sign(payload, secret, options);
            res.status(200).json({ result, token });
          } else {
            res.status(400).send("invalid email or password");
          }
        } else {
          res.status(400).send("invalid email or password");
        }
      } else {
        res.status(404).send("this email not exist!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  userModel
    .findOneAndUpdate(
      savedEmail,
      {
        name,
        email,
        password: hashedPassword,
      },
      { new: true }
    )
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const deleteAccount = async (req, res) => {
  const { email } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOneAndUpdate(
      savedEmail,
      {
        isDel: true,
      },
      { new: true }
    )
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const approveSpecialist = async (req, res) => {
  const { email } = req.body;
  //specialis email
  const savedEmail = email.toLowerCase();

  userModel
    .findOneAndUpdate(
      savedEmail,
      {
        status: "61c17bf397fb360ba8b98336", //approved
      },
      { new: true }
    )
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const rejectSpecialist = async (req, res) => {
  const { email } = req.body;
  //specialis email
  const savedEmail = email.toLowerCase();

  userModel
    .findOneAndUpdate(
      savedEmail,
      {
        status: "61c17bfc97fb360ba8b98338", //approved
      },
      { new: true }
    )
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOneAndUpdate(
      savedEmail,
      {
        isDel: true,
      },
      { new: true }
    )
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const verifyAccount = async(req, res)=>{

}

module.exports = {
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
};
