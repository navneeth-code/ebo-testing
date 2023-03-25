const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    dateOfBirth,
    firebaseUID,
    phoneUpdate,
    emailUpdate,
    whatsappUpdate,
  } = req.body;

  const userExist = await User.findOne({ phoneNumber });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phoneNumber,
    dateOfBirth: new Date(dateOfBirth),
    firebaseUID,
    offerUpdate: {
      phone: phoneUpdate,
      email: emailUpdate,
      whatsapp: whatsappUpdate,
    },
  });

  if (!user) {
    res.status(500);
    throw new Error("Something went wrong with user creation");
  }

  res.status(201);
  res.json({
    name: user.name,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    token: genToken(user._id),
  });
});

const findUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  const user = await User.findOne({ phoneNumber });

  if (!user) {
    res.status(200).json({
      message: "No user found with this phone number",
      registrationRequired: true,
    });
    return;
  }

  res.status(200).json({
    message: "User already register with this number",
    user: {
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      token: genToken(user._id),
    },
    registrationRequired: false,
  });
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

module.exports = {
  register,
  findUser,
};
