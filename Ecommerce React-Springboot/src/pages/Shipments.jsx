import React, { useState } from 'react';
import API from '../api/axios';

export default function Shipments() {
  const [form, setForm]    = useState({ orderId: '', address: '' });
  const [trackId, setTrackId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [msg, setMsg]      = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async () => {
    if (!form.orderId || !form.address) return setMsg({ type: 'error', text: 'Order ID and Address are required.' });
    setLoading(true);
    try {
      const r = await API.post('/shipments', { orderId: +form.orderId, address: form.address });
      setMsg({ type: 'success', text: `Shipment created! Tracking: ${r.data.trackingNumber}` });
      setForm({ orderId: '', address: '' });
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to create shipment.' });
    }
    setLoading(false);
  };

  const track = async () => {
    if (!trackId) return;
    try {
      const r = await API.get(`/shipments/${trackId}`);
      setShipment(r.data);
    } catch { setShipment(null); }
  };

  const badgeClass = s => ({ DISPATCHED:'badge-dispatched', IN_TRANSIT:'badge-shipped', DELIVERED:'badge-delivered' }[s] || 'badge-pending');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Shipments</div>
        <div className="page-sub">Create shipments and track deliveries</div>
      </div>

      <div className="card">
        <div className="card-title">Create Shipment</div>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <div className="form-grid">
          <div className="form-group">
            <label>Order ID</label>
            <input name="orderId" type="number" placeholder="1" value={form.orderId} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <input name="address" placeholder="Patna, Bihar - 800001" value={form.address} onChange={handle} />
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={create} disabled={loading}>
            {loading ? 'Creating...' : '🚚 Create Shipment'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Track Shipment</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Shipment ID</label>
            <input type="number" placeholder="Enter Shipment ID" value={trackId} onChange={e => setTrackId(e.target.value)} />
          </div>
          <button className="btn btn-success" onClick={track}>Track</button>
        </div>
        {shipment && (
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              ['Shipment ID', `#${shipment.id}`],
              ['Order ID', `#${shipment.orderId}`],
              ['Status', null],
              ['Tracking Number', shipment.trackingNumber],
              ['Address', shipment.address],
            ].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--bg)', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{k}</div>
                {k === 'Status'
                  ? <span className={`badge ${badgeClass(shipment.status)}`}>{shipment.status}</span>
                  : <div style={{ fontWeight: 600, fontSize: 14, color: k === 'Tracking Number' ? 'var(--accent)' : 'var(--text)' }}>{v}</div>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}