const mongoose = require("mongoose");

const CompanyUserSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  businessDocument: {
    filename: String,
    path: String,
    mimetype: String,
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

const CompanyUser = mongoose.model("CompanyUser", CompanyUserSchema);
module.exports = CompanyUser;