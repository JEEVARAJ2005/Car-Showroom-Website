import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

const links = [['/', 'Home'], ['/cars', 'Cars'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact'], ['/profile', 'Profile']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useSelector((s) => s.wishlist.length);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>Apex Motors</Link>
        <button className="btn ghost menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <nav className={open ? 'links open' : 'links'}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
              {label}{label === 'Profile' && count > 0 && <span className="badge">{count}</span>}
            </NavLink>
          ))}
          <button className="btn ghost" onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} mode</button>
        </nav>
      </div>
    </header>
  );
}
