import { useEffect, useReducer, useRef } from 'react';
import { validateContact } from '../utils/validate';
import useDocumentTitle from '../hooks/useDocumentTitle';

const initial = { values: { name: '', email: '', message: '' }, errors: {}, sent: false };

function reducer(state, a) {
  switch (a.type) {
    case 'change': return { ...state, sent: false, values: { ...state.values, [a.field]: a.value } };
    case 'errors': return { ...state, errors: a.errors };
    case 'sent': return { ...initial, sent: true };
    default: return state;
  }
}

export default function Contact() {
  useDocumentTitle('Contact');
  const [state, dispatch] = useReducer(reducer, initial);
  const nameRef = useRef(null);
  useEffect(() => nameRef.current.focus(), []);

  const submit = (e) => {
    e.preventDefault();
    const errors = validateContact(state.values);
    if (Object.keys(errors).length) { dispatch({ type: 'errors', errors }); return; }
    dispatch({ type: 'sent' });
    nameRef.current.focus();
  };
  const bind = (field) => ({ value: state.values[field], onChange: (e) => dispatch({ type: 'change', field, value: e.target.value }) });

  return (
    <section className="split">
      <div>
        <h1>Contact us</h1>
        <p>Questions about a car, finance or servicing? Send a message and we will reply within one working day.</p>
        <p className="muted">Phone: 0421 555 0100<br />Email: hello@apexmotors.example</p>
      </div>
      <form className="panel" onSubmit={submit} noValidate>
        {state.sent && <p className="status ok">Message sent. We will be in touch soon.</p>}
        <label>Name<input ref={nameRef} {...bind('name')} />{state.errors.name && <small className="err">{state.errors.name}</small>}</label>
        <label>Email<input type="email" {...bind('email')} />{state.errors.email && <small className="err">{state.errors.email}</small>}</label>
        <label>Message<textarea rows="4" {...bind('message')} />{state.errors.message && <small className="err">{state.errors.message}</small>}</label>
        <button className="btn">Send message</button>
      </form>
    </section>
  );
}
