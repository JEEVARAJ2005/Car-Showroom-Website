import { Link } from 'react-router-dom';
import CarImage from './CarImage';

// Reusable card: receives data and behaviour through props
export default function CarCard({ car, liked, onToggle }) {
  return (
    <article className="card">
      <Link to={`/cars/${car.id}`} className="media" aria-label={`View ${car.name}`}>
        <CarImage car={car} badge={car.fuel} />
      </Link>
      <div className="card-body">
        <div className="row between"><h3>{car.name}</h3><span className="muted">{car.year}</span></div>
        <p className="muted">{car.type} · {car.hp} hp</p>
        <div className="row between">
          <p className="price">₹{car.price.toLocaleString('en-IN')}</p>
          <div className="row">
            <button className={liked ? 'btn ghost sm active' : 'btn ghost sm'} onClick={() => onToggle(car.id)} aria-pressed={liked}>{liked ? '♥ Saved' : '♡ Save'}</button>
            <Link className="btn sm" to={`/cars/${car.id}`}>Details</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
