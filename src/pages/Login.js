import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setForm] = useState({ Email: '', Password: '' });
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.Email || !formData.Password) {
      setErr("Fill in all the information");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.get(`http://localhost:9999/accounts?Email=${encodeURIComponent(formData.Email)}&Password=${encodeURIComponent(formData.Password)}`);
  
      setIsLoading(false);
  
      if (response.data.length > 0) {
        const user = response.data[0];
        // Verify if the retrieved user's password matches the input password
        if (user.Password === formData.Password) {
          // Login successful
          console.log("Login successful");
          setErr('');
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = '/';
        } else {
          // Password does not match
          setErr("Email or Password wrong");
        }
      } else {
        // No user found with the provided email
        setErr("Email or Password wrong");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("There was an error!", error);
      setErr("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          {err && (
            <div className='alert alert-danger' role='alert'>
              {err}
            </div>
          )}
          <form style={{ marginTop: "40px" }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                value={formData.Email}
                onChange={(eve) => setForm({ ...formData, Email: eve.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                value={formData.Password}
                onChange={(eve) => setForm({ ...formData, Password: eve.target.value })}
              />
            </div>
            <div className="col d-flex justify-content-center">
              <button type="submit" className="btn btn-success" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </div>
            <div className="text-center">
              <p>Not a member? <a href="/register">Register</a></p>
              <p><a href="/forgot-password">Forgot Password?</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
