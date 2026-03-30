import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, dispatch } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-900/20 backdrop-blur-sm z-50"
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white/95 backdrop-blur-xl
                     border-l border-brand-100/30 z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-100/30">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="text-neon-green" size={22} />
                <h2 className="font-outfit text-xl font-bold text-brand-900">Shopping Cart</h2>
                <span className="bg-neon-green/15 text-neon-green text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                className="p-2 text-brand-200 hover:text-neon-green transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FiShoppingBag className="text-brand-100 mb-4" size={64} />
                  <p className="text-brand-200 text-lg mb-2">Your cart is empty</p>
                  <p className="text-brand-200/60 text-sm mb-6">Add some products to get started</p>
                  <Link
                    to="/shop"
                    onClick={() => dispatch({ type: 'CLOSE_CART' })}
                    className="btn-primary"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, height: 0 }}
                      className="glass-card p-4 flex gap-4"
                    >
                      <div className="w-20 h-20 rounded-xl bg-surface-300 flex-shrink-0
                                    flex items-center justify-center text-3xl overflow-hidden">
                        🌿
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-outfit font-semibold text-sm text-brand-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-neon-green font-semibold text-sm mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, quantity: item.quantity - 1 }
                              })}
                              className="w-7 h-7 rounded-lg bg-surface-300 flex items-center justify-center
                                       text-brand-200 hover:bg-neon-green/10 hover:text-neon-green transition-all"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="text-sm font-medium w-8 text-center text-brand-900">{item.quantity}</span>
                            <button
                              onClick={() => dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, quantity: item.quantity + 1 }
                              })}
                              className="w-7 h-7 rounded-lg bg-surface-300 flex items-center justify-center
                                       text-brand-200 hover:bg-neon-green/10 hover:text-neon-green transition-all"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                            className="p-1.5 text-red-300 hover:text-red-500 transition-colors"
                          >
                            <IoTrashOutline size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-100/30 p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-200">Subtotal</span>
                  <span className="text-brand-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-200">Shipping</span>
                  <span className="text-neon-green text-xs font-medium">FREE</span>
                </div>
                <div className="flex items-center justify-between font-outfit font-bold text-lg border-t border-brand-100/30 pt-4">
                  <span className="text-brand-900">Total</span>
                  <span className="gradient-text">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="w-full text-center text-sm text-red-400 hover:text-red-500 transition-colors py-2"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
