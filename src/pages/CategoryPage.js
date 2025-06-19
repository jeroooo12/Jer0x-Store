import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import productsByCategory from '../data/productsByCategory';
import axios from 'axios';

export default function CategoryPage() {
  const { nombre } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/categoria/${nombre}`);
        if (res.data && res.data.length > 0) {
          setFilteredProducts(res.data);
        } else {
          // Si no hay datos del backend, usar los locales
          setFilteredProducts(productsByCategory[nombre] || []);
        }
      } catch (error) {
        console.error('❌ Error al cargar productos desde el backend:', error);
        // Si hay error, usar los productos locales
        setFilteredProducts(productsByCategory[nombre] || []);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [nombre]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>🧩 {nombre}</h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando productos...</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}
