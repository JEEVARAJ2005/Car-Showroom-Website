import { useState } from 'react';

const cabins = {
  Sedan: 'M75 62 L105 30 H190 L225 62 Z',
  Coupe: 'M80 62 L115 32 H185 L228 62 Z',
  SUV: 'M60 62 L72 28 H228 L246 62 Z',
  Hatchback: 'M70 62 L100 30 H200 Q226 34 236 62 Z',
  Pickup: 'M60 62 L84 30 H160 L176 62 Z',
};

// Shows a real photo if car.image is set (put files in /public/cars),
// otherwise draws an SVG car in the car's paint colour.
export default function CarImage({ car, big = false, badge }) {
  const [failed, setFailed] = useState(false);
  const cabin = cabins[car.type] || cabins.Sedan;
  return (
    <div className={big ? 'stage big' : 'stage'}>
      {car.image && !failed ? (
        <img src={car.image} alt={car.name} onError={() => setFailed(true)} />
      ) : (
        <svg viewBox="0 0 300 130" role="img" aria-label={`${car.name} illustration`}>
          <ellipse cx="150" cy="122" rx="125" ry="6" fill="rgba(0,0,0,.18)" />
          {car.type === 'Pickup' && <rect x="172" y="48" width="108" height="16" rx="3" fill={car.color} stroke="rgba(0,0,0,.25)" />}
          <rect x="18" y="58" width="264" height="42" rx="16" fill={car.color} />
          <path d={cabin} fill="#CFE3EE" stroke={car.color} strokeWidth="7" strokeLinejoin="round" />
          <line x1="150" y1="34" x2="150" y2="60" stroke={car.color} strokeWidth="5" />
          <rect x="268" y="68" width="12" height="7" rx="3" fill="#FFF4C2" />
          <rect x="20" y="68" width="9" height="7" rx="3" fill="#E5484D" />
          {[80, 225].map((x) => (
            <g key={x}><circle cx={x} cy="100" r="21" fill="#1B1F24" /><circle cx={x} cy="100" r="9" fill="#C9CED3" /></g>
          ))}
        </svg>
      )}
      {badge && <span className="badge-year">{badge}</span>}
    </div>
  );
}
