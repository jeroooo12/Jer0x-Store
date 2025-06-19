import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Equipos',
    image: 'https://firebasestorage.googleapis.com/v0/b/tiendagamer-dcc1a.firebasestorage.app/o/torres.webp?alt=media&token=75ce2ccf-efcf-443a-a501-2f40ec89a8c3',
  },
  {
    title: 'Periféricos', 
    image: 'https://firebasestorage.googleapis.com/v0/b/tiendagamer-dcc1a.firebasestorage.app/o/perifericos.webp?alt=media&token=23a9e890-13cb-42b4-b920-0d2123dcbd0b',
  },
  {
    title: 'Monitores',
    image: 'https://firebasestorage.googleapis.com/v0/b/tiendagamer-dcc1a.firebasestorage.app/o/monitores.jpg?alt=media&token=c64bdfb1-8c78-48f0-bc41-0cc7e4f6f5e4',
  },
  {
    title: 'Refrigeración',
    image: 'https://firebasestorage.googleapis.com/v0/b/tiendagamer-dcc1a.firebasestorage.app/o/refirg.jpg?alt=media&token=5fc929d3-a070-49fe-b9f2-d56fd3c4f007',
  },
];

export default function CategoryBanner() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '2rem',
      backgroundColor: '#f4f4f4',
    }}>
      {categories.map((cat, i) => (
        <Link
          to={`/categoria/${cat.title}`}
          key={i}
          style={{
            position: 'relative',
            height: '180px',
            backgroundImage: `url(${cat.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            textAlign: 'center',
            padding: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            {cat.title}
          </div>
        </Link>
      ))}
    </section>
  );
}
