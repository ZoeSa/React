import React from 'react';
import '../css/product.css';

const Product = ({ id, title, price, description, category, image, rating }) => {
  return (
    <div className="product">
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
