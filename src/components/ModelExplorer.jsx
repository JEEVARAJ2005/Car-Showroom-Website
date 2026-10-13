import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import Status from './Status';

const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Tesla', 'Hyundai'];

// Live data from the free NHTSA vPIC API (no API key needed)
export default function ModelExplorer() {
  const [make, setMake] = useState('Toyota');
  const { data, loading, error } = useFetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make.toLowerCase()}?format=json`
  );
  const models = data?.Results?.slice(0, 18) ?? [];

  return (
    <section>
      <h2>Order from other brands</h2>
      <p className="muted">Not on our floor? Pick a make to see current models we can source for you (live from the NHTSA vehicle API).</p>
      <div className="row" role="tablist">
        {makes.map((m) => (
          <button key={m} className={m === make ? 'btn' : 'btn ghost'} onClick={() => setMake(m)}>{m}</button>
        ))}
      </div>
      <Status loading={loading} error={error} empty={!loading && !error && models.length === 0} emptyText="No models found for this make." />
      <ul className="chips">
        {models.map((m) => <li key={m.Model_ID}>{m.Model_Name}</li>)}
      </ul>
    </section>
  );
}
