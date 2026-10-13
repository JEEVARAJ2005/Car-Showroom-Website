import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cars } from '../data/cars';
import { clear, toggle } from '../store';
import { validateBooking } from '../utils/validate';
import Status from '../components/Status';
import useDocumentTitle from '../hooks/useDocumentTitle';

// CRUD state handled with useReducer
function bookingsReducer(state, a) {
  switch (a.type) {
    case 'add': return [...state, { ...a.item, id: Date.now() }];
    case 'update': return state.map((b) => (b.id === a.item.id ? a.item : b));
    case 'delete': return state.filter((b) => b.id !== a.id);
    default: return state;
  }
}

export default function Profile() {
  useDocumentTitle('Profile');
  const [params] = useSearchParams();
  const emptyForm = { name: '', phone: '', car: params.get('car') || '', date: '' };
  const [bookings, dispatch] = useReducer(bookingsReducer, JSON.parse(localStorage.getItem('bookings') || '[]'));
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const nameRef = useRef(null);
  const wishlist = useSelector((s) => s.wishlist);
  const reduxDispatch = useDispatch();

  useEffect(() => localStorage.setItem('bookings', JSON.stringify(bookings)), [bookings]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validateBooking(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    dispatch(editingId ? { type: 'update', item: { ...form, id: editingId } } : { type: 'add', item: form });
    setForm({ ...emptyForm, car: '' });
    setEditingId(null);
  };

  const edit = (b) => { setForm(b); setEditingId(b.id); nameRef.current.focus(); };
  const carName = (id) => cars.find((c) => c.id === Number(id))?.name ?? 'Unknown';
  const saved = cars.filter((c) => wishlist.includes(c.id));

  return (
    <>
      <h1>My profile</h1>
      <section>
        <h2>Wishlist ({saved.length})</h2>
        <Status empty={saved.length === 0} emptyText="You have not saved any cars. Browse the cars page and select Save." />
        <ul className="plain">
          {saved.map((c) => (
            <li key={c.id} className="row between">
              <Link to={`/cars/${c.id}`}>{c.name}</Link>
              <button className="btn ghost" onClick={() => reduxDispatch(toggle(c.id))}>Remove</button>
            </li>
          ))}
        </ul>
        {saved.length > 0 && <button className="btn ghost" onClick={() => reduxDispatch(clear())}>Clear wishlist</button>}
      </section>

      <section className="split">
        <form className="panel" onSubmit={submit} noValidate>
          <h2>{editingId ? 'Edit booking' : 'Book a test drive'}</h2>
          <label>Name<input ref={nameRef} name="name" value={form.name} onChange={change} />{errors.name && <small className="err">{errors.name}</small>}</label>
          <label>Phone<input name="phone" value={form.phone} onChange={change} inputMode="numeric" />{errors.phone && <small className="err">{errors.phone}</small>}</label>
          <label>Car
            <select name="car" value={form.car} onChange={change}>
              <option value="">Choose a car</option>
              {cars.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.car && <small className="err">{errors.car}</small>}
          </label>
          <label>Date<input type="date" name="date" value={form.date} onChange={change} />{errors.date && <small className="err">{errors.date}</small>}</label>
          <div className="row">
            <button className="btn">{editingId ? 'Save changes' : 'Book test drive'}</button>
            {editingId && <button type="button" className="btn ghost" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Cancel</button>}
          </div>
        </form>
        <div>
          <h2>My bookings ({bookings.length})</h2>
          <Status empty={bookings.length === 0} emptyText="No bookings yet. Fill in the form to reserve a slot." />
          <ul className="plain">
            {bookings.map((b) => (
              <li key={b.id} className="booking">
                <div><strong>{carName(b.car)}</strong><br /><span className="muted">{b.date} · {b.name} · {b.phone}</span></div>
                <div className="row">
                  <button className="btn ghost" onClick={() => edit(b)}>Edit</button>
                  <button className="btn ghost" onClick={() => dispatch({ type: 'delete', id: b.id })}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
