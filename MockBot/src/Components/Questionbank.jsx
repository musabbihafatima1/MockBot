import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Questionbank.css";

const Questionvault = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const questionsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch EQ questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/eq-questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching EQ questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Filter questions based on search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredQuestions = questions.filter((q) =>
      q.questionText.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setQuestions(filteredQuestions);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

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
      <div className="search-bar">
        <FaSearch className="" />
        <input
          type="text"
          placeholder="Search Your Questions"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* List of Questions */}
      <div className="question-list">
        {currentQuestions.map((q, index) => (
          <div key={index} className="question-card">
            <h3 className="question-text">{q.questionText}</h3>
            <div className="question-meta">
              <span className="category">Emotional Quotient</span>
              <div className="difficulty-icons">
                <span className="difficulty">N/A</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>
          Showing {indexOfFirstQuestion + 1} -{" "}
          {Math.min(indexOfLastQuestion, questions.length)} of {questions.length} Questions
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