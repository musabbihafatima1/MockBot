// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "./Questionbank.css";

// const Questionvault = () => {
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVisible, setIsVisible] = useState(false);
//   const questionsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const fetchAllQuestions = async () => {
//       try {
//         const [eqResponse, techResponse] = await Promise.all([
//           axios.get("http://localhost:5000/api/eq-questions"),
//           axios.get("http://localhost:5000/api/tech-questions")
//         ]);

//         const techQuestions = techResponse.data.flatMap(doc => 
//           doc.questions.map(q => ({
//             ...q,
//             category: doc.topic,
//             isTechnical: true,
//             questionText: q.question // Normalize field name for search
//           }))
//         );

//         const eqQuestions = eqResponse.data.map(q => ({
//           ...q,
//           category: 'Emotional Quotient',
//           isTechnical: false
//         }));

//         const combined = [...eqQuestions, ...techQuestions];
//         setAllQuestions(combined);
//         setFilteredQuestions(combined);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchAllQuestions();
//   }, []);

//   const handleSearch = (e) => {
//     const searchValue = e.target.value;
//     setSearchTerm(searchValue);

//     const lowerSearch = searchValue.toLowerCase();
//     const filtered = allQuestions.filter(q => {
//       const questionContent = (q.questionText || q.question || "").toLowerCase();
//       return questionContent.includes(lowerSearch);
//     });

//     setFilteredQuestions(filtered);
//     setCurrentPage(1);
//   };

//   // Pagination calculations
//   const indexOfLastQuestion = currentPage * questionsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//   const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
//   const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="question-bank-container">
//       {/* Sliding Back Button */}
//       <div style={{
//         position: 'fixed',
//         left: isVisible ? '0' : '-200px',
//         top: '20px',
//         transition: 'left 0.5s ease-out',
//         zIndex: 100,
//         display: 'flex',
//         alignItems: 'center'
//       }}>
//         <button 
//           onClick={() => navigate(-1)}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             backgroundColor: '#5D009F',
//             color: 'white',
//             padding: '10px 15px 10px 10px',
//             borderRadius: '0 25px 25px 0',
//             border: 'none',
//             boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
//             transition: 'all 0.3s ease',
//             cursor: 'pointer',
//             ':hover': {
//               backgroundColor: '#7F4AC2',
//               paddingRight: '20px'
//             }
//           }}
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 
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
//         </button>
//       </div>

//       <h2 className="question-bank-title">Question Vault</h2>

//       {/* Updated Search Bar with proper styling */}
//       <div className="search-bar">
//         <FaSearch className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search Your Questions"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="search-input"
//         />
//       </div>

//       <div className="question-list">
//         {currentQuestions.map((q, index) => (
//           <div key={index} className="question-card">
//             <h3 className="question-text">{q.questionText || q.question}</h3>
//             <div className="question-meta">
//               <span className="category">{q.category}</span>
//               <div className="difficulty-icons">
//                 <span className="difficulty">
//                   {q.isTechnical ? q.category : 'N/A'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         <span>
//           Showing {indexOfFirstQuestion + 1} -{" "}
//           {Math.min(indexOfLastQuestion, filteredQuestions.length)} of {filteredQuestions.length}
//         </span>
//         <div className="pagination-buttons">
//           <button
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="page-button"
//           >
//             &lt;
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => paginate(index + 1)}
//               className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => paginate(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="page-button"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Questionvault;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Questionbank.css";
import q1 from "../Pictures/Imageone.jpeg";
import q2 from "../Pictures/questiontwo.png";
import q3 from "../Pictures/questionthree.png";
import q4 from "../Pictures/questionfour.png";
import q5 from "../Pictures/questionfive.png";
import q6 from "../Pictures/questionsix.png";
import q7 from "../Pictures/questionseven.png";
import q8 from "../Pictures/questioneight.png";
import q9 from "../Pictures/questionnine.png";
import q10 from "../Pictures/questionten.png";
import q11 from "../Pictures/questioneleven.png";
import q12 from "../Pictures/questiontwelve.png";

const Questionvault = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const questionsPerPage = 10;
  const navigate = useNavigate();

  const iqQuestions = [
    {
      questionText: "Fill the following with the correct shape",
      image: q1,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q2,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q3,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q4,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q5,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q6,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q7,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q8,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q9,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q10,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q11,
      category: "Intelligence Quotient",
      isTechnical: false
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q12,
      category: "Intelligence Quotient",
      isTechnical: false
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const [eqResponse, techResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/eq-questions"),
          axios.get("http://localhost:5000/api/tech-questions")
        ]);

        const techQuestions = techResponse.data.flatMap(doc => 
          doc.questions.map(q => ({
            ...q,
            category: "Technical", // Main category
            questionType: doc.topic, // Specific type like "Mobile Development"
            questionText: q.question
          }))
        );

        const eqQuestions = eqResponse.data.map(q => ({
          ...q,
          category: 'Emotional Quotient',
          isTechnical: false
        }));

        const combined = [...eqQuestions, ...techQuestions, ...iqQuestions];
        setAllQuestions(combined);
        setFilteredQuestions(combined);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchAllQuestions();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const categoryFiltered = selectedCategory === "All" 
      ? allQuestions 
      : allQuestions.filter(q => q.category === selectedCategory);

    const searchFiltered = categoryFiltered.filter(q => {
      const questionContent = (q.questionText || q.question || "").toLowerCase();
      return questionContent.includes(lowerSearch);
    });

    setFilteredQuestions(searchFiltered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, allQuestions]);

  // Pagination calculations
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="question-bank-container">
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
        <button 
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            backgroundColor: '#5D009F',
            color: 'white',
            padding: '10px 15px 10px 10px',
            borderRadius: '0 25px 25px 0',
            border: 'none',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#7F4AC2',
              paddingRight: '20px'
            }
          }}
        >
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
        </button>
      </div>

      <h2 className="question-bank-title">Question Vault</h2>

      {/* Search Bar */}
      <div className="filters-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Emotional Quotient">EQ</option>
            <option value="Intelligence Quotient">IQ</option>
          </select>
        </div>
      </div>

      <div className="question-list">
        {currentQuestions.map((q, index) => (
          <div key={index} className="question-card">
            <h3 className="question-text">{q.questionText || q.question}</h3>
            {q.image && (
              <div className="question-image-container">
                <img 
                  src={q.image} 
                  alt="Question visual" 
                  className="question-image"
                />
              </div>
            )}
            <div className="question-meta">
              <span className="category">{q.category}</span>
              <div className="type-tag">
                {q.questionType || 'General'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <span>
          Showing {indexOfFirstQuestion + 1} -{" "}
          {Math.min(indexOfLastQuestion, filteredQuestions.length)} of {filteredQuestions.length}
        </span>
        <div className="pagination-buttons">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionvault;

