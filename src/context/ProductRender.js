import React from 'react';
import Product from '../componentes/Product';
import '../css/product.css';
import { Link } from 'react-router-dom';

const ProductRender = ({ products, loggedIn, addToCart, handleProductClick, openEditPopup, handleDeleteProduct, handleEditProduct }) => {

  return (
    <div className="products">
      {products.map(product => (
        <div key={product.id}>
          
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
              image={product.image}
              rating={product.rating}
              addToCart={() => addToCart(product.id)}
              handleEditProductDetails={() => openEditPopup(product)}
              loggedIn={loggedIn}
              handleProductClick={handleProductClick}
            />
        
          {loggedIn && (
            <div>
              <button className="edit-product-btn" onClick={() => handleEditProduct(product.id)}>Editar Producto</button>
              <button className="delete-product-btn" onClick={() => handleDeleteProduct(product.id)}>Borrar Producto</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductRender;
