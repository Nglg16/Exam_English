import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:9999/accounts?Email=${email}`)
      .then(response => {
        if (response.data.length > 0) {
          axios.put(`http://localhost:9999/accounts/${response.data[0].id}`, { ...response.data[0], Password: password })
            .then(() => {
              setSuccess(true);
              setErr('');
              window.location.href = "/";
            })
            .catch(error => {
              console.error(error);
              setErr("Failed to update password. Please try again later.");
            });
        } else {
          setErr("Email not found.");
        }
      })
      .catch(error => {
        console.error(error);
        setErr("Failed to fetch data. Please try again later.");
      });
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
          {success && (
            <div className='alert alert-success' role='alert'>
              Password updated successfully!
            </div>
          )}
          <form style={{ marginTop: "40px" }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(eve) => setEmail(eve.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(eve) => setPassword(eve.target.value)}
              />
            </div>
            <div className="col d-flex justify-content-center">
              <button type="submit" className="btn btn-success">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
