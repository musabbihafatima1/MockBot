import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebookIcon from "../Assets/facebook-icon.png";
import googleIcon from "../Assets/google-icon.png";
import vectorImage from "../Assets/vector-art.png";

const Signup = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    university: "riphah",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message); // Toast for successful signup
        navigate("/userpage"); // Redirect to user page after signup
      } else {
        toast.error(data.message); // Toast for signup error
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Failed to sign up. Please try again."); // Toast for network error
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        toast.success(data.message); // Toast for successful login
        navigate("/userpage"); // Redirect to user page after login
      } else {
        toast.error(data.message); // Toast for login error
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Failed to log in. Please try again."); // Toast for network error
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Left Section */}
      <div
        style={{
          width: "50%",
          background: "linear-gradient(145deg, black, #5D009F)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          color: "white",
        }}
      >
        <img src={vectorImage} alt="Vector Illustration" style={{ width: "320px" }} />
        <p style={{ fontSize: "1.2rem", marginTop: "20px", maxWidth: "80%", marginBottom: "130px" }}>
          Take a Quiz, be more creative in your work
        </p>
      </div>

      {/* Right Section */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(255, 255, 255)",
        }}
      >
        <div
          style={{
            width: "80%",
            maxWidth: "400px",
            textAlign: "center",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            color: "black",
            background: "white",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "10px" }}>
            {isSignup ? "Welcome to Mockbot" : "Login to Mockbot"}
          </h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            {isSignup ? "Register your account" : "Sign in to your account"}
          </p>

          <form onSubmit={isSignup ? handleSignup : handleLogin}>
            {isSignup && (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Name"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    margin: "8px 0",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                  }}
                />
                <select
                  name="university"
                  required
                  value={formData.university}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    margin: "8px 0",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="riphah">Riphah International University</option>
                  <option value="nust">NUST University</option>
                  <option value="comsats">COMSATS University</option>
                  <option value="giki">GIKI University</option>
                  <option value="cust">CUST University</option>
                </select>
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#400675",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: "10px",
                transition: "0.3s",
              }}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p style={{ marginTop: "10px" }}>Or sign up with</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <img
              src={facebookIcon}
              alt="Facebook"
              style={{ width: "30px", height: "30px", margin: "0 10px", cursor: "pointer", transition: "transform 0.3s ease" }}
            />
            <img
              src={googleIcon}
              alt="Google"
              style={{ width: "30px", height: "30px", margin: "0 10px", cursor: "pointer", transition: "transform 0.3s ease" }}
            />
          </div>

          <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href="#"
              onClick={() => setIsSignup(!isSignup)}
              style={{ color: "#6c63ff", textDecoration: "none", fontWeight: "bold" }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;