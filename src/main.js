import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthorContext";
import { CartProvider } from './context/CartContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      
        <CartProvider>
          <App />
        </CartProvider>
      
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);