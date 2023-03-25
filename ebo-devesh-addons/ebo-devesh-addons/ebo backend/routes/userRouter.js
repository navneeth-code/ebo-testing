const express = require("express");
const { register, findUser } = require("../controllers/userController");
const { body } = require("express-validator");
const validator = require("../middlewares/validatorMiddleware");

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(
    body("phoneNumber")
      .exists({ checkFalsy: true })
      .withMessage("Please enter mobile number"),
    body("name").exists({ checkFalsy: true }).withMessage("Please enter name"),
    body("email").isEmail().withMessage("Please enter email id"),
    body("firebaseUID")
      .exists({ checkFalsy: true })
      .withMessage("Please enter firebaseUID"),
    body("dateOfBirth")
      .exists({ checkFalsy: true })
      .withMessage("Please enter date of birth"),
    body("phoneUpdate").exists().withMessage("Please provide phone update"),
    body("emailUpdate").exists().withMessage("Please provide email update"),
    body("whatsappUpdate")
      .exists()
      .withMessage("Please provide whatsapp update"),
    validator,
    register
  );

userRouter
  .route("/find")
  .post(
    body("phoneNumber")
      .exists({ checkFalsy: true })
      .withMessage("Please enter phone number"),
    findUser
  );

module.exports = userRouter;
