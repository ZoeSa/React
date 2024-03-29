// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ onRegister }) =>  {
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
    // Guardar datos en localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    // Limpiar campos del formulario
    setUsername('');
    setPassword('');
     // Llamar a la función onRegister con el nombre de usuario
     onRegister(username);
  };

  return (
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
  );
};

export default RegistrationForm;
