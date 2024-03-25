import React, { useState } from 'react';
import Product from './componentes/Product';
import data from './data/data.json'; // Importa tus datos de productos
import Menu from './componentes/Menu';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter de react-router-dom
import './App.css'

function App() {
  const [products, setProducts] = useState(data); // Inicializa el estado de los productos con los datos

  // Función para filtrar los productos por nombre
  const filterProducts = (searchTerm) => {
    const filteredProducts = data.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <Router> {/* Envuelve tu aplicación con el componente Router */}
      <div className="App">
        <Menu onSearch={filterProducts} /> {/* Pasando la función filterProducts al Menu */}
        <div className='discount'>
          <div className='discount-banner'>
            <h2>¡20% de descuento para nuevos clientes!</h2>
          </div> 
        </div>
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
            />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
