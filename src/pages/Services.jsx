import { NavLink, Outlet, Link, useParams } from 'react-router-dom';
import { services } from '../data/cars';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Parent route: sidebar + <Outlet /> for the nested child pages
export default function Services() {
  useDocumentTitle('Services');
  return (
    <section className="split">
      <aside>
        <h1>Services</h1>
        <nav className="side">
          <NavLink to="/services" end>Overview</NavLink>
          {services.map((s) => <NavLink key={s.slug} to={s.slug}>{s.title}</NavLink>)}
        </nav>
      </aside>
      <div className="panel"><Outlet /></div>
    </section>
  );
}

export function ServiceOverview() {
  return (
    <>
      <h2>How we help after you choose</h2>
      <p>From your first test drive to your 50,000 km service, one team looks after you. Pick a service to see what is included.</p>
      <ul className="plain">
        {services.map((s) => <li key={s.slug}><Link to={s.slug}>{s.title}</Link> – {s.body}</li>)}
      </ul>
    </>
  );
}

export function ServiceDetail() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  if (!s) return <p className="status error">Service not found. <Link to="/services">See all services</Link></p>;
  return (
    <>
      <h2>{s.title}</h2>
      <p>{s.body}</p>
      <ul className="plain">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
      {slug === 'test-drive' && <Link className="btn" to="/profile">Book now</Link>}
      {slug !== 'test-drive' && <Link className="btn" to="/contact">Ask about {s.title.toLowerCase()}</Link>}
    </>
  );
}
