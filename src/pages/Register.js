import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      const mensaje = error.response?.data?.error || error.message;
      alert('❌ Error al registrar: ' + mensaje);
      console.error('Respuesta del servidor:', error.response?.data);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
