import React, { useState } from 'react';
import API from '../api/axios';

export default function Cart() {
  const [form, setForm]   = useState({ userId: '', productId: '', quantity: '' });
  const [viewId, setViewId] = useState('');
  const [items, setItems]  = useState([]);
  const [msg, setMsg]      = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addToCart = async () => {
    if (!form.userId || !form.productId || !form.quantity)
      return setMsg({ type: 'error', text: 'All fields are required.' });
    setLoading(true);
    try {
      await API.post('/cart/add', { userId: +form.userId, productId: +form.productId, quantity: +form.quantity });
      setMsg({ type: 'success', text: 'Item added to cart!' });
      setForm({ userId: '', productId: '', quantity: '' });
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to add to cart. Check User ID and Product ID.' });
    }
    setLoading(false);
  };

  const viewCart = async () => {
    if (!viewId) return;
    try {
      const r = await API.get(`/cart/user/${viewId}`);
      setItems(r.data);
    } catch { setItems([]); }
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`).catch(() => {});
    viewCart();
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Cart</div>
        <div className="page-sub">Add items and view user carts</div>
      </div>

      <div className="card">
        <div className="card-title">Add Item to Cart</div>
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
          <button className="btn btn-primary" onClick={addToCart} disabled={loading}>
            {loading ? 'Adding...' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">View Cart by User</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>User ID</label>
            <input type="number" placeholder="Enter User ID" value={viewId} onChange={e => setViewId(e.target.value)} />
          </div>
          <button className="btn btn-success" style={{ marginBottom: 1 }} onClick={viewCart}>View Cart</button>
        </div>
        {items.length > 0 && (
          <div className="table-wrap" style={{ marginTop: 16 }}>
            <table>
              <thead><tr><th>ID</th><th>Product ID</th><th>Quantity</th><th>Action</th></tr></thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id}>
                    <td><span style={{ color: 'var(--accent)', fontWeight: 600 }}>#{i.id}</span></td>
                    <td>Product #{i.productId}</td>
                    <td><span className="badge badge-shipped">{i.quantity} units</span></td>
                    <td><button className="btn btn-danger" style={{ padding: '5px 12px', fontSize: 12 }} onClick={() => removeItem(i.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {items.length === 0 && viewId && (
          <div className="empty" style={{ marginTop: 16 }}><div className="empty-icon">🛒</div>Cart is empty for this user.</div>
        )}
      </div>
    </div>
  );
}