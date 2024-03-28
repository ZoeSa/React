import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './componentes/Product';
import data from './data/data.json';
import Menu from './componentes/Menu';
import Cart from './componentes/Cart'; // Importa el componente Cart
import './App.css';

function App() {
  const [products] = useState(data);
  const [cartItems, setCartItems] = useState([]);

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
      <div className="App">
        <Menu onSearch={() => {}} cartItems={cartItems} />
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
            </div>
          } />
          <Route path="/carrito" element={<Cart cartItems={cartItems} />} /> {/* Agregar la ruta para el carrito */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
