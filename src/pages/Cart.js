import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext'; // asegúrate de tener este contexto
import axios from 'axios';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Obtener usuario logueado

  if (!cart) {
    return <p>Cargando carrito...</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    if (!user || !user._id) {
      alert("Debes iniciar sesión para confirmar la orden.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        userId: user._id,
        items: cart.map(item => ({
          productId: item.productId || item.id,
          quantity: item.quantity
        }))
      });

      alert('✅ Orden confirmada con éxito');
      clearCart();
    } catch (error) {
      console.error('❌ Error al confirmar la orden:', error);
      alert('Error al confirmar la orden');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.productId || item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.productId || item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart}>Vaciar carrito</button>
          {' '}
          <button onClick={handleConfirmOrder}>Confirmar orden</button>
        </>
      )}
    </div>
  );
}
