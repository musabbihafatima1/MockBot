
// import React, { useState, useEffect } from "react";
// import "./TechnicalScreen.css";
// import { Link } from "react-router-dom";

// function TechnicalScreen() {
//   const [isVisible, setIsVisible] = useState(false);
//   const technicalFields = [
//     "Frontend Development",
//     "Backend Development",
//     "Full Stack Development",
//     "DevOps Engineering",
//     "Cloud Architecture",
//     "Data Science",
//     "Machine Learning",
//     "Artificial Intelligence",
//     "Cybersecurity",
//     "Blockchain Development",
//     "Mobile Development",
//     "QA Automation",
//     "Database Administration",
//     "Network Engineering",
//     "UI/UX Engineering"
//   ];

  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="job-selection-container">
//       {/* Sliding Back Button remains unchanged */}
//       <div style={{
//         position: 'fixed',
//         left: isVisible ? '0' : '-200px',
//         top: '20px',
//         transition: 'left 0.5s ease-out',
//         zIndex: 100,
//         display: 'flex',
//         alignItems: 'center'
//       }}>
//         <Link to="/userpage" style={{
//           display: 'flex',
//           alignItems: 'center',
//           textDecoration: 'none',
//           backgroundColor: '#5D009F',
//           color: 'white',
//           padding: '10px 15px 10px 10px',
//           borderRadius: '0 25px 25px 0',
//           boxShadow: '0 2px 8px rgba(93, 0, 159, 0.2)',
//           transition: 'all 0.3s ease',
//         }}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ 
//             marginRight: '8px',
//             flexShrink: 0
//           }}>
//             <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           <span style={{
//             whiteSpace: 'nowrap',
//             fontWeight: '600',
//             fontSize: '14px'
//           }}>
//             Return to Dashboard
//           </span>
//         </Link>
//       </div>

//       <header className="mock-header">
//         <div className="mock-logo">
//           <h1>
//             <Link style={{ textDecoration: "none", color: "inherit" }} to="/userpage">
//               MockBot
//             </Link>
//           </h1>
//         </div>
//       </header>
//       <main className="job-selection">
//         <h2>Select Technical Field</h2>
//         <p className="subtitle">Choose your area of expertise to begin assessment</p>
//         <div className="job-options">
//           {technicalFields.map((field) => (
//             <Link
//               key={field}
//               to="/TechnicalMcqs"
//               state={{ fieldName: field }}
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <button className="job-option">
//                 {field.split(' ').map((word, i) => (
//                   <span key={i}>{word}</span>
//                 ))}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TechnicalScreen;
import React, { useState, useEffect } from "react";
import "./TechnicalScreen.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function TechnicalScreen() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const technicalFields = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "DevOps Engineering",
    "Cloud Architecture",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Blockchain Development",
    "Mobile Development",
    "QA Automation",
    "Database Administration",
    "Network Engineering",
    "UI/UX Engineering"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleFieldSelect = async (field) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/savetechnicalfield`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ technicalField: field })
      });

      if (!response.ok) {
        throw new Error('Failed to save technical field');
      }

      navigate('/TechnicalMcqs', { state: { fieldName: field } });
    } catch (error) {
      console.error('Error saving technical field:', error);
    }
  };

  return (
    <div className="job-selection-container">
      {/* Back Button - Keep original styling */}
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

      <header className="mock-header">
        <div className="mock-logo">
          <h1>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/userpage">
              MockBot
            </Link>
          </h1>
        </div>
      </header>

      <main className="job-selection">
        <h2>Select Technical Field</h2>
        <p className="subtitle">Choose your area of expertise to begin assessment</p>
        
        <div className="job-options">
          {technicalFields.map((field) => (
            <button
              key={field}
              className="job-option"
              onClick={() => handleFieldSelect(field)}
            >
              {field.split(' ').map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TechnicalScreen;
