const userModel = require("./../../db/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const BASE_URL = process.env.BASE_URL;

const newUser = async (req, res) => {
  //status will be approved by default
  const { name, email, password, avatar } = req.body;
  const savedEmail = email.toLowerCase();
  const alreadyExit = await userModel.findOne({ email: savedEmail });
  if (!alreadyExit) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    try {
      let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      const newUser = await new userModel({
        name,
        email: savedEmail,
        password: hashedPassword,
        avatar,
        // role: user
        role: "61c17227bfafd96433645c8f",
        // status: approved
        status: "61c17bf397fb360ba8b98336",
      });
      newUser.save().then(async (result) => {
        // console.log(result);
        const verificationToken = await newUser.generateVerificationToken();
        // console.log(verificationToken);
        const url = `${BASE_URL}/verifyEmail/${verificationToken}`;

        let mailDetails = {
          from: EMAIL,
          to: result.email,
          subject: `hello ${result.name}, Verify your Account`,
          html: `This is a message to confirm your identity, Click <a href='${url}'>here</a> to complete your registration. `,
        };

        mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
            res.status(400).json(err);
          } else {
            console.log("Email sent successfully");
            res.json(result);
          }
        });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(409).send("This email is already exist!");
  }
};

const newSpecialist = async (req, res) => {
  // status will be pending by default till the admin give approve
  const { name, email, password, avatar } = req.body;
  const savedEmail = email.toLowerCase();
  const alreadyExit = await userModel.findOne({ email: savedEmail });
  if (!alreadyExit) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    try {
      let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });
      const newSpecialist = new userModel({
        name,
        email: savedEmail,
        avatar,
        password: hashedPassword,
        // role: specialist
        role: "61c17200bfafd96433645c8d",
        // status: pending
        status: "61c17bea97fb360ba8b98334",
      });
      newSpecialist.save().then(async (result) => {
        // console.log(result);
        const verificationToken = await newUser.generateVerificationToken();
        // console.log(verificationToken);
        const url = `${BASE_URL}/verifyEmail/${verificationToken}`;

        let mailDetails = {
          from: EMAIL,
          to: result.email,
          subject: `hello ${result.name}, Verify your Account`,
          html: `This is a message to confirm your identity, Click <a href='${url}'>here</a> to complete your registration. `,
        };

        mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
            res.status(400).json(err);
          } else {
            console.log("Email sent successfully");
            res.json(result);
          }
        });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(409).send("This email is already exist!");
  }
};

const newAdmin = async (req, res) => {
  // status will be pending by default till the admin give approve
  const { name, email, password } = req.body;
  const savedEmail = email.toLowerCase();
  const alreadyExit = await userModel.findOne({ email: savedEmail });
  if (!alreadyExit) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    const newAdmin = new userModel({
      name,
      email: savedEmail,
      password: hashedPassword,
      avatar,
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
  } else {
    res.status(409).send("This email is already exist!");
  }
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
    .populate("role", "role")
    .then(async (result) => {
      console.log(result.status);
      if (result) {
        if (result.email == savedEmail) {
          const hashedPassword = await bcrypt.compare(
            password,
            result.password
          );
          const payload = {
            role: result.role,
            id: result._id,
          };
          const options = {
            expiresIn: "600m",
          };
          if (result.verified) {
            if (result.status == "61c17bf397fb360ba8b98336") {
              if (hashedPassword) {
                const token = jwt.sign(payload, secret, options);
                res.status(200).json({ result, token });
              } else {
                res.status(400).send("invalid email or password");
              }
            } else {
              res.status(400).send("Your account is not approved yet.");
            }
          } else {
            res.status(400).send("Verify your Account!");
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
  const { name, email, password, avatar } = req.body;
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  userModel
    .findOneAndUpdate(
      savedEmail,
      {
        name,
        email,
        password: hashedPassword,
        avatar,
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
        status: "61c17bfc97fb360ba8b98338", //rejected
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

const verifyEmail = async (req, res) => {
  // console.log("here");
  const { token } = req.params;
  // Check we have an id
  if (!token) {
    return res.status(422).send({
      message: "Missing Token",
    });
  }
  // Step 1 -  Verify the token from the URL
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
    console.log("token", token);
  } catch (err) {
    return res.status(500).send(err);
  }
  try {
    // Step 2 - Find user with matching ID
    const user = await userModel.findOne({ _id: payload.ID }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not  exists",
      });
    }
    // Step 3 - Update user verification status to true
    user.verified = true;
    await user.save();
    return res.status(200).send({
      message: "Account Verified",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const forgetPass = async (req, res) => {
  const { email } = req.body;
  try {
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let code = Math.floor(100000 + Math.random() * 9000);

    userModel
      .findOneAndUpdate({ email: email }, { resetCode: code })
      .exec()
      .then((result) => {
        let mailDetails = {
          from: EMAIL,
          to: result.email,
          subject: `hello ${result.name}`,
          text: `This is a message to confirm your identity, enter this code: ${code}. Enter this link to change your password ${BASE_URL}/resetPass/${result._id}`,
        };
        mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
            res.json(err);
          } else {
            res.json(result);
          }
        });
        // console.log("email", email);
        res.status(200).json("sent successfuly");
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
};

const resetPass = async (req, res) => {
  const { id } = req.params;
  const { password, code } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT);
  try {
    userModel
      .findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword },
        { new: true }
      )
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

// // log in with google
const client = new OAuth2Client(
  "801305115124-kp5gtb7a2f1ej1e2bgi7gqrh1iio4l9t.apps.googleusercontent.com"
);
const googlelogin = async (req, res) => {
  const { tokenId } = req.body;
  try {
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "801305115124-kp5gtb7a2f1ej1e2bgi7gqrh1iio4l9t.apps.googleusercontent.com",
      })
      .then((result) => {
        const { email_verified, name, email, profileObj } = result.payload;
        console.log(result);
        if (email_verified) {
          userModel.findOne({ email }).exec((err, user) => {
            if (err) {
              console.log("err is: ", err);
              return res.status(400).json(err);
            } else {
              if (user) {
                const options = {
                  expiresIn: "7d",
                };
                const token = jwt.sign(
                  { _id: user._id, role: "61c17227bfafd96433645c8f" },
                  secret,
                  options
                );
                const result = {
                  _id: user._id,
                  name,
                  email,
                  role: "61c17227bfafd96433645c8f",
                };
                res.status(200).json({ result, token });
              } else {
                let password = email + secret;
                const newUser = new userModel({
                  name,
                  password,
                  email,
                  role: "61c17227bfafd96433645c8f", // user
                  status: "61c17bf397fb360ba8b98336", // aproved
                });
                newUser.save((err, data) => {
                  if (err) {
                    return res.status(400).send(err);
                  }
                  const token = jwt.sign({ _id: data._id }, secret, {
                    expiresIn: "7d",
                  });
                  // const { _id, name, email, role, status } = newUser;
                  res.status(200).json({ result: data, token });
                });
              }
            }
          });
        }
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

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
  verifyEmail,
  forgetPass,
  resetPass,
  googlelogin,
};
