import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // ✅ Obtenemos el usuario desde el contexto

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUser(null);
    navigate('/login'); // Redirige al login
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#222',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🎮 Jer0x Store</div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            margin: '0 1rem',
            color: isActive ? '#00f7ff' : '#fff',
            textDecoration: isActive ? 'underline' : 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          🏠 Inicio
        </NavLink>

        <NavLink 
          to="/categorias"
          style={({ isActive }) => ({
            margin: '0 1rem',
            color: isActive ? '#00f7ff' : '#fff',
            textDecoration: isActive ? 'underline' : 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          🗂️ Categorías
        </NavLink>

        <NavLink 
          to="/carrito"
          style={({ isActive }) => ({
            margin: '0 1rem',
            color: isActive ? '#00f7ff' : '#fff',
            textDecoration: isActive ? 'underline' : 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          🛒 Carrito
        </NavLink>

        {user && (
          <NavLink 
            to="/ordenes"
            style={({ isActive }) => ({
              margin: '0 1rem',
              color: isActive ? '#00f7ff' : '#fff',
              textDecoration: isActive ? 'underline' : 'none',
              fontWeight: isActive ? 'bold' : 'normal'
            })}
          >
            🧾 Mis Órdenes
          </NavLink>
        )}

        {!user ? (
          <>
            <Link to="/register" style={{ margin: '0 1rem', color: '#fff' }}>📝 Registro</Link>
            <Link to="/login" style={{ margin: '0 1rem', color: '#fff' }}>🔐 Login</Link>
          </>
        ) : (
          <>
            <span style={{ margin: '0 1rem' }}>👤 {user.username}</span>
            <button onClick={cerrarSesion} style={{
              marginLeft: '1rem',
              backgroundColor: '#444',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              borderRadius: '5px'
            }}>
              🔓 Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
