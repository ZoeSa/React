//productRender.js
import React from 'react';
import Product from '../componentes/ProductAdmin';
import '../css/product.css';

const ProductRender = ({ products, handleProductClick}) => {
    console.log(products)
    return (
    <div className="products">
      {products.map(product => (
        
        <Product
          key={product.id}
          product={product}
          handleProductClick={handleProductClick}
        />
      ))}
    </div>
  );
};

export default ProductRender;