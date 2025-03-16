/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebookIcon from "../Assets/facebook-icon.png";
import googleIcon from "../Assets/google-icon.png";
import vectorImage from "../Assets/vector-art.png";

const CompanyRegistration = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/compauth/signup", formData);
      if (response.data.msg) {
        toast.success(response.data.msg); // Show success message
        setIsLogin(true); // Switch to login form after successful signup
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage); // Show error message
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/compauth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!"); // Show success message
        navigate("/company"); // Redirect to company page
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage); // Show error message
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
   
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
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "10px" }}>Welcome to Mockbot</h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            {isLogin ? "Login to your company account" : "Register your company"}
          </p>

          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <input
                type="text"
                name="organizationName"
                placeholder="Enter Company Name"
                required
                value={formData.organizationName}
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
            {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
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
              {isLogin ? "Login" : "Sign Up"}
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
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: "#6c63ff", textDecoration: "none", fontWeight: "bold" }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebookIcon from "../Assets/facebook-icon.png";
import googleIcon from "../Assets/google-icon.png";
import vectorImage from "../Assets/vector-art.png";

const CompanyRegistration = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "", // Add username field
    organizationName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/compauth/signup", formData);
      if (response.data.msg) {
        toast.success(response.data.msg); // Show success message
        setIsLogin(true); // Switch to login form after successful signup
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage); // Show error message
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/compauth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!"); // Show success message
        navigate("/company"); // Redirect to company page
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage); // Show error message
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
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "10px" }}>Welcome to Mockbot</h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            {isLogin ? "Login to your company account" : "Register your company"}
          </p>

          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <>
                {/* Username Field */}
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
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
                {/* Organization Name Field */}
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Enter Company Name"
                  required
                  value={formData.organizationName}
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
              </>
            )}
            {/* Email Field */}
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
            {/* Password Field */}
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
            {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
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
              {isLogin ? "Login" : "Sign Up"}
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
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: "#6c63ff", textDecoration: "none", fontWeight: "bold" }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;