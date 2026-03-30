import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, dispatch: cartDispatch } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, openLogin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/shop?category=honey', label: 'Honey' },
    { path: '/shop?category=supplements', label: 'Pharmacy' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-brand-100/30 shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-lime flex items-center justify-center
                            group-hover:shadow-neon transition-shadow duration-500">
                <span className="text-white font-outfit font-black text-lg">E</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-outfit font-bold text-lg text-brand-900 group-hover:text-neon-green transition-colors">
                  Ethos
                </span>
                <span className="font-outfit font-light text-lg text-neon-green"> Botanica</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium text-sm tracking-wide transition-colors duration-300
                    ${location.pathname === link.path && !link.path.includes('?')
                      ? 'text-neon-green'
                      : 'text-brand-200 hover:text-neon-green'
                    }`}
                >
                  {link.label}
                  {location.pathname === link.path && !link.path.includes('?') && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-green rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-brand-200 hover:text-neon-green transition-colors relative"
              >
                <FiSearch size={20} />
              </button>

              <Link
                to="/wishlist"
                className="p-2 text-brand-200 hover:text-neon-green transition-colors relative"
              >
                <FiHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-green text-white text-[10px]
                                 font-bold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => cartDispatch({ type: 'TOGGLE_CART' })}
                className="p-2 text-brand-200 hover:text-neon-green transition-colors relative"
              >
                <FiShoppingCart size={20} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-green text-white text-[10px]
                             font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-neon-lime
                                flex items-center justify-center text-white font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={logout} className="p-2 text-brand-200 hover:text-red-500 transition-colors">
                    <FiLogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLogin}
                  className="hidden md:flex p-2 text-brand-200 hover:text-neon-green transition-colors"
                >
                  <FiUser size={20} />
                </button>
              )}

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 text-brand-200 hover:text-neon-green transition-colors"
              >
                {mobileMenu ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-brand-100/30 overflow-hidden bg-white/80 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200/50" size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-11 pr-24"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-neon-green/10 text-neon-green
                             px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-neon-green/20 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl z-50
                     border-l border-brand-100/30 p-6 pt-20 md:hidden shadow-xl"
          >
            <button
              onClick={() => setMobileMenu(false)}
              className="absolute top-5 right-5 text-brand-200 hover:text-neon-green"
            >
              <FiX size={24} />
            </button>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-medium text-brand-700 hover:text-neon-green transition-colors
                           py-2 border-b border-brand-100/30"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/wishlist"
                className="text-lg font-medium text-brand-700 hover:text-neon-green transition-colors
                         py-2 border-b border-brand-100/30"
              >
                Wishlist ({wishlistItems.length})
              </Link>
              {user ? (
                <button
                  onClick={logout}
                  className="text-lg font-medium text-red-500 hover:text-red-600 transition-colors py-2 text-left"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={openLogin}
                  className="btn-primary mt-4 text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
