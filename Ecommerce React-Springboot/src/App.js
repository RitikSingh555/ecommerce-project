import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard  from './pages/Dashboard';
import Users      from './pages/Users';
import Products   from './pages/Products';
import Cart       from './pages/Cart';
import Orders     from './pages/Orders';
import Payments   from './pages/Payments';
import Shipments  from './pages/Shipments';

const PAGES = { dashboard: Dashboard, users: Users, products: Products, cart: Cart, orders: Orders, payments: Payments, shipments: Shipments };

export default function App() {
  const [page, setPage] = useState('dashboard');
  const Page = PAGES[page];
  return (
    <div className="layout">
      <Sidebar active={page} onSelect={setPage} />
      <main className="main-content">
        <Page />
      </main>
    </div>
  );
}