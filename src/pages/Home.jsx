import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cars, heroImage } from '../data/cars';
import CarCard from '../components/CarCard';
import Status from '../components/Status';
import useFetch from '../hooks/useFetch';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { toggle } from '../store';

export default function Home() {
  useDocumentTitle('Home');
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.wishlist);
  const { data, loading, error } = useFetch('/data/reviews.json');

  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-copy">
          <h1>Drive something you will never forget.</h1>
          <p>Petrol, hybrid and electric. Explore eight handpicked cars, save your favourites and book a test drive in minutes.</p>
          <div className="row">
            <Link className="btn light" to="/cars">Browse cars</Link>
            <Link className="btn outline" to="/services/test-drive">Book a test drive</Link>
          </div>
          <ul className="stats">
            <li><strong>8</strong> models on the floor</li>
            <li><strong>3</strong> fuel types</li>
            <li><strong>24h</strong> finance approval</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Featured cars</h2>
        <div className="grid">
          {cars.slice(0, 3).map((c) => (
            <CarCard key={c.id} car={c} liked={wishlist.includes(c.id)} onToggle={(id) => dispatch(toggle(id))} />
          ))}
        </div>
      </section>

      <section>
        <h2>What buyers say</h2>
        <Status loading={loading} error={error} />
        <div className="grid">
          {data?.slice(0, 3).map((r) => (
            <blockquote key={r.id} className="quote">
              <p className="stars" aria-label={`${r.rating} out of 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
              <p>{r.text}</p>
              <cite>{r.name}, bought the {r.car}</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
