import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';
import { Shield, Hexagon } from 'lucide-react';

export function Layout() {
  return (
    <div className="layout-wrapper">
      <header className="header">
        <div className="header-inner container">
          <NavLink to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px' }}>
              <Shield size={28} color="#74ACDF" style={{ position: 'absolute' }} />
              <Hexagon size={14} color="#FFFFFF" strokeWidth={3} style={{ position: 'relative', zIndex: 1 }} />
            </div>
            <span className="brand-text" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              <span style={{ color: '#74ACDF' }}>Le</span><span style={{ color: '#FFFFFF' }}>lo</span><span style={{ color: '#74ACDF' }}>ir</span>
            </span>
          </NavLink>
          <nav className="top-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/install" className={({ isActive }) => isActive ? 'active' : ''}>Install</NavLink>
            <NavLink to="/architecture" className={({ isActive }) => isActive ? 'active' : ''}>Architecture</NavLink>
            <NavLink to="/crds" className={({ isActive }) => isActive ? 'active' : ''}>CRDs</NavLink>
            <NavLink to="/roadmap" className={({ isActive }) => isActive ? 'active' : ''}>Roadmap</NavLink>
            <NavLink to="/memory" className={({ isActive }) => isActive ? 'active' : ''}>Memory</NavLink>
            <NavLink to="/editions" className={({ isActive }) => isActive ? 'active' : ''}>Editions</NavLink>
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
