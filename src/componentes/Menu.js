import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import SearchBar from './SearchBar';

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
        {/* Aquí puedes colocar tus iconos si lo deseas */}
      </div>
    </nav>
  );
}

export default Menu;
