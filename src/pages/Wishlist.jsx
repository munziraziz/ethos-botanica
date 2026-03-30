import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleMoveToCart = (product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    cartDispatch({ type: 'OPEN_CART' });
  };

  const categoryEmoji = {
    honey: '🍯', tea: '🍵', oils: '💧', skincare: '✨', supplements: '💊', wellness: '🧘',
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-outfit text-4xl font-black flex items-center gap-3 text-brand-900">
            <FiHeart className="text-red-400" />
            My <span className="gradient-text">Wishlist</span>
          </h1>
          <p className="text-brand-200 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'} saved for later</p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <FiHeart className="mx-auto text-brand-100 mb-4" size={64} />
            <p className="text-brand-700 text-xl mb-2">Your wishlist is empty</p>
            <p className="text-brand-200 mb-6">Save products you love for later</p>
            <Link to="/shop" className="btn-primary inline-block">Browse Products</Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100, height: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <Link to={`/product/${item.id}`}
                    className="w-20 h-20 rounded-xl bg-surface-300 flex-shrink-0 flex items-center justify-center text-3xl hover:scale-105 transition-transform">
                    {categoryEmoji[item.category] || '🌿'}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="font-outfit font-semibold text-brand-900 hover:text-neon-green transition-colors">{item.name}</Link>
                    <p className="text-sm text-brand-200 capitalize mt-0.5">{item.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-outfit font-bold text-lg text-neon-green">${item.price.toFixed(2)}</span>
                      {item.originalPrice && <span className="text-sm text-brand-200/50 line-through">${item.originalPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button onClick={() => handleMoveToCart(item)} className="btn-primary flex-1 md:flex-initial flex items-center justify-center gap-2 text-sm py-2.5">
                      <FiShoppingCart size={16} /> Move to Cart
                    </button>
                    <button onClick={() => wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id })}
                      className="p-2.5 rounded-xl border border-brand-100/60 text-red-300 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button onClick={() => { items.forEach(item => cartDispatch({ type: 'ADD_TO_CART', payload: item })); wishlistDispatch({ type: 'CLEAR_WISHLIST' }); cartDispatch({ type: 'OPEN_CART' }); }}
                className="btn-primary flex items-center justify-center gap-2"><FiShoppingCart size={16} /> Add All to Cart</button>
              <button onClick={() => wishlistDispatch({ type: 'CLEAR_WISHLIST' })}
                className="btn-outline text-red-400 border-red-200 hover:bg-red-50 hover:text-red-500">Clear Wishlist</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
