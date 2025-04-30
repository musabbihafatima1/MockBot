import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ATS.css';

const ATSResumeUpload = () => {
  const [resumeStatus, setResumeStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumePreview({
          type: 'pdf',
          url: e.target.result
        });
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/msword' || 
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setResumePreview({
        type: 'doc',
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleResumeUpload = async (event) => {
    event.preventDefault();
    const file = event.target.resume.files[0];

    if (!file) {
      alert('Please upload a resume!');
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      
      const data = await response.json();
      if (data.success) {
        setAnalysisResult({
          score: data.data.score,
          suggestions: data.data.suggestions,
          extractedData: data.data.extractedData
        });
        setResumeStatus(data.data.score >= 70 ? 'accepted' : 'rejected');
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setResumeStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setResumeStatus('');
    setAnalysisResult(null);
  };

  const removeFile = () => {
    setResumePreview(null);
    setFileName('');
    document.getElementById('resume').value = '';
  };

  return (
    <motion.div 
      className="ats-resume-upload-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sliding Back Button */}
      <div style={{
        position: 'fixed',
        left: isVisible ? '0' : '-200px',
        top: '20px',
        transition: 'left 0.5s ease-out',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link to="/userpage" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          backgroundColor: '#5D009F',
          color: 'white',
          padding: '10px 15px 10px 10px',
          borderRadius: '0 25px 25px 0',
          boxShadow: '0 2px 8px rgba(93, 0, 159, 0.2)',
          transition: 'all 0.3s ease',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ 
            marginRight: '8px',
            flexShrink: 0
          }}>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            whiteSpace: 'nowrap',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Return to Dashboard
          </span>
        </Link>
      </div>

      <header className="app-header">
        <motion.h1 className="app-logo">
          <Link to="/userpage" className="logo-link"></Link>
        </motion.h1>
      </header>
      
      <main className="main-content">
        <motion.div
          className="upload-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-header">
            <h1 className="section-title">
              ATS Resume Optimization
            </h1>
            <p className="section-subtitle">
              Upload your resume to check its compatibility with Applicant Tracking Systems
            </p>
          </div>

          <form className="upload-form" onSubmit={handleResumeUpload}>
            <div className="file-upload-container">
              <label className="file-upload-label">
                <input 
                  type="file" 
                  id="resume" 
                  name="resume" 
                  accept=".pdf,.doc,.docx" 
                  required 
                  className="file-input"
                  onChange={handleFileChange}
                />
                <div className="file-upload-box">
                  {resumePreview ? (
                    <div className="file-preview">
                      {resumePreview.type === 'pdf' ? (
                        <embed 
                          src={resumePreview.url} 
                          type="application/pdf" 
                          width="100%" 
                          height="200px" 
                        />
                      ) : (
                        <div className="doc-preview">
                          <svg className="doc-icon" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                          </svg>
                          <span>{fileName}</span>
                        </div>
                      )}
                      <button 
                        type="button" 
                        className="remove-file-btn"
                        onClick={removeFile}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="upload-icon" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      <span>Drag & drop your resume here</span>
                      <span className="file-types">Supports PDF and Word documents</span>
                      <div className="browse-btn">Browse Files</div>
                    </>
                  )}
                </div>
              </label>
            </div>

            <motion.button
              type="submit"
              className="analyze-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || !resumePreview}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : 'Analyze Resume'}
            </motion.button>
          </form>
        </motion.div>

        {isLoading && (
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p>Scanning your resume for ATS optimization...</p>
          </div>
        )}
      </main>

      {resumeStatus && (
        <div className="modal-overlay" onClick={closePopup}>
          <motion.div
            className={`results-modal ${resumeStatus}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={closePopup}>
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            <div className="modal-header">
              <div className={`status-icon ${resumeStatus}`}>
                {resumeStatus === 'accepted' ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                ) : resumeStatus === 'error' ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                  </svg>
                )}
              </div>
              <h2>
                {resumeStatus === 'accepted'
                  ? 'Great Job!'
                  : resumeStatus === 'error'
                  ? 'Processing Error'
                  : 'Needs Improvement'}
              </h2>
              <p className="status-description">
                {resumeStatus === 'accepted'
                  ? 'Your resume scores well against ATS systems'
                  : resumeStatus === 'error'
                  ? 'There was an error analyzing your resume'
                  : 'Your resume could be optimized for better ATS performance'}
              </p>
            </div>

            {analysisResult?.score && (
              <div className="score-section">
                <div className="score-header">
                  <h3>ATS Compatibility Score</h3>
                  <span className="score-value">{analysisResult.score}/100</span>
                </div>
                <div className="score-meter">
                  <div 
                    className="score-fill" 
                    style={{ width: `${analysisResult.score}%` }}
                  />
                </div>
                <div className="score-labels">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            )}

            {analysisResult?.suggestions && (
              <div className="suggestions-section">
                <h3>Optimization Suggestions</h3>
                <ul>
                  {analysisResult.suggestions.map((suggestion, i) => (
                    <li key={i}>
                      <svg className="bullet-icon" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysisResult?.extractedData && (
              <div className="extracted-data-section">
                <h3>Extracted Resume Data</h3>
                <div className="data-category">
                  <h4>
                    <svg className="category-icon" viewBox="0 0 24 24">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                    </svg>
                    Skills
                  </h4>
                  <div className="skills-container">
                    {analysisResult.extractedData.skills.map((skill, i) => (
                      <span key={`skill-${i}`} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="data-category">
                  <h4>
                    <svg className="category-icon" viewBox="0 0 24 24">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                    </svg>
                    Education
                  </h4>
                  <ul>
                    {analysisResult.extractedData.education.map((edu, i) => (
                      <li key={`edu-${i}`}>{edu}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="data-category">
                  <h4>
                    <svg className="category-icon" viewBox="0 0 24 24">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                    </svg>
                    Experience
                  </h4>
                  <ul>
                    {analysisResult.extractedData.experience.map((exp, i) => (
                      <li key={`exp-${i}`}>{exp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="primary-action" onClick={closePopup}>
                {resumeStatus === 'accepted' ? 'Continue' : 'Try Again'}
              </button>
              {resumeStatus === 'accepted' && (
                <button className="secondary-action">
                  Download Optimized Resume
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ATSResumeUpload;