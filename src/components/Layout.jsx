import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container"><Outlet /></main>
      <footer className="footer">
        <div className="container">
          <strong>Apex Motors</strong>
          <span>12 Showroom Road, Coimbatore · Open daily 9:00 AM – 10:00 PM</span>
        </div>
      </footer>
    </>
  );
}
