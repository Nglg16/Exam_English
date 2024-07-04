import React, { useState, useEffect } from 'react';
import QuizComponent from '../component/QuizComponent';
import Footer from '../component/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TakeQuiz() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quizs, setQuizs] = useState([]);
  const itemsPerPage = 4;
  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    axios.get('http://localhost:9999/quiz')
      .then((res) => {
        console.log(res.data);
        setQuizs(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredQuiz = quizs.filter(quiz =>
    quiz.quizTitle && quiz.quizTitle.toLowerCase().includes(search.toLowerCase()) &&
    quiz.category && quiz.category.toLowerCase().includes(category.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuiz.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleStartQuiz = (quizId) => {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in to take the quiz.');
      return;
    }
  
    // Find the quiz object by quizId
    const selectedQuiz = quizs.find(quiz => quiz.id === quizId);
    // Navigate to DoQuiz component with quiz data if found
    if (selectedQuiz) {
      navigate(`/doquiz/${quizId}`, { state: { quiz: selectedQuiz } });
    }
  };
  

  return (
    <div className='w-100 row'>
      <div className='col-2'>
        <ul style={{ listStyleType: 'none', padding: "50px", marginTop: "60px" }}>
          <li style={{ marginBottom: '10px' }} onClick={() => handleCategory('')}>All Categories</li>
          <li style={{ marginBottom: '10px' }} onClick={() => handleCategory('Noun')}>Noun</li>
          <li style={{ marginBottom: '10px' }} onClick={() => handleCategory('Verb')}>Verb</li>
          <li style={{ marginBottom: '10px' }} onClick={() => handleCategory('Adjective')}>Adjective</li>
          <li style={{ marginBottom: '10px' }} onClick={() => handleCategory('Adverb')}>Adverb</li>
          <li style={{ marginBottom: '10px' }} onClick={() => handleCategory('Pronoun')}>Pronoun</li>
        </ul>
      </div>
      <div className='col-10'>
        <div className='row'>
          <div className='col-12' style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1>Quiz Page</h1>
            <input
              type="text"
              placeholder='Search quiz'
              value={search}
              onChange={handleSearch}
              style={{ width: "50%", marginBottom: "10px" }}
            />
          </div>
          {currentItems.map(quiz => (
            <QuizComponent
              quiz={quiz}
              key={quiz.id}
              onStartQuiz={() => handleStartQuiz(quiz.id)} // Pass callback to handle quiz start
            />
          ))}
          <div className="col-10" style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
            {Array.from({ length: Math.ceil(filteredQuiz.length / itemsPerPage) }, (item, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12">
        <Footer />
      </div>
    </div>
  );
}
