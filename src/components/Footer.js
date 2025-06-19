import React from 'react';
import { FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const iconBaseStyle = {
    color: '#fff',
    margin: '0 1rem',
    fontSize: '1.8rem',
    transition: 'transform 0.3s ease, color 0.3s ease',
  };

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  };

  return (
    <footer style={{ background: '#000', color: '#fff', padding: '2rem', textAlign: 'center' }}>
      <p>© 2025 Jer0x Store. Todos los derechos reservados.</p>
      <p>ventas@jer0xstore.com | Tel: 3204705000</p>

      <div style={iconContainerStyle}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconBaseStyle}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.3)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaInstagram />
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconBaseStyle}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.3)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
