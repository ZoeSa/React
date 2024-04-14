//productRender.js
import React from 'react';
import Product from '../componentes/ProductAdmin';
import '../css/product.css';
import { useNavigate } from 'react-router-dom';

const ProductRender = ({ products, addToCart, handleProductClick}) => {
    const navigate = useNavigate();
    return (
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
          handleProductClick={() => handleProductClick(product.id, navigate)
                
            }
        />
      ))}
    </div>
  );
};

export default ProductRender;