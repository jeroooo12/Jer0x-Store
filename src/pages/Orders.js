import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.error('❌ Error al cargar las órdenes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) return <p style={{ padding: '2rem' }}>Cargando órdenes...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 Historial de Órdenes</h2>
      {orders.length === 0 ? (
        <p>No tienes órdenes registradas.</p>
      ) : (
        <ul>
          {orders.map((order, i) => (
            <li
              key={order._id}
              style={{
                marginBottom: '1.5rem',
                borderBottom: '1px solid #ccc',
                paddingBottom: '1rem',
              }}
            >
              <strong>🆔 Orden #{i + 1}</strong><br />
              📅 Fecha: {formatDate(order.createdAt)}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productId?.name || 'Producto eliminado'} - Cantidad: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
