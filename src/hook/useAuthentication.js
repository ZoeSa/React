// useAuthentication.js
import { useState } from 'react';
import { useNavigate } from 'react-router';

const useAuthentication = ({ onRegister, targetProduct }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = (username, email, password, confirmPassword, targetProduct)=> {
    // Validar que se ingresen todos los campos
    if (!username || !email || !password || !confirmPassword) {
      alert('Por favor ingrese todos los campos.');
      return;
    }

    // Validar longitud de la contraseña
    if (password.length < 4) {
      setPasswordError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // Validar coincidencia de contraseñas
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
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

    setIsLoggedIn(true);

    if (onRegister) {
      onRegister(username);
    }
    
    if (targetProduct) {
      navigate(`/producto/${targetProduct}`);
    } else {
      navigate('/carrito');
    }
  };

  return { isLoggedIn, handleRegistration, passwordError };
};

export default useAuthentication;
