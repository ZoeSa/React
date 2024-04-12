// Menu.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'; // Importa el icono que necesitas
import SearchBar from './SearchBar';
import ShoppingCartIcon from '../iconos/carrito-de-compras.svg';
import HeartIcon from '../iconos/corazon.svg';
import UserIcon from '../iconos/usuario.svg';
import '../css/menu.css';
import { useCart } from '../context/CartContext';

function Menu({ onSearch, toggleTheme, isLoggedIn }) {
  const {cartItems}=useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  // Manejador de clic del icono del carrito
  const handleCartClick = () => {
    if (isLoggedIn) {
      // Si el usuario está registrado, dirigir al carrito
     navigate ("/carrito") ;
    } else {
      // Si el usuario no está registrado, dirigir a la página de registro
      navigate ("/registro") ;
    }
  };

  return (
    <nav className="menu">
      <Link to="/" className="logo">MiTienda</Link>
      <ul className="menu-items">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/ofertas">Ofertas</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
      <div className="search-bar">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="icons">
        {/* Enlace al carrito */}
        <div className="icon-link" onClick={handleCartClick}>
          <img src={ShoppingCartIcon} alt="Carrito de compras" className="icon" />
          <span className="badge">{totalItems}</span>
        </div>
        <img src={HeartIcon} alt="Corazón" className="icon" />
        <img src={UserIcon} alt="Usuario" className="icon" />
        <FontAwesomeIcon icon={faMoon} onClick={toggleTheme} className='dark-icon'/>
      </div>
    </nav>
  );
}

export default Menu;
