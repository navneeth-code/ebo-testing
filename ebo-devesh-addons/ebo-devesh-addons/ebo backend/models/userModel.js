const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  offerUpdate: {
    phone: {
      type: Boolean,
      required: true,
    },
    email: {
      type: Boolean,
      required: true,
    },
    whatsapp: {
      type: Boolean,
      required: true,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
