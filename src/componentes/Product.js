import React from 'react';
import '../css/product.css';

const Product = ({ id, title, price, description, image, addToCart }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p className='description'>{description}</p>
      <div className="price-container">
        <p className="price">${price}</p>
      </div>
      <button onClick={() => addToCart(id)}>Añadir al carrito</button>
    </div>
  );
};

export default Product;
