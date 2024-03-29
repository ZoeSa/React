// Discount.js
import React from 'react';

const Discount = ({ username }) => {
  return (
    <div className='discount'>
      <div className='discount-banner'>
        <h2>{username ? `${username}, ¡aprovecha nuestro 20% de descuento!` : '¡20% de descuento para nuevos clientes!'}</h2>
      </div> 
    </div>
  );
};

export default Discount;
