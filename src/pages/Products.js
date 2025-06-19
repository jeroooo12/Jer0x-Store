import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar productos desde el backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('❌ Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🖥️ Productos disponibles</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <img src={product.image} alt={product.name} width={80} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
