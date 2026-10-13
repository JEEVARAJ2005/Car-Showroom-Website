import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Services, { ServiceOverview, ServiceDetail } from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="cars/:id" element={<CarDetails />} />
        {/* Nested routing */}
        <Route path="services" element={<Services />}>
          <Route index element={<ServiceOverview />} />
          <Route path=":slug" element={<ServiceDetail />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
