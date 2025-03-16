import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-mockbot">
          <h4 className="footer-title1">MockBot</h4>
          <p className="footer-description">
            AI-powered solutions for interview prep, resume building, and skill growth.
          </p>
          <p className="footer-team">
            Made by: <a href="https://www.linkedin.com/in/musabbiha-fatima-427957279/">Musabbiha</a>,{" "}
            <a href="https://www.linkedin.com/in/maryam-malik-b118b8286/">Maryam</a>, and{" "}
            <a href="https://www.linkedin.com/in/mahnoor-tanzeel-4a733a229/">Mahnoor</a>
          </p>
        </div>
        <div className="footer-company">
          <h4 className="footer-title">Company</h4>
          <ul>
            <li>Projects</li>
            <li>Contacts</li>
          </ul>
        </div>
        <div className="footer-services">
          <h4 className="footer-title">Services</h4>
          <ul>
            <li>Interview Preparation</li>
            <li>Resume Building</li>
            <li>Feedback Scores</li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4 className="footer-title">Contact</h4>
          <ul>
            <li>hello@MockBot</li>
            <li>+123 456 789</li>
            <li>Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 MockBot. All rights reserved.</p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;