import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => API.get('/products').then(r => setProducts(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.price) return setMsg({ type: 'error', text: 'Name and Price are required.' });
    setLoading(true);
    try {
      await API.post('/products', { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 });
      setMsg({ type: 'success', text: 'Product added successfully!' });
      setForm({ name: '', description: '', price: '', stock: '' });
      load();
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to add product.' });
    }
    setLoading(false);
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`).catch(() => {});
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Products</div>
        <div className="page-sub">Manage your product catalog</div>
      </div>

      <div className="card">
        <div className="card-title">Add New Product</div>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input name="name" placeholder="Laptop" value={form.name} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input name="price" type="number" placeholder="55000" value={form.price} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input name="stock" type="number" placeholder="10" value={form.stock} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input name="description" placeholder="Dell Laptop 15 inch" value={form.description} onChange={handle} />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? 'Adding...' : '+ Add Product'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">All Products ({products.length})</div>
        {products.length === 0 ? (
          <div className="empty"><div className="empty-icon">📦</div>No products yet. Add one above.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td><span style={{ color: 'var(--accent)', fontWeight: 600 }}>#{p.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td style={{ color: 'var(--muted)' }}>{p.description || '—'}</td>
                    <td style={{ color: 'var(--green)', fontWeight: 600 }}>₹{p.price?.toLocaleString()}</td>
                    <td><span className={`badge ${p.stock > 0 ? 'badge-success' : 'badge-failed'}`}>{p.stock}</span></td>
                    <td><button className="btn btn-danger" style={{ padding: '5px 12px', fontSize: 12 }} onClick={() => remove(p.id)}>Delete</button></td>
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