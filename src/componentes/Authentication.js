import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Authentication = ({ targetProduct }) => {
  const { isLoggedIn, login, logout} = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      // Registro de usuario
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      setUsername('');
      setPassword('');
      setIsRegisterMode(false);
      if (targetProduct) {
        navigate(targetProduct);
      } else {
        navigate('/carrito');
      }
    } else {
      // Inicio de sesión
      login();
      navigate('/');
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div>
      <h1>{isRegisterMode ? 'Registro' : 'Inicio de sesión'}</h1>
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
        <button type="submit">{isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>
      <button onClick={toggleMode}>
        {isRegisterMode ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
      </button>
      {isLoggedIn && (
        <button onClick={logout}>Cerrar Sesión</button>
      )}
    </div>
  );
};

export default Authentication;
