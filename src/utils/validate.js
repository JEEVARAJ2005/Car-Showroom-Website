const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact({ name, email, message }) {
  const e = {};
  if (name.trim().length < 3) e.name = 'Enter at least 3 characters.';
  if (!emailRe.test(email)) e.email = 'Enter a valid email address.';
  if (message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
  return e;
}

export function validateBooking({ name, phone, car, date }) {
  const e = {};
  if (name.trim().length < 3) e.name = 'Enter at least 3 characters.';
  if (!/^\d{10}$/.test(phone)) e.phone = 'Phone must be 10 digits.';
  if (!car) e.car = 'Choose a car.';
  if (!date) e.date = 'Pick a date.';
  else if (date < new Date().toISOString().slice(0, 10)) e.date = 'Date cannot be in the past.';
  return e;
}
