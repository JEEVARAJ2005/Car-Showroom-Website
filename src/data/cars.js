const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const heroImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80';

// Photos are hot-linked. To use your own, set image: '/cars/name.jpg' (file in /public/cars).
// If a photo fails to load, the app automatically shows an illustration instead.
export const cars = [
  { id: 1, name: 'Aurora GT', brand: 'Aurora', type: 'Coupe', price: 6500000, year: 2025, fuel: 'Petrol', hp: 450, color: '#2F6B4F', image: img('1503376780353-7e6692767b70'), desc: 'A two-door grand tourer with a twin-turbo V6 and a quiet, leather-lined cabin.' },
  { id: 2, name: 'Voltline E7', brand: 'Voltline', type: 'Sedan', price: 	5200000, year: 2025, fuel: 'Electric', hp: 380, color: '#C9CED3', image: img('1519641471654-76ce0107ad1b'), desc: 'A fast electric sedan with 520 km of range and 20-minute fast charging.' },
  { id: 3, name: 'Nomad RS', brand: 'Terra', type: 'Coupe', price: 4600000, year: 2024, fuel: 'Petrol', hp: 340, color: '#1F6F8B', image: img('1555215695-3004980ad54e'), desc: 'Sharp handling, a rev-happy engine and a driver-focused cockpit.' },
  { id: 4, name: 'Scuderia One', brand: 'Aurora', type: 'Coupe', price: 16000000, year: 2025, fuel: 'Petrol', hp: 710, color: '#B3261E', image: img('1583121274602-3e2820c69888'), desc: 'Our flagship supercar. Limited allocation, delivered with a factory tour.' },
  { id: 5, name: 'Crest Classic', brand: 'Aurora', type: 'Sedan', price: 4200000, year: 2024, fuel: 'Hybrid', hp: 290, color: '#3B3F4A', image: img('1552519507-da3b142c6e3d'), desc: 'A refined hybrid with a smooth ride and low running costs.' },
  { id: 6, name: 'Stuttgart S', brand: 'Terra', type: 'Sedan', price: 7500000, year: 2025, fuel: 'Petrol', hp: 520, color: '#3B3F4A', image: img('1544636331-e26879cd4d9b'), desc: 'Executive comfort with a performance edge and a hand-built interior.' },
  { id: 7, name: 'Ring Quattro', brand: 'Terra', type: 'Coupe', price: 	5800000, year: 2025, fuel: 'Diesel', hp: 400, color: '#14181D', image: img('1492144534655-ae79c964c9d7'), desc: 'All-wheel drive grip in any weather, with a torque-rich diesel.' },
  { id: 8, name: 'Mustang Heritage', brand: 'Voltline', type: 'Coupe', price: 4000000, year: 2024, fuel: 'Petrol', hp: 480, color: '#C0392B', image: img('1494976388531-d1058494cdd8'), desc: 'Muscle-car character with modern safety tech and a V8 soundtrack.' },
];

export const services = [
  { slug: 'test-drive', title: 'Test drive', body: 'Book a 30-minute drive in any car on our floor. Bring a valid licence and we handle the rest.', points: ['Free of charge', 'Accompanied by a product specialist', 'Same-day slots available'] },
  { slug: 'finance', title: 'Finance & EMI', body: 'Compare loan plans from partner banks and get a quote on the spot.', points: ['Rates from 8.5% a year', 'Tenures of 12 to 84 months', 'Approval within 24 hours'] },
  { slug: 'maintenance', title: 'Service & maintenance', body: 'Scheduled servicing, repairs and genuine parts from certified technicians.', points: ['Pickup and drop', 'Fixed-price service packs', '12-month parts warranty'] },
];
