// Menu.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ShoppingCartIcon from '../iconos/carrito-de-compras.svg';
import HeartIcon from '../iconos/corazon.svg';
import UserIcon from '../iconos/usuario.svg';
import '../css/menu.css';

function Menu({ onSearch, cartItems, toggleTheme }) {
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        <div className="icon-link" onClick={() => setShowCart(!showCart)}>
          <Link to="/carrito">
            <img src={ShoppingCartIcon} alt="Carrito de compras" className="icon" />
          </Link>
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
