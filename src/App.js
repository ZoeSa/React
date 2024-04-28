import React, { useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import data from './data/data.json';
import Menu from './componentes/Menu';
import Cart from './componentes/Cart';
import Authentication from './componentes/Authentication';
import Discount from './componentes/Discount';
import ProductDetail from './componentes/ProductDetails';
import Product from './componentes/ProductCopy'
import { AuthProvider } from './context/AuthorContext';
import Error404 from './componentes/Error404';
import { CartProvider } from './context/CartContext';
import "./App.css";

function App() {
  const [products] = useState(data);
  const [cartItems] = useState([]);
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [targetProduct, setTargetProduct] = useState(null);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleUserRegistration = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
    if (targetProduct) {
      return <Navigate to={targetProduct} />;
    } else {
      return <Navigate to="/carrito" />;
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <div className={`App ${theme}`}>
            <Menu onSearch={() => { }} cartItems={cartItems} toggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
            <Discount username={username} />
            <Routes>
              <Route path="/" element={<Product setTargetProduct={setTargetProduct} isLoggedIn={isLoggedIn}/>} />
              <Route path="/carrito" element={<Cart cartItems={cartItems} />} />
              <Route path="/producto/:productId" element={<ProductDetail products={products}   />} />
              <Route path="/registro" element={<Authentication onRegister={handleUserRegistration} targetProduct={targetProduct} />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;