import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../ui/Modal';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function AuthModal() {
  const { showAuthModal, authMode, closeAuth, openLogin, openRegister, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: formData.name || 'User', email: formData.email });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      isOpen={showAuthModal}
      onClose={closeAuth}
      title={authMode === 'login' ? 'Welcome Back' : 'Create Account'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {authMode === 'register' && (
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200/50" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field pl-11"
              required
            />
          </div>
        )}

        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200/50" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input-field pl-11"
            required
          />
        </div>

        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200/50" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field pl-11 pr-11"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-200/50 hover:text-neon-green transition-colors"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {authMode === 'login' && (
          <div className="text-right">
            <button type="button" className="text-sm text-neon-green hover:underline transition-colors">
              Forgot Password?
            </button>
          </div>
        )}

        <button type="submit" className="btn-primary w-full">
          {authMode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-100/40"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-brand-200">or continue with</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-brand-100/40 rounded-xl py-3
                     hover:bg-surface-200 transition-all duration-300"
        >
          <FcGoogle size={20} />
          <span className="text-brand-700">Google</span>
        </button>

        <p className="text-center text-brand-200 text-sm mt-4">
          {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={authMode === 'login' ? openRegister : openLogin}
            className="text-neon-green hover:underline font-medium"
          >
            {authMode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </Modal>
  );
}
