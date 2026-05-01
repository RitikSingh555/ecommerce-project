import React, { useState } from 'react';
import API from '../api/axios';

export default function Payments() {
  const [form, setForm]    = useState({ orderId: '', amount: '', method: 'UPI' });
  const [viewId, setViewId] = useState('');
  const [payments, setPayments] = useState([]);
  const [msg, setMsg]      = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const pay = async () => {
    if (!form.orderId || !form.amount) return setMsg({ type: 'error', text: 'Order ID and Amount are required.' });
    setLoading(true);
    try {
      await API.post('/payments', { orderId: +form.orderId, amount: parseFloat(form.amount), method: form.method });
      setMsg({ type: 'success', text: `Payment of ₹${form.amount} via ${form.method} successful!` });
      setForm({ orderId: '', amount: '', method: 'UPI' });
    } catch (e) {
      setMsg({ type: 'error', text: 'Payment failed.' });
    }
    setLoading(false);
  };

  const viewPayments = async () => {
    if (!viewId) return;
    try {
      const r = await API.get(`/payments/order/${viewId}`);
      setPayments(r.data);
    } catch { setPayments([]); }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Payments</div>
        <div className="page-sub">Process payments and view history</div>
      </div>

      <div className="card">
        <div className="card-title">Make Payment</div>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <div className="form-grid">
          <div className="form-group">
            <label>Order ID</label>
            <input name="orderId" type="number" placeholder="1" value={form.orderId} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input name="amount" type="number" placeholder="55000" value={form.amount} onChange={handle} />
          </div>
          <div className="form-group full">
            <label>Payment Method</label>
            <select name="method" value={form.method} onChange={handle}>
              <option>UPI</option><option>CARD</option><option>CASH</option><option>NET_BANKING</option>
            </select>
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={pay} disabled={loading}>
            {loading ? 'Processing...' : '💳 Pay Now'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">View Payments by Order</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Order ID</label>
            <input type="number" placeholder="Enter Order ID" value={viewId} onChange={e => setViewId(e.target.value)} />
          </div>
          <button className="btn btn-success" onClick={viewPayments}>View</button>
        </div>
        {payments.length > 0 && (
          <div className="table-wrap" style={{ marginTop: 16 }}>
            <table>
              <thead><tr><th>ID</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td><span style={{ color: 'var(--accent)', fontWeight: 600 }}>#{p.id}</span></td>
                    <td style={{ color: 'var(--green)', fontWeight: 600 }}>₹{p.amount?.toLocaleString()}</td>
                    <td>{p.method}</td>
                    <td><span className={`badge badge-${p.status?.toLowerCase()}`}>{p.status}</span></td>
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