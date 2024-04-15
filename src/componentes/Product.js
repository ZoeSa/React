// context/Product.js
import React from 'react';

const Product = ({ id, title, price, description, image, handleProductClick, deletedProduct, handleEditProductDetails }) => {
  return (
    <div className="product" onClick={handleProductClick}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p className='description'>{description}</p>
      <div className="price-container">
        <p className="price">${price}</p>
      </div>
      {/* Condicional para mostrar los botones solo cuando estés logueado como administrador */}
      {handleEditProductDetails && deletedProduct && (
        <div>
          <button onClick={() => handleEditProductDetails(id, title, price, description)}>Editar</button>
          <button onClick={deletedProduct}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default Product;
