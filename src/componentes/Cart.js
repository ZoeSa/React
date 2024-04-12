import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item
 }) => {
  return (
    <li>
      <img src={item.image} alt={item.title} />
      <div>
        <p>{item.title}</p>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio: ${item.price}</p>
        <p>Total: ${item.quantity * item.price}</p>
      </div>
    </li>
  );
};

const Cart = () => {
  const { cartItems } = useCart();
  // Verificar si cartItems está definido y no es nulo
  if (!cartItems || cartItems.length === 0) {
    return <div>El carrito está vacío</div>;
  }

  // Calcular el total de la compra
  const totalPurchase = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);


  return (
    <div className="cart">
      <h2>Carrito</h2>
      <ul>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p>Total de la compra: ${totalPurchase}</p>
    </div>
  );
};

export default Cart;
