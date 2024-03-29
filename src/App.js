// App.js

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './componentes/Product';
import data from './data/data.json';
import Menu from './componentes/Menu';
import Cart from './componentes/Cart'; // Importa el componente Cart
import RegistrationForm from './componentes/RegistrationForm';


function App() {
  const [products] = useState(data);
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState('light'); // Estado para el tema

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
      if (existingCartItem) {
        setCartItems(cartItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Menu onSearch={() => {}} cartItems={cartItems} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={
            <div className="products">
              {products.map(product => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  image={product.image}
                  rating={product.rating}
                  addToCart={addToCart}
                />
              ))}
            <RegistrationForm /> {/* Formulario de registro en la página principal */}
            </div>
          } />
          <Route path="/carrito" element={
            <div className="cart-page">
              <Cart cartItems={cartItems} />
              <RegistrationForm /> {/* Formulario de registro en la página de carrito */}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
