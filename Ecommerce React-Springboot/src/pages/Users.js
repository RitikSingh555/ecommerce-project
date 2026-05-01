import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Users() {
  const [users, setUsers]   = useState([]);
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [msg, setMsg]       = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => API.get('/users').then(r => setUsers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.password)
      return setMsg({ type: 'error', text: 'All fields are required.' });
    setLoading(true);
    try {
      await API.post('/users/register', form);
      setMsg({ type: 'success', text: 'User registered successfully!' });
      setForm({ name: '', email: '', password: '' });
      load();
    } catch (e) {
      setMsg({ type: 'error', text: e.response?.data?.message || 'Registration failed. Email may already exist.' });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Users</div>
        <div className="page-sub">Register and manage user accounts</div>
      </div>

      <div className="card">
        <div className="card-title">Register New User</div>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" placeholder="Rahul Kumar" value={form.name} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="rahul@gmail.com" value={form.email} onChange={handle} />
          </div>
          <div className="form-group full">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? 'Registering...' : '+ Register User'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">All Users ({users.length})</div>
        {users.length === 0 ? (
          <div className="empty"><div className="empty-icon">👤</div>No users yet. Register one above.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><span style={{ color: 'var(--accent)', fontWeight: 600 }}>#{u.id}</span></td>
                    <td>{u.name}</td>
                    <td style={{ color: 'var(--muted)' }}>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}