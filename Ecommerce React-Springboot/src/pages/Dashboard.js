import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [counts, setCounts] = useState({ users: 0, products: 0, orders: 0, payments: 0 });

  useEffect(() => {
    Promise.all([
      API.get('/users'), API.get('/products'),
      API.get('/orders'), API.get('/payments/order/0').catch(() => ({ data: [] }))
    ]).then(([u, p, o]) => {
      setCounts({ users: u.data.length, products: p.data.length, orders: o.data.length, payments: 0 });
    }).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Users',    value: counts.users,    color: 'purple' },
    { label: 'Total Products', value: counts.products, color: 'green' },
    { label: 'Total Orders',   value: counts.orders,   color: 'yellow' },
    { label: 'Active Modules', value: 6,               color: 'red' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-sub">Overview of your e-commerce application</div>
      </div>

      <div className="stats-row">
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Quick Start Guide</div>
        {[
          ['1', 'Register a User', 'Go to Users → fill the form → click Register'],
          ['2', 'Add a Product',   'Go to Products → fill name, price, stock → click Add'],
          ['3', 'Add to Cart',     'Go to Cart → enter User ID, Product ID, Quantity'],
          ['4', 'Place an Order',  'Go to Orders → enter User ID, Product ID, Quantity'],
          ['5', 'Make Payment',    'Go to Payments → enter Order ID, amount, method'],
          ['6', 'Track Shipment',  'Go to Shipments → enter Order ID and address'],
        ].map(([num, title, desc]) => (
          <div key={num} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{num}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}