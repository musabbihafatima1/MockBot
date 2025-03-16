
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Questionbank.css";

const Questionvault = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;
  const navigate = useNavigate();

  // Fetch EQ questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/eq-questions"); // Replace with your API endpoint
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
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="question-bank-container">
      {/* Back Arrow */}
      <div className="navigation-panel">
        <button className="navigation-back-button" onClick={() => navigate(-1)}>
          &#8592; 
        </button>
      </div>

      <h2 className="question-bank-title">Question Vault</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
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
                <span className="difficulty">N/A</span> {/* Add difficulty if needed */}
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
