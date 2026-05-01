import React from 'react';

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',  icon: '⬛' },
  { id: 'users',      label: 'Users',       icon: '👤' },
  { id: 'products',   label: 'Products',    icon: '📦' },
  { id: 'cart',       label: 'Cart',        icon: '🛒' },
  { id: 'orders',     label: 'Orders',      icon: '📋' },
  { id: 'payments',   label: 'Payments',    icon: '💳' },
  { id: 'shipments',  label: 'Shipments',   icon: '🚚' },
];

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">shop<span>.</span>admin</div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
      <div style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
        Spring Boot · localhost:8080
      </div>
    </aside>
  );
}