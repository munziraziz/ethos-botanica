import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.find(item => item.id === action.payload.id)) return state;
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const isInWishlist = (id) => state.items.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ ...state, isInWishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
