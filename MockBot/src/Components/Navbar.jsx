import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";
import logo from "../Assets/mb.png";

const Navbar = ({ timer }) => {

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
          <Link to="/userpage">Home</Link>
        </div>
      </div>
      
      {timer !== undefined && (
        
          <div className="timer">
            
            <span>Time:</span>
            <span className="timer-value">{formatTime(timer)}</span>
         
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;