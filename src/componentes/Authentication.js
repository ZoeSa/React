import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Authentication = ({ onRegister, targetProduct }) => {
  const { isLoggedIn, logout} = useAuth();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que se ingresen todos los campos
    if (!username || !email || !password) {
      alert('Por favor ingrese todos los campos.');
      return;
    }

    // Registro de usuario
    const newUser = {
      username: username,
      email: email,
      password: password,
      rol: email === 'admin@admin.com' ? 'admin' : 'user' // Establecer el rol según el correo electrónico
    };

    // Obtener los usuarios existentes
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Agregar el nuevo usuario
    users.push(newUser);


    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('email', JSON.stringify(email));

    if (onRegister){
        console.log("3", location.state.productId);
      onRegister(username);
    }
    setUsername('');
    setEmail('');
    setPassword('');

    if (location.state && location.state.productId) {
        console.log("1", location.state.productId);
      navigate(`/producto/${location.state.productId}`);
    } else {
        console.log("2", location.state.productId);
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
        <button type="submit">Registrarse</button>
      </form>
     
      {isLoggedIn && (
        <button onClick={logout}>Cerrar Sesión</button>
      )}
    </div>
  );
};

export default Authentication;
