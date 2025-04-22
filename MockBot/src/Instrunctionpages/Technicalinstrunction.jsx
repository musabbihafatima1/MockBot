import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TechnicalPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    title: "Technical Skills Assessment",
    subtitle: "Evaluate your expertise in various technical domains",
    steps: [
      {
        number: 1,
        title: "Technical MCQs",
        description:
          "Answer AI-generated multiple-choice questions related to your chosen technical field.",
      },
      {
        number: 2,
        title: "Field Selection",
        description:
          "Select a technical field to generate related multiple-choice questions.",
      },
      {
        number: 3,
        title: "Submission & Scoring",
        description:
          "Submit your answers after completing the test and receive your score.",
      },
    ],
    quizPath: "/Technical",
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
      {/* Auto-sliding Back Button */}
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

      {/* Steps - Modified to center the third step */}
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
            gridColumn: index === 2 ? '1 / -1' : 'auto', // Makes the third item span all columns
            maxWidth: index === 2 ? '600px' : 'none', // Limits width for the centered item
            margin: index === 2 ? '0 auto' : '0', // Centers the third item
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)'
            }
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              justifyContent: index === 2 ? 'center' : 'flex-start' // Centers content for third item
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
                textAlign: index === 2 ? 'center' : 'left' // Centers text for third item
              }}>
                {step.title}
              </h3>
            </div>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#4A5568',
              margin: '0',
              textAlign: index === 2 ? 'center' : 'left' // Centers text for third item
            }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        padding: '40px 0'
      }}>
        <Link to={content.quizPath} style={{
          display: 'inline-block',
          backgroundColor: '#5D009F',
          color: '#FFFFFF',
          padding: '16px 40px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(92, 0, 159, 0.1)',
          ':hover': {
            backgroundColor: '#450074',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px rgba(92, 0, 159, 0.15)'
          }
        }}>
          Begin Assessment
        </Link>
      </div>
    </div>
  );
};

export default TechnicalPage;