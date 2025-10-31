import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Register form: stores new user in localStorage
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return setError('Email already registered');
    }

    const user = { id: Date.now(), name, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    // Log the user in immediately
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/account');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">Create account</button>
          <Link to="/login" className="btn btn-link">Already have an account?</Link>
        </form>
      </div>
    </div>
  );
}
