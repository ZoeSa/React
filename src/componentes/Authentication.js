// Authentication.js
import React, { useState } from 'react';
import useAuthentication from '../hook/useAuthentication'; // Importamos nuestro hook personalizado

const Authentication = ({ onRegister, targetProduct }) => {
  const { handleRegistration, passwordError } = useAuthentication({ onRegister, targetProduct });


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(username, email, password, confirmPassword, targetProduct);
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
          placeholder="Correo electrónico"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordError && <p>{passwordError}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Authentication;
