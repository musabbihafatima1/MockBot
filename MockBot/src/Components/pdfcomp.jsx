// src/PdfComp.js
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSpring, animated } from "react-spring";
import "./pdfcomp.css";
import {Link} from "react-router-dom";

// Styled Components and animations
const PdfCompContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-right: 100px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  animation: fadeIn 1.5s ease-in-out;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 250px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const UploadButton = styled(animated.button)`
  padding: 10px 20px;
  background: linear-gradient(135deg, #6b5bff, #4f46e5);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease-in-out;
  animation: ${ButtonAnimation} 2s infinite;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, #4f46e5, #6b5bff);
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const DownloadLink = styled.div`
  margin-top: 20px;

  a {
    color: #00c9ff;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #00a3cc;
      text-decoration: underline;
    }
  }
`;

function PdfComp() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonSpring = useSpring({
    transform: isLoading ? "scale(0.9)" : "scale(1)",
    opacity: isLoading ? 0.7 : 1,
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a DOCX file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/files/convert", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Conversion failed:", errorText);
        throw new Error("Conversion failed: " + errorText);
      }
  
      const data = await response.json();
      setPdfUrl(data.result.FileUrl); // Make sure this matches your backend response structure
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to convert file Add docx file.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="convert">
      <div className="name">
          <h1><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/userpage'>MockBot</Link></h1>
        </div>
    <PdfCompContainer>
      <Title>🚀 DOCX to PDF Converter</Title>
      <UploadForm onSubmit={handleUpload}>
        <FileInput
          type="file"
          accept=".docx"
          onChange={handleFileChange}
        />
        <UploadButton
          style={buttonSpring}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Converting..." : "Upload and Convert"}
        </UploadButton>
      </UploadForm>

      {pdfUrl && (
        <DownloadLink>
          <a href={pdfUrl} download="converted.pdf" target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </DownloadLink>
      )}
    </PdfCompContainer></div>
  );
}

export default PdfComp;


