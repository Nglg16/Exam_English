import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DoQuiz() {
  const { id } = useParams(); // Get the quiz ID from URL params
  const [quizData, setQuizData] = useState(null); // State to store quiz data
  const [answers, setAnswers] = useState({}); // State to store user's answers
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if quiz is submitted
  const [score, setScore] = useState(0); // State to store user's score
  const [correctAnswers, setCorrectAnswers] = useState(0); // State to store number of correct answers
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quiz data from API using the ID
    axios.get(`http://localhost:9999/quiz/${id}`)
      .then((res) => {
        setQuizData(res.data); // Store fetched quiz data in state
      })
      .catch((err) => {
        console.error('Error fetching quiz:', err);
      });
  }, [id]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleSubmitQuiz = async () => {
    let totalCorrectAnswers = 0;
    quizData.questions.forEach(question => {
      if (answers[question.id] === question.CorrectAnswer) {
        totalCorrectAnswers++;
      }
    });
    const totalQuestions = quizData.questions.length;
    const userScore = (totalCorrectAnswers / totalQuestions) * 100;
    setScore(userScore.toFixed(2)); // Round to 2 decimal places
    setIsSubmitted(true);
    setCorrectAnswers(totalCorrectAnswers); // Update correctAnswers state

    // Save quiz result to database
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
    const quizResult = {
      userId: user.id,
      userName: user.Name,
      quizId: quizData.id,
      quizTitle: quizData.quizTitle,
      score: userScore.toFixed(2),
      correctAnswers: totalCorrectAnswers,
      totalQuestions: totalQuestions,
      date: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:9999/quizResults', quizResult);
      console.log('Quiz result saved successfully');
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  if (!quizData) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (isSubmitted) {
    return (
      <div className="container">
        <h2>Quiz Results</h2>
        <p>Total Score: {score} / 100</p>
        <p>Correct Answers: {correctAnswers} / {quizData.questions.length}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{quizData.quizTitle}</h2>
      <p>{quizData.Description}</p>
      <div className="card">
        <div className="card-body">
          {quizData.questions.map(question => (
            <div key={question.id} className="mb-4">
              <h3>{question.Question}</h3>
              <ul className="list-group">
                <li
                  className={`list-group-item ${answers[question.id] === 'A' ? 'active' : ''}`}
                  onClick={() => handleOptionSelect(question.id, 'A')}
                >
                  {question.A}
                </li>
                <li
                  className={`list-group-item ${answers[question.id] === 'B' ? 'active' : ''}`}
                  onClick={() => handleOptionSelect(question.id, 'B')}
                >
                  {question.B}
                </li>
                <li
                  className={`list-group-item ${answers[question.id] === 'C' ? 'active' : ''}`}
                  onClick={() => handleOptionSelect(question.id, 'C')}
                >
                  {question.C}
                </li>
                <li
                  className={`list-group-item ${answers[question.id] === 'D' ? 'active' : ''}`}
                  onClick={() => handleOptionSelect(question.id, 'D')}
                >
                  {question.D}
                </li>
              </ul>
            </div>
          ))}
          <button className="btn btn-primary mt-3" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoQuiz;
