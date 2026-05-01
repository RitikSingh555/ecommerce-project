import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const STATUS = ['PENDING','CONFIRMED','SHIPPED','DELIVERED'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [form, setForm]     = useState({ userId: '', productId: '', quantity: '' });
  const [msg, setMsg]       = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => API.get('/orders').then(r => setOrders(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    if (!form.userId || !form.productId || !form.quantity)
      return setMsg({ type: 'error', text: 'All fields are required.' });
    setLoading(true);
    try {
      await API.post('/orders', { userId: +form.userId, productId: +form.productId, quantity: +form.quantity });
      setMsg({ type: 'success', text: 'Order placed successfully!' });
      setForm({ userId: '', productId: '', quantity: '' });
      load();
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to place order.' });
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}/status?status=${status}`).catch(() => {});
    load();
  };

  const badgeClass = s => ({ PENDING:'badge-pending', CONFIRMED:'badge-confirmed', SHIPPED:'badge-shipped', DELIVERED:'badge-delivered' }[s] || 'badge-pending');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Orders</div>
        <div className="page-sub">Place orders and manage their status</div>
      </div>

      <div className="card">
        <div className="card-title">Place New Order</div>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <div className="form-grid">
          <div className="form-group">
            <label>User ID</label>
            <input name="userId" type="number" placeholder="1" value={form.userId} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Product ID</label>
            <input name="productId" type="number" placeholder="1" value={form.productId} onChange={handle} />
          </div>
          <div className="form-group full">
            <label>Quantity</label>
            <input name="quantity" type="number" placeholder="2" value={form.quantity} onChange={handle} />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={placeOrder} disabled={loading}>
            {loading ? 'Placing...' : '📋 Place Order'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">All Orders ({orders.length})</div>
        {orders.length === 0 ? (
          <div className="empty"><div className="empty-icon">📋</div>No orders yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>User</th><th>Product</th><th>Qty</th><th>Status</th><th>Update Status</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td><span style={{ color: 'var(--accent)', fontWeight: 600 }}>#{o.id}</span></td>
                    <td>User #{o.userId}</td>
                    <td>Product #{o.productId}</td>
                    <td>{o.quantity}</td>
                    <td><span className={`badge ${badgeClass(o.status)}`}>{o.status}</span></td>
                    <td>
                      <select style={{ padding: '5px 10px', fontSize: 12, borderRadius: 6, minWidth: 120 }}
                        value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                        {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
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