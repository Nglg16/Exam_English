import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setForm] = useState({
    Email: '',
    Name: '',
    Password: ''
  });

  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Email === "" || formData.Name === "" || formData.Password === "") {
      setErr("Fill in all the information");
      return;
    } else {
      // Check if email already exists
      axios.get(`http://localhost:9999/accounts?Email=${formData.Email}`)
        .then(response => {
          if (response.data.length > 0) {
            setErr("Email already exists");
          } else {
            // Proceed with registration
            axios.post("http://localhost:9999/accounts", formData)
              .then(response => {
                console.log("Success");
                setErr('');
                window.location.href = '/';
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
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
              <label>Name</label>
              <input
                type="text"
                id="form2Example2"
                className="form-control"
                value={formData.Name}
                onChange={(eve) => setForm({ ...formData, Name: eve.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                id="form2Example3"
                className="form-control"
                value={formData.Password}
                onChange={(eve) => setForm({ ...formData, Password: eve.target.value })}
              />
            </div>
            <div className="col d-flex justify-content-center">
              <button type="submit" className="btn btn-success" style={{ marginBottom: "40px" }}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
