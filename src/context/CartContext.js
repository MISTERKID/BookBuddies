import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCartItems(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (book) => {
    try {
      const existingItem = cartItems.find(item => item.id === book.id);
      let newCartItems;

      if (existingItem) {
        newCartItems = cartItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + book.quantity }
            : item
        );
      } else {
        newCartItems = [...cartItems, book];
      }

      await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
      setCartItems(newCartItems);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const newCartItems = cartItems.filter(item => item.id !== bookId);
      await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
      setCartItems(newCartItems);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 