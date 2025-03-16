/*const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Usercom = mongoose.model('Usercom', UserSchema);

module.exports = Usercom;*/


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizationName: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Add status field
});

const Usercom = mongoose.model("Usercom", UserSchema);
module.exports = Usercom;