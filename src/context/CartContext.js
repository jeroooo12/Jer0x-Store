import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
        setCart(response.data.cart || []);
        console.log('✅ Carrito cargado:', response.data.cart);
      } catch (error) {
        console.error('❌ Error al cargar el carrito:', error);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user?._id) {
      alert('❌ Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/cart/${user._id}/add`, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });

      setCart(response.data.cart);
      alert('✅ Producto agregado al carrito');
    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user?._id) return;

    try {
      await axios.delete(`http://localhost:5000/api/cart/${user._id}/${productId}`);
      setCart(prevCart => prevCart.filter(item => item.productId !== productId));
      console.log('🗑️ Producto eliminado del carrito');
    } catch (error) {
      console.error('❌ Error al eliminar del carrito:', error);
    }
  };

  // ✅ NUEVO: Función para vaciar todo el carrito
  const clearCart = async () => {
    if (!user?._id) return;

    try {
      await axios.delete(`http://localhost:5000/api/cart/${user._id}/clear`);
      setCart([]);
      console.log('🧹 Carrito vaciado');
    } catch (error) {
      console.error('❌ Error al vaciar el carrito:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
