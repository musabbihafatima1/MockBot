import React, { useEffect, useState } from 'react';

function Quiz() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/generate-questions');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched Data:', data); // Log the fetched data
            setQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    return (
        <div style={{color: '#333', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Python Interview MCQs</h2>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={index} style={{color: '#333', marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{question.question}</p>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                            {question.options.map((option, i) => (
                                <li key={i} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>{option}</li>
                            ))}
                        </ul>
                        <p style={{ fontWeight: 'bold', color: '#2d72d9', marginTop: '10px' }}>
                            Correct Answer: {question.answer}
                        </p>
                    </div>
                ))
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
}

export default Quiz;