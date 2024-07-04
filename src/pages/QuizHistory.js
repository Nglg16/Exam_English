import axios from 'axios';
import React, { useEffect, useState } from 'react';

function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
      if (user) {
        try {
          const res = await axios.get(`http://localhost:9999/quizResults?userId=${user.id}`);
          setQuizHistory(res.data);
        } catch (error) {
          console.error('Error fetching quiz history:', error);
        }
      }
    };

    fetchQuizHistory();
  }, []);

  return (
    <div className="container">
      <h2>Quiz History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Quiz Title</th>
            <th>Score</th>
            <th>Correct Answers</th>
            <th>Total Questions</th>
          </tr>
        </thead>
        <tbody>
          {quizHistory.map((result) => (
            <tr key={result.id}>
              <td>{new Date(result.date).toLocaleString()}</td>
              <td>{result.quizTitle}</td>
              <td>{result.score}</td>
              <td>{result.correctAnswers}</td>
              <td>{result.totalQuestions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizHistory;
