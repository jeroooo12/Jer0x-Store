import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/apis';
import FooterAnimation from "../components/FooterAnimation";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      {/* Banner de bienvenida */}
      <section style={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem' }}>¡Bienvenido a Jer0x Store!</h1>
        <p style={{ fontSize: '1.2rem' }}>Las mejores ofertas en tecnología y gaming</p>
      </section>

      {/* Lista de productos */}
      <section style={{ padding: '2rem' }}>
        <ProductList products={products} />
      </section>

      {/* Animación del muñequito en el pie de página */}
      <FooterAnimation />
    </div>
  );
}
