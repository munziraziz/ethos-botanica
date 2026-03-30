import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiChevronRight, FiCreditCard, FiTruck, FiCheck, FiLock } from 'react-icons/fi';

const steps = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const { items, totalPrice, dispatch } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <span className="text-6xl block mb-4">🛒</span>
        <h1 className="font-outfit text-3xl font-bold mb-4 text-brand-900">Your cart is empty</h1>
        <p className="text-brand-200 mb-6">Add some products before checkout</p>
        <Link to="/shop" className="btn-primary inline-block">Browse Products</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 rounded-full bg-neon-green/15 border-2 border-neon-green flex items-center justify-center mx-auto mb-6">
          <FiCheck className="text-neon-green" size={40} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-outfit text-4xl font-black mb-3 text-brand-900">
          Order <span className="gradient-text">Confirmed!</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-brand-200 mb-2">
          Thank you for shopping with Ethos Botanica
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-brand-200/60 text-sm mb-8">
          Order #{Math.random().toString(36).substr(2, 9).toUpperCase()} • Confirmation sent to your email
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-brand-200 mb-8">
          <Link to="/" className="hover:text-neon-green transition-colors">Home</Link>
          <FiChevronRight size={14} />
          <span className="text-brand-900">Checkout</span>
        </nav>

        <h1 className="font-outfit text-3xl md:text-4xl font-black mb-8 text-brand-900">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i <= currentStep ? 'bg-neon-green text-white' : 'bg-surface-300 text-brand-200 border border-brand-100/60'
                }`}>
                  {i < currentStep ? <FiCheck size={18} /> : i + 1}
                </div>
                <span className={`text-xs mt-2 ${i <= currentStep ? 'text-neon-green' : 'text-brand-200'}`}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 mb-6 transition-all duration-500 ${
                  i < currentStep ? 'bg-neon-green' : 'bg-brand-100/40'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 md:p-8">
              {currentStep === 0 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-6">
                    <FiTruck className="text-neon-green" size={20} />
                    <h2 className="font-outfit text-xl font-bold text-brand-900">Shipping Information</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm text-brand-200 mb-1.5">First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" placeholder="John" /></div>
                    <div><label className="block text-sm text-brand-200 mb-1.5">Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" placeholder="Doe" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm text-brand-200 mb-1.5">Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" /></div>
                    <div><label className="block text-sm text-brand-200 mb-1.5">Phone</label><input name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" /></div>
                  </div>
                  <div><label className="block text-sm text-brand-200 mb-1.5">Address</label><input name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="123 Wellness St" /></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className="block text-sm text-brand-200 mb-1.5">City</label><input name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="Portland" /></div>
                    <div><label className="block text-sm text-brand-200 mb-1.5">State</label><input name="state" value={formData.state} onChange={handleChange} className="input-field" placeholder="Oregon" /></div>
                    <div><label className="block text-sm text-brand-200 mb-1.5">ZIP Code</label><input name="zip" value={formData.zip} onChange={handleChange} className="input-field" placeholder="97205" /></div>
                  </div>
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-6">
                    <FiCreditCard className="text-neon-green" size={20} />
                    <h2 className="font-outfit text-xl font-bold text-brand-900">Payment Details</h2>
                  </div>
                  <div><label className="block text-sm text-brand-200 mb-1.5">Card Number</label><input name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="input-field" placeholder="4242 4242 4242 4242" /></div>
                  <div><label className="block text-sm text-brand-200 mb-1.5">Name on Card</label><input name="cardName" value={formData.cardName} onChange={handleChange} className="input-field" placeholder="John Doe" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm text-brand-200 mb-1.5">Expiry Date</label><input name="expiry" value={formData.expiry} onChange={handleChange} className="input-field" placeholder="MM/YY" /></div>
                    <div><label className="block text-sm text-brand-200 mb-1.5">CVV</label><input name="cvv" value={formData.cvv} onChange={handleChange} className="input-field" placeholder="123" /></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-200 mt-4">
                    <FiLock size={14} className="text-neon-green" /> Your payment information is encrypted and secure
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="font-outfit text-xl font-bold text-brand-900 flex items-center gap-2"><FiCheck className="text-neon-green" size={20} /> Review Your Order</h2>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-brand-200 uppercase">Shipping To</h3>
                    <div className="bg-surface-200 rounded-xl p-4 text-sm text-brand-700 space-y-1">
                      <p className="text-brand-900 font-medium">{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p><p>{formData.city}, {formData.state} {formData.zip}</p><p>{formData.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-brand-200 uppercase">Items ({items.length})</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-surface-200 rounded-xl p-3">
                        <div className="w-12 h-12 rounded-lg bg-surface-300 flex items-center justify-center text-xl flex-shrink-0">🌿</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-brand-900 truncate">{item.name}</p>
                          <p className="text-xs text-brand-200">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold text-neon-green">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-8 pt-6 border-t border-brand-100/40">
                {currentStep > 0 ? (
                  <button onClick={() => setCurrentStep(currentStep - 1)} className="btn-outline">Back</button>
                ) : (
                  <Link to="/shop" className="btn-outline">Continue Shopping</Link>
                )}
                {currentStep < 2 ? (
                  <button onClick={() => setCurrentStep(currentStep + 1)} className="btn-primary">Continue</button>
                ) : (
                  <button onClick={handlePlaceOrder} className="btn-primary flex items-center gap-2"><FiLock size={16} /> Place Order — ${total.toFixed(2)}</button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="glass-card p-6 sticky top-24">
              <h3 className="font-outfit font-bold text-lg mb-4 text-brand-900">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-brand-700 truncate mr-2">{item.name} × {item.quantity}</span>
                    <span className="text-brand-900 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-100/40 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-brand-200">Subtotal</span><span className="text-brand-900">${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-200">Shipping</span><span className="text-neon-green text-xs font-medium">FREE</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-200">Tax (8%)</span><span className="text-brand-900">${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-outfit font-bold text-lg border-t border-brand-100/40 pt-3 mt-3">
                  <span className="text-brand-900">Total</span><span className="gradient-text">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-brand-100/40">
                <div className="flex gap-2">
                  <input type="text" placeholder="Promo code" className="input-field text-sm py-2 flex-1" />
                  <button className="bg-neon-green/10 text-neon-green px-4 rounded-xl text-sm font-medium hover:bg-neon-green/20 transition-colors">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
