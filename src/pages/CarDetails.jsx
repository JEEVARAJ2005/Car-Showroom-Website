import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cars } from '../data/cars';
import CarImage from '../components/CarImage';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { toggle } from '../store';

export default function CarDetails() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === Number(id));
  const dispatch = useDispatch();
  const liked = useSelector((s) => s.wishlist.includes(Number(id)));
  useDocumentTitle(car ? car.name : 'Car not found');

  if (!car) return <p className="status error">This car does not exist. <Link to="/cars">Back to all cars</Link></p>;

  const specs = [['Type', car.type], ['Fuel', car.fuel], ['Power', `${car.hp} hp`], ['Model year', car.year], ['Brand', car.brand]];
  return (
    <section className="detail">
      <CarImage car={car} big />
      <div>
        <Link to="/cars" className="muted">← All cars</Link>
        <h1>{car.name}</h1>
        <p>{car.desc}</p>
        <p className="price">₹{car.price.toLocaleString('en-IN')}</p>
        <dl className="specs">
          {specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <div className="row">
          <Link className="btn" to={`/profile?car=${car.id}`}>Book a test drive</Link>
          <button className={liked ? 'btn ghost active' : 'btn ghost'} onClick={() => dispatch(toggle(car.id))}>
            {liked ? 'Saved to wishlist' : 'Save to wishlist'}
          </button>
        </div>
      </div>
    </section>
  );
}
