import React from 'react';

const AddToCartButton = ({ item }) => {
  const handleAddToCart = () => {
    // Aquí puedes implementar la lógica para añadir el producto al carrito
    console.log(`Añadir ${item.title} al carrito`);
  };

  return (
    <button onClick={handleAddToCart}>
      Añadir al carrito
    </button>
  );
};

export default AddToCartButton;
