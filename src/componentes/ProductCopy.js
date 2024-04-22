import React, { useState, useEffect } from 'react';
import useProducts from '../hook/useProduct';
import Product from './Product';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import EditPopup from "./EditPopup";

const Loader = () => {
  return <div className='spinner'>Cargando...</div>;
};

const ProductAdmin = () => {
  const {
    products,
    editedProduct,
    deletedProduct,
    handleEditProductDetails,
    handleSave,
    handleInputChange,
    createProduct,
    loading,
    error,
    setError
  } = useProducts();

  const [loggedIn, setLoggedIn] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // Estado para indicar si se está creando un nuevo producto

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail && userEmail.includes('@admin')) {
      setLoggedIn(true);
    }
  }, []);

  const handleProductClick = (productId, navigate) => {
    console.log("soy prodcut copy");
    if (loggedIn) {
      console.log(`Producto seleccionado: ${productId}`);
      navigate(`/producto/${productId}`);
    } else {
      console.log('Usuario no autenticado. Redirigiendo al usuario a la página de registro...');
      navigate('/registro');
    }
  };

  const openEditPopup = (product) => {
    setPopupData(product);
    setPopupOpen(true);
  };

  const openCreatePopup = () => {
    // Abre el popup para crear un nuevo producto
    setPopupData({ id: null, title: '', price: '', description: '' });
    setPopupOpen(true);
    setIsCreating(true); // Indica que se está creando un nuevo producto
  };

  const closePopup = () => {
    setPopupOpen(false);
    setIsCreating(false); // Resetea el estado de creación
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Productos</h2>
      {products.map(product => (
        loggedIn ? (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
            addToCart={() => addToCart(product.id)}
            handleEditProductDetails={() => openEditPopup(product)}
            deletedProduct={() => deletedProduct(product.id)}
          />
        ) : (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
            handleProductClick={() => handleProductClick(product.id, navigate)}
            addToCart={() => addToCart(product.id)}
          />
        )
      ))}
      {loggedIn && (
        <button className="create-product-btn" onClick={openCreatePopup}>Crear Producto</button>
      )}
      {popupOpen && (
        <EditPopup
          product={popupData}
          handleClose={closePopup}
          handleSave={handleSave}
          handleInputChange={handleInputChange}
          isCreating={isCreating} // Pasa el estado de creación al popup
        />
      )}
    </div>
  );
};



export default ProductAdmin;