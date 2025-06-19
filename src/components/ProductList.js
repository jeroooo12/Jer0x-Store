import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🖥️ Productos Destacados</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map(product => (
          <div key={product._id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '1rem',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <img
              src={product.image || 'https://via.placeholder.com/200'}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h3 style={{ margin: '1rem 0 0.5rem' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#00b894' }}>💲{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: '#0984e3',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
