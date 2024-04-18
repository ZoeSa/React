import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Authentication = ({ onRegister }) => {
  const { isLoggedIn, handleLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await handleLoading({ name: username, email, password });
    if (onRegister) {
      onRegister(username);
    }
    setUsername('');
    setEmail('');
    setPassword('');
     
    const targetProduct = location.state && location.state.targetProduct;
    if (targetProduct) {
      navigate(targetProduct);
    } else {
      navigate('/carrito');
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Registrarse</button>
      </form>
     
      {isLoggedIn && (
        <button onClick={() => navigate('/carrito')}>Ir al Carrito</button>
      )}
    </div>
  );
};

export default Authentication;
