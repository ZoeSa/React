import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthorContext";
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from "./context/ProductsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);