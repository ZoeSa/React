import React, { createContext, useContext, useState } from 'react';


const data = "http://localhost:3000/products";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [products]= useState(data);


    const addToCart = (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
            if (existingCartItem) {
                setCartItems(cartItems.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                ));
            } else {
                setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
            }
        }

    };

    // Otros métodos del carrito, como eliminar del carrito, etc.

    return (
        <CartContext.Provider value={{ cartItems, addToCart, products }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
