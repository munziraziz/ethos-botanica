import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, FiChevronRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { dispatch: cartDispatch } = useCart();
  const { isInWishlist, dispatch: wishlistDispatch } = useWishlist();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h1 className="font-outfit text-3xl font-bold mb-4 text-brand-900">Product Not Found</h1>
        <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const categoryEmoji = {
    honey: '🍯', tea: '🍵', oils: '💧', skincare: '✨', supplements: '💊', wellness: '🧘',
  };

  const handleAddToCart = () => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    cartDispatch({ type: 'OPEN_CART' });
  };

  const handleBuyNow = () => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    navigate('/checkout');
  };

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-200 mb-8">
          <Link to="/" className="hover:text-neon-green transition-colors">Home</Link>
          <FiChevronRight size={14} />
          <Link to="/shop" className="hover:text-neon-green transition-colors">Shop</Link>
          <FiChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-neon-green transition-colors capitalize">
            {product.category}
          </Link>
          <FiChevronRight size={14} />
          <span className="text-brand-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass-card overflow-hidden aspect-square flex items-center justify-center relative bg-surface-200">
              <div className="text-[12rem]">{categoryEmoji[product.category] || '🌿'}</div>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-neon-green text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-sm">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-sm">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <p className="text-neon-green text-sm uppercase tracking-widest font-medium mb-2">{product.category}</p>
              <h1 className="font-outfit text-3xl md:text-4xl font-black text-brand-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={16} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-brand-100'} />
                  ))}
                </div>
                <span className="text-sm text-brand-200">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-outfit text-4xl font-black gradient-text">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-brand-200/50 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {discountPercent > 0 && (
                <span className="bg-red-50 text-red-500 text-sm font-bold px-2 py-0.5 rounded-lg">Save {discountPercent}%</span>
              )}
            </div>

            <p className="text-brand-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  <span className="text-brand-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4 border-t border-brand-100/40">
              <div className="flex items-center gap-4">
                <span className="text-sm text-brand-200">Quantity:</span>
                <div className="flex items-center gap-0 border border-brand-100/60 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-brand-200 hover:bg-neon-green/10 hover:text-neon-green transition-all">
                    <FiMinus size={14} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-medium border-x border-brand-100/60 text-brand-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-brand-200 hover:bg-neon-green/10 hover:text-neon-green transition-all">
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <FiShoppingCart size={18} /> Add to Cart
                </button>
                <button
                  onClick={() => {
                    if (wishlisted) wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
                    else wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
                  }}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                    wishlisted ? 'border-red-300 bg-red-50 text-red-500' : 'border-brand-100/60 text-brand-200 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  {wishlisted ? <FaHeart size={18} /> : <FiHeart size={18} />}
                </button>
              </div>
              <button onClick={handleBuyNow} className="btn-outline w-full">Buy Now</button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-100/40">
              {[
                { icon: FiTruck, label: 'Free Shipping' },
                { icon: FiShield, label: 'Secure Payment' },
                { icon: FiRefreshCw, label: '30-Day Returns' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                  <badge.icon className="text-neon-green" size={18} />
                  <span className="text-xs text-brand-200">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-0 border-b border-brand-100/40 mb-8">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-all relative ${
                  activeTab === tab ? 'text-neon-green' : 'text-brand-200 hover:text-brand-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green" />
                )}
              </button>
            ))}
          </div>

          <div className="glass-card p-6 md:p-8">
            {activeTab === 'description' && (
              <div className="space-y-4 text-brand-700 leading-relaxed max-w-3xl">
                <p>{product.description}</p>
                <h4 className="font-outfit font-semibold text-brand-900 mt-6">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-green" />{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <span className="text-4xl mb-3 block">⭐</span>
                <p className="text-brand-200">Reviews coming soon! This product has {product.reviews} reviews with an average rating of {product.rating}/5.</p>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-3 text-brand-700 max-w-2xl">
                <p>🚚 <strong className="text-brand-900">Free Standard Shipping</strong> on orders over $50</p>
                <p>⚡ <strong className="text-brand-900">Express Delivery</strong> available for $9.99 (1-2 business days)</p>
                <p>🌍 <strong className="text-brand-900">International Shipping</strong> to over 50 countries</p>
                <p>📦 <strong className="text-brand-900">Easy Returns</strong> within 30 days of purchase</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-outfit text-3xl font-bold mb-8 text-brand-900">
              Related <span className="gradient-text">Products</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
