import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  const login = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider value={{
      user, showAuthModal, authMode,
      login, logout, openLogin, openRegister, closeAuth,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
