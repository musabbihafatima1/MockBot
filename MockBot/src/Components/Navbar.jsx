import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";
import logo from "../Assets/mb.png"; // Ensure correct path

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;