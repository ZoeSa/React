import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Authentication = ({onRegister, targetProduct }) => {
  const { isLoggedIn, logout} = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
      // Registro de usuario
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      if (onRegister){
        onRegister(username);
      }
      setUsername('');
      setPassword('');
     
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
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Registrarse</button>
      </form>
     
      {isLoggedIn && (
        <button onClick={logout}>Cerrar Sesión</button>
      )}
    </div>
  );
};

export default Authentication;