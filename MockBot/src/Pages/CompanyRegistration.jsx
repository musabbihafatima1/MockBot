import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import vectorImage from "../Assets/vector-art.png";

const CompanyRegistration = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    address: "",
    registrationNumber: "",
    businessDocument: null,
  });
  const [errors, setErrors] = useState({
    organizationName: "",
    email: "",
    password: "",
    registrationNumber: "",
    businessDocument: "",
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Regular expression for validating the registration number format: XXXXX/YY/ZZZZ
  const registrationNumberRegex = /^\d{5}\/[A-Za-z]{2}\/\d{4}$/;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "businessDocument") {
      setFormData({ ...formData, businessDocument: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Common validations
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }
  
    if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }
  
    // Signup-specific validations
    if (!isLogin) {
      if (!registrationNumberRegex.test(formData.registrationNumber)) {
        formErrors.registrationNumber = "Invalid format. Use XXXXX/YY/ZZZZ.";
        isValid = false;
      }
      if (!formData.organizationName.trim()) {
        formErrors.organizationName = "Company name is required";
        isValid = false;
      }
    }
  
    setErrors(formErrors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/compauth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
          navigate("/company");
        } else if (response.data.status === "not_approved") {
          toast.error("Approval not granted");
        }
      } else {
        const data = new FormData();
        data.append("organizationName", formData.organizationName);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("address", formData.address);
        data.append("registrationNumber", formData.registrationNumber);
        if (formData.businessDocument) {
          data.append("businessDocument", formData.businessDocument);
        }

        const response = await axios.post("http://localhost:5000/api/compauth/signup", data);

        if (response.data.msg) {
          toast.success("Registration request sent");
          setIsLogin(true); // Switch to login form after successful registration request
        } else if (response.data.status === "user_exists") {
          toast.error("User already exists");
        }
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Something went wrong";
      setErrors({ ...errors, global: msg });
      toast.error(msg);
    }
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        style={{ zIndex: 9999, position: "fixed" }}
      />
      <div style={containerStyle}>
        <div style={leftSideStyle}>
          <img src={vectorImage} alt="Vector" style={{ width: "80%", maxWidth: "450px" }} />
          <p style={leftTextStyle}>Take a Quiz be more creative in your work</p>
        </div>

        <div style={rightSideStyle}>
          <div style={formBoxStyle}>
            <h2 style={headingStyle}>Welcome to Mockbot</h2>
            <p style={subHeadingStyle}>
              {isLogin ? "Login to your company account" : "Send request to register your company"}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="organizationName"
                    placeholder="Company Name"
                    required
                    value={formData.organizationName}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  {errors.organizationName && (
                    <p style={errorTextStyle}>{errors.organizationName}</p>
                  )}

                  <input
                    type="text"
                    name="address"
                    placeholder="Company Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="registrationNumber"
                    placeholder="Registration Number (XXXXX/YY/ZZZZ)"
                    required
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  {errors.registrationNumber && (
                    <p style={errorTextStyle}>{errors.registrationNumber}</p>
                  )}
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.email && <p style={errorTextStyle}>{errors.email}</p>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.password && <p style={errorTextStyle}>{errors.password}</p>}

              {!isLogin && (
                <>
                  <div style={{ textAlign: "left", margin: "5px 0", fontSize: "0.9rem" }}>
                    Upload Business Document
                  </div>
                  <div style={fileBoxStyle}>
                    <span style={fileTextStyle}>
                      {formData.businessDocument?.name || "No file chosen"}
                    </span>
                    <button onClick={handleFileClick} style={fileButtonStyle}>
                      Choose File
                    </button>
                  </div>
                  <input
                    type="file"
                    name="businessDocument"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </>
              )}

              {errors.global && (
                <p style={{ color: "red", fontSize: "0.85rem", marginTop: "5px" }}>{errors.global}</p>
              )}

              <button type="submit" style={submitButtonStyle}>
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <a
                href="#"
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: "#6c63ff", fontWeight: "bold", textDecoration: "none" }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// 🔧 STYLES (organized and compact for smaller screen height)

const containerStyle = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
};

const leftSideStyle = {
  width: "50%",
  background: "linear-gradient(145deg, black, #5D009F)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  color: "white",
};

const leftTextStyle = {
  fontSize: "1rem",
  marginTop: "15px",
  maxWidth: "80%",
};

const rightSideStyle = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
};

const formBoxStyle = {
  width: "100%",
  maxWidth: "330px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  textAlign: "center",
};

const headingStyle = {
  color: "black",
  fontSize: "1.5rem",
  marginBottom: "5px",
};

const subHeadingStyle = {
  color: "#666",
  marginBottom: "10px",
  fontSize: "0.9rem",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "6px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "0.95rem",
};

const fileBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  padding: "8px 10px",
  borderRadius: "5px",
  marginBottom: "10px",
};

const fileTextStyle = {
  flex: 1,
  fontSize: "0.85rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const fileButtonStyle = {
  padding: "5px 10px",
  background: "#400675",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.8rem",
  marginLeft: "10px",
};

const submitButtonStyle = {
  width: "100%",
  padding: "10px",
  background: "#400675",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "1rem",
  cursor: "pointer",
};

const errorTextStyle = {
  color: "red",
  fontSize: "0.85rem",
  marginTop: "5px",
};

export default CompanyRegistration;
