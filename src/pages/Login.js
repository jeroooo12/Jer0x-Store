import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // ✅ Importa el contexto

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); // ✅ Usa el contexto

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const userData = response.data.user;
      console.log('🧪 Usuario recibido del backend:', userData);

      if (!userData || !userData._id) {
        alert("❌ Error: el usuario no tiene ID. Verifica la respuesta del backend.");
        return;
      }

      // ✅ Guarda usuario con el contexto y en localStorage automáticamente
      loginUser(userData);

      alert('✅ Sesión iniciada correctamente');
      navigate('/');
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Ocurrió un error';
      alert('❌ Error al iniciar sesión: ' + mensaje);
      console.error("❌ Error completo:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Ingresar</button>
      </form>
    </div>
  );
}
