import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import Status from '../components/Status';
import ModelExplorer from '../components/ModelExplorer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { toggle } from '../store';

const fuels = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];

export default function Cars() {
  useDocumentTitle('Cars');
  const [params, setParams] = useSearchParams();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.wishlist);

  const q = params.get('q') || '';
  const fuel = params.get('fuel') || 'All';
  const sort = params.get('sort') || 'default';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value && value !== 'All' && value !== 'default' ? next.set(key, value) : next.delete(key);
    setParams(next);
  };

  let list = cars.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) && (fuel === 'All' || c.fuel === fuel));
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);

  return (
    <section>
      <h1>All cars</h1>
      <div className="filters">
        <input ref={searchRef} value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search by name" aria-label="Search cars" />
        <select value={fuel} onChange={(e) => update('fuel', e.target.value)} aria-label="Fuel type">
          {fuels.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select value={sort} onChange={(e) => update('sort', e.target.value)} aria-label="Sort">
          <option value="default">Sort: Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
        <button className="btn ghost" onClick={() => { setParams({}); searchRef.current.focus(); }}>Clear filters</button>
      </div>
      <p className="muted">{list.length} of {cars.length} cars</p>
      <Status empty={list.length === 0} emptyText="No cars match these filters. Try a different fuel type or clear the search." />
      <div className="grid">
        {list.map((c) => (
          <CarCard key={c.id} car={c} liked={wishlist.includes(c.id)} onToggle={(id) => dispatch(toggle(id))} />
        ))}
      </div>
      <ModelExplorer />
    </section>
  );
}
