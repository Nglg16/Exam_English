import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Quiz from './pages/TakeQuiz';
import Header from './component/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import QuizManage from './pages/QuizManage';
import QuizDetail from './pages/QuizDetail';
import Add from './pages/Add';
import DoQuiz from './pages/DoQuiz';
import QuizHistory from './pages/QuizHistory';

const logo = "https://cdn.haitrieu.com/wp-content/uploads/2022/09/Logo-Anh-Ngu-Apollo.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setIsAdmin(user.Email === "admin@gmail.com");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} logo={logo} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizdt/:id" element={<QuizDetail />} />
          <Route path="/doquiz/:id" element={<DoQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {isAdmin && <Route path="/quiz-manage" element={<QuizManage />} />}
          <Route path="/add" element={<Add />} />
          <Route path="/quiz-history" element={<QuizHistory />} /> {/* Add QuizHistory route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
