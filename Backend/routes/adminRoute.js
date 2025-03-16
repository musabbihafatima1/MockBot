/*const express = require("express");
const Usercom = require("../models/CompanyUser");
const router = express.Router();

// Fetch all pending company requests
router.get("/pending-requests", async (req, res) => {
  try {
    const pendingRequests = await Usercom.find({ status: "pending" });
    res.json(pendingRequests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Approve a company request
router.post("/approve-request/:id", async (req, res) => {
  try {
    const company = await Usercom.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    company.status = "approved";
    await company.save();

    res.json({ msg: "Company approved successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Reject a company request
router.post("/reject-request/:id", async (req, res) => {
  try {
    const company = await Usercom.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    company.status = "rejected";
    await company.save();

    res.json({ msg: "Company rejected successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;*/
// File: routes/adminRoutes.js
const express = require("express");
const Usercom = require("../models/CompanyUser");
const router = express.Router();

// Fetch all pending company requests
router.get("/pending-requests", async (req, res) => {
  try {
    const pendingRequests = await Usercom.find({ status: "pending" });
    res.json(pendingRequests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Registered Companies
router.get("/registered-companies", async (req, res) => {
  try {
    const registeredCompanies = await Usercom.find({ status: "approved" });
    res.json(registeredCompanies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Approve a company request
router.post("/approve-request/:id", async (req, res) => {
  try {
    const company = await Usercom.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    company.status = "approved";
    await company.save();

    res.json(company);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
 
// Reject a company request
router.post("/reject-request/:id", async (req, res) => {
  try {
    const company = await Usercom.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    company.status = "rejected";
    await company.save();

    res.json({ msg: "Company rejected successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;