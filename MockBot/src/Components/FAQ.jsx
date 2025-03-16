import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    { 
      question: "Why did you make this site?", 
      answer: "This site was created to simplify interview preparation and help candidates enhance their skills effectively.",
      id: 1,
      open: false 
    },
    { 
      question: "How accurate are the AI interview questions and feedback?", 
      answer: "Our AI interview questions and feedback are designed using advanced algorithms to provide realistic and constructive insights.",
      id: 2,
      open: false 
    },
    { 
      question: "Can I use this site to practice interviews for any job role?", 
      answer: "Yes, our platform supports a wide range of job roles with tailored interview questions and tips.",
      id: 3,
      open: false 
    },
  ]);

  const toggleFAQ = (id) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, open: !faq.open } : faq
    ));
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>How can we help you?</p>
      </div>

      <div className="faq-list">
        {faqs.map(faq => (
          <div 
            key={faq.id} 
            className={`faq-item ${faq.open ? 'open' : ''}`} 
            onClick={() => toggleFAQ(faq.id)}
          >
            <div className="faq-question">
              <p>{faq.question}</p>
              <span className="arrow">{faq.open ? "▲" : "▼"}</span>
            </div>
            {faq.open && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;