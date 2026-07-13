import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';
import { Shield } from 'lucide-react';

export function Layout() {
  return (
    <div className="layout-wrapper">
      <header className="header">
        <div className="header-inner container">
          <NavLink to="/" className="brand">
            <Shield className="brand-icon" size={24} />
            Lelo<span>ir</span>
          </NavLink>
          <nav className="top-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/install" className={({ isActive }) => isActive ? 'active' : ''}>Install</NavLink>
            <NavLink to="/architecture" className={({ isActive }) => isActive ? 'active' : ''}>Architecture</NavLink>
            <NavLink to="/crds" className={({ isActive }) => isActive ? 'active' : ''}>CRDs</NavLink>
            <NavLink to="/roadmap" className={({ isActive }) => isActive ? 'active' : ''}>Roadmap</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer container">
        <div className="footer-content">
          <p>Leloir Governance Control Plane © 2026. Open Source under Apache 2.0.</p>
        </div>
      </footer>
    </div>
  );
}
