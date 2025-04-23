import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "businessDocument") {
      setFormData({
        ...formData,
        businessDocument: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/compauth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/company");
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
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/company");
        }
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Side */}
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
        }}
      >
        <img src={vectorImage} alt="Vector Illustration" style={{ width: "580px" }} />
        <p
          style={{
            fontSize: "1.2rem",
            color: "#f7f3f3",
            marginTop: "20px",
            maxWidth: "80%",
            marginBottom: "130px",
          }}
        >
          Take a Quiz be more creative in your work
        </p>
      </div>

      {/* Right Side */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
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
            background: "#fff",
          }}
        >
          <h2 style={{ color: "black", fontSize: "1.8rem", fontWeight: "bold", marginBottom: "10px" }}>
            Welcome to Mockbot
          </h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            {isLogin ? "Login to your company account" : "Register your company"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Enter Company Name"
                  required
                  value={formData.organizationName}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Company Address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Company Registration Number"
                  required
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
            />

            {!isLogin && (
              <>
                {/* File Upload Heading */}
                <h4
                  style={{
                    textAlign: "left",
                    margin: "10px 0 5px 0",
                    color: "#333",
                    fontWeight: "500",
                  }}
                >
                  Upload Business Document
                </h4>

                {/* File Upload Field */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",  // Ensures the button goes to the right
                    border: "1px solid #ccc",
                    padding: "10px 12px",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    backgroundColor: "#fff",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      color: "#555",
                      fontSize: "14px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {formData.businessDocument
                      ? formData.businessDocument.name
                      : "No file chosen"}
                  </span>

                  <button
                    onClick={handleFileClick}
                    style={{
                      padding: "6px 10px",
                      background: "#400675",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      marginLeft: "10px",
                    }}
                  >
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

            {error && (
              <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>{error}</p>
            )}

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

          <div style={{ margin: "20px 0", borderTop: "1px solid #ddd" }}></div>

          <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "black" }}>
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

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "1rem",
};

export default CompanyRegistration;