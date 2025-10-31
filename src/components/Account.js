import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Account page: show and edit profile, logout
export default function Account() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!u) {
      navigate('/login');
      return;
    }
    setUser(u);
    setName(u.name);
    setEmail(u.email);
  }, [navigate]);

  const save = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(x => x.id === user.id);
    const updated = { ...user, name, email };
    if (idx >= 0) users[idx] = updated;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    setMessage('Saved changes.');
    setTimeout(() => setMessage(''), 3000);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>Account</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {!editing ? (
          <div className="card p-3">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="card p-3">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button className="btn btn-success me-2" onClick={save}>Save</button>
            <button className="btn btn-outline-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
