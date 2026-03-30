import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, index = 0 }) {
  const { dispatch: cartDispatch } = useCart();
  const { isInWishlist, dispatch: wishlistDispatch } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
    cartDispatch({ type: 'OPEN_CART' });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const categoryEmoji = {
    honey: '🍯',
    tea: '🍵',
    oils: '💧',
    skincare: '✨',
    supplements: '💊',
    wellness: '🧘',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block glass-card-hover overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-surface-200 to-surface-300 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-6xl
                        group-hover:scale-110 transition-transform duration-700">
            {categoryEmoji[product.category] || '🌿'}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <span className="bg-neon-green text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center
                      transition-all duration-300 shadow-sm ${
                        wishlisted
                          ? 'bg-red-50 text-red-500'
                          : 'bg-white/70 text-brand-200 hover:text-red-500'
                      }`}
          >
            {wishlisted ? <FaHeart size={14} /> : <FiHeart size={14} />}
          </button>

          {/* Quick Add */}
          <div
            className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/90 to-transparent
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-neon-green text-white font-semibold py-2.5 rounded-xl
                       flex items-center justify-center gap-2 text-sm shadow-md
                       hover:bg-neon-lime transition-colors"
            >
              <FiShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-brand-200 text-xs uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-outfit font-semibold text-brand-900 group-hover:text-neon-green
                       transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-brand-100'}
              />
            ))}
            <span className="text-xs text-brand-200 ml-1">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="font-outfit font-bold text-lg text-neon-green">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-brand-200/50 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
