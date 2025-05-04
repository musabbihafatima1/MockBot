import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const IQPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [canAttempt, setCanAttempt] = useState(true);
  const [nextAttemptDate, setNextAttemptDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAttempted, setHasAttempted] = useState(false);
  const navigate = useNavigate();

  const content = {
    title: "Intelligence Quotient (IQ) Assessment",
    subtitle: "Measure your cognitive abilities and problem-solving skills",
    steps: [
      {
        number: 1,
        title: "Intelligent Quotient MCQs",
        description: "Answer 12 multiple-choice questions in 10 minutes designed to measure your intelligence quotient.",
      },
      {
        number: 3,
        title: "Auto-Submission on Tab Switch",
        description: "Switching tabs during the test triggers automatic submission to maintain exam fairness and integrity.",
      },
      {
        number: 3,
        title: "Intelligent Quotient Evaluation",
        description: "Your results will reveal your intelligence level based on expert IQ Test.",
      },
      {
        number: 4,
        title: "One Attempt every 2 years",
        description: "Test can be taken once every 2 years, attempt and showcase the scores to companies",
      },
    ],
    quizPath: "/iqquiz",
  };

  useEffect(() => {
    const checkAttemptStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/canAttemptIQ", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // New users should always be allowed to attempt
        const attemptAllowed = !response.data.hasAttempted || response.data.canAttempt;
        
        setCanAttempt(attemptAllowed);
        setNextAttemptDate(response.data.nextAttempt);
        setHasAttempted(response.data.hasAttempted);

        // Only validate time if user has previous attempts
        if (response.data.hasAttempted && response.data.nextAttempt) {
          const nextAttemptTime = new Date(response.data.nextAttempt).getTime();
          const currentTime = Date.now();
          if (nextAttemptTime > currentTime) {
            setCanAttempt(false);
          }
        }
      } catch (error) {
        console.error("Attempt check failed:", error);
        setCanAttempt(true); // Fail safe for new users
      } finally {
        setIsLoading(false);
        setIsVisible(true);
      }
    };

    checkAttemptStatus();
  }, []);

  const handleAttempt = () => {
    if (!canAttempt) {
      setShowPopup(true);
      return;
    }
    navigate(content.quizPath);
  };

  const formatLockoutDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      color: '#2D3748',
      position: 'relative'
    }}>
      {/* Back Button */}
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
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          ':hover': {
            backgroundColor: '#7F4AC2',
            paddingRight: '20px'
          }
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 
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

      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '50px', marginTop: '20px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1A202C',
          marginBottom: '12px',
          background: 'linear-gradient(90deg, #5D009F, #7F4AC2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {content.title}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#4A5568',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {content.subtitle}
        </p>
      </div>

      {/* Steps Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '60px'
      }}>
        {content.steps.map((step, index) => (
          <div key={step.number} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
            border: '1px solid #EDF2F7',
            transition: 'all 0.3s ease',
            // Align last two items in a single row
            gridColumn: index === 4 ? '1 / -1' : 'auto',
            maxWidth: index === 4 ? '600px' : 'none',
            margin: index === 4 ? '0 auto' : '0',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)'
            }
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              justifyContent: index === 4 ? 'center' : 'flex-start'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#F0E6FF',
                color: '#5D009F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '20px',
                marginRight: '16px',
                flexShrink: '0'
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1A202C',
                margin: '0',
                textAlign: index === 4 ? 'center' : 'left'
              }}>
                {step.title}
              </h3>
            </div>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#4A5568',
              margin: '0',
              textAlign: index === 4 ? 'center' : 'left'
            }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Assessment Button Section */}
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <button
  onClick={handleAttempt}
  disabled={isLoading || (hasAttempted && !canAttempt)}
  style={{
    backgroundColor: isLoading 
      ? '#e9ecef' 
      : hasAttempted 
        ? (canAttempt ? '#5D009F' : '#adb5bd')
        : '#5D009F',
    color: '#ffffff',
    padding: '16px 40px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: isLoading 
      ? 'wait' 
      : hasAttempted 
        ? (canAttempt ? 'pointer' : 'not-allowed')
        : 'pointer',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: isLoading ? 0.7 : 1,
    ':hover': {
      backgroundColor: isLoading 
        ? '#e9ecef' 
        : hasAttempted 
          ? (canAttempt ? '#450074' : '#adb5bd')
          : '#450074',
      transform: isLoading || (hasAttempted && !canAttempt) 
        ? 'none' 
        : 'translateY(-2px)',
      boxShadow: isLoading || (hasAttempted && !canAttempt) 
        ? '0 3px 6px rgba(0,0,0,0.1)' 
        : '0 6px 12px rgba(0,0,0,0.15)'
    }
  }}
>
  
          {isLoading ? (
            'Checking Availability...'
          ) : hasAttempted ? (
            canAttempt ? 'Retake Assessment' : 'Assessment Locked'
          ) : (
            'Begin Assessment'
          )}
        </button>

        {!isLoading && hasAttempted && !canAttempt && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: '#dc3545', fontSize: '0.9rem' }}>
              You can retake this assessment after:
            </p>
            <p style={{ 
              color: '#5D009F',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              fontWeight: 500
            }}>
              {formatLockoutDate(nextAttemptDate)}
            </p>
          </div>
        )}
      </div>

      {/* Lockout Modal */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>
              ⚠️ Assessment Locked
            </h3>
            <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
              {hasAttempted 
                ? "You can retake this assessment after:"
                : "This assessment is not yet available"}
              <br />
              <strong style={{ color: '#5D009F' }}>
                {formatLockoutDate(nextAttemptDate)}
              </strong>
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 2rem',
                backgroundColor: '#5D009F',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#450074',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IQPage;