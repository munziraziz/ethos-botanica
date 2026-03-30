import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import AuthModal from '../auth/AuthModal';
import Particles from '../ui/Particles';

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark-900 relative">
      <Particles />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
}
