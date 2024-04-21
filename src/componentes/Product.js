// context/Product.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ id, title, price, description, image, handleProductClick, deletedProduct, handleEditProductDetails }) => {
  const navigate= useNavigate();
  return (

    
    <div className="product" onClick={handleProductClick(id, navigate)}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p className='description'>{description}</p>
      <div className="price-container">
        <p className="price">${price}</p>
      </div>
      
    </div>
   
  );
};

export default Product;
