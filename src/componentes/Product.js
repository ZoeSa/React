import React from 'react';

const Product = ({ id, title, price, description, category, image, rating }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};

export default Product;
