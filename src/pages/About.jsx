import useFetch from '../hooks/useFetch';
import Status from '../components/Status';
import useDocumentTitle from '../hooks/useDocumentTitle';

const timeline = [['2009', 'Opened our first showroom with four cars.'], ['2016', 'Added a certified service centre.'], ['2022', 'Started selling electric vehicles.'], ['2025', 'Reached 10,000 happy owners.']];

export default function About() {
  useDocumentTitle('About');
  const { data, loading, error } = useFetch('/data/team.json');
  return (
    <>
      <section>
        <h1>About Apex Motors</h1>
        <p className="lead">We are an independent showroom that sells cars the way we would want to buy one: clear prices, honest advice and no pressure.</p>
        <ul className="plain">{timeline.map(([y, t]) => <li key={y}><strong>{y}</strong> – {t}</li>)}</ul>
      </section>
      <section>
        <h2>Meet the people behind Apex</h2>
        <Status loading={loading} error={error} />
        <div className="grid">
          {data?.map((m) => (
            <div key={m.id} className="card card-body">
              <div className="avatar">{m.name.split(' ').map((w) => w[0]).join('')}</div>
              <h3>{m.name}</h3>
              <p className="muted">{m.role}</p>
              <p>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}