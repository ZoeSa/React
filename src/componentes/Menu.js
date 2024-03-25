import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import SearchBar from './SearchBar';
import ShoppingCartIcon from '../iconos/carrito-de-compras.svg'; // Importa el icono de carrito de compras desde la carpeta iconos
import HeartIcon from '../iconos/corazon.svg'; // Importa el icono de corazón desde la carpeta iconos
import UserIcon from '../iconos/usuario.svg'; // Importa el icono de usuario desde la carpeta iconos
import '../css/menu.css'

function Menu({ onSearch }) {
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
        <SearchBar onSearch={onSearch} /> {/* Pasando la función onSearch al SearchBar */}
      </div>
      <div className="icons">
        {/* Icono de carrito de compras */}
        <img src={ShoppingCartIcon} alt="Carrito de compras" className="icon" />
        {/* Icono de corazón */}
        <img src={HeartIcon} alt="Corazón" className="icon" />
        {/* Icono de usuario */}
        <img src={UserIcon} alt="Usuario" className="icon" />
      </div>
    </nav>
  );
}

export default Menu;
