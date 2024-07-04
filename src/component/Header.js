import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, isAdmin, onLogout, logo }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="80" height="70" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quiz">Take Quiz</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/quiz-history">Quiz History</Link> {/* Add Quiz History link */}
              </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/quiz-manage">Quiz Manage</Link>
              </li>
            )}
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link btn" onClick={onLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
