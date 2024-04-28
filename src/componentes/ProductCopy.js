import React, { useState, useEffect } from 'react';
import useProducts from '../hook/useProduct';
import Product from './Product';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  return <div className='spinner'>Cargando...</div>;
};

const ProductAdmin = ({setTargetProduct, isLoggedIn}) => {
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

  const handleProductClick = (productId, navigate, setTargetProduct) => {
    setTargetProduct(productId);
    console.log(isLoggedIn)
    if (isLoggedIn||loggedIn) {
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
            handleProductClick={() => handleProductClick(product.id, navigate, setTargetProduct)} // Cambia el nombre del parámetro
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

const EditPopup = ({ product, handleClose, handleSave, isCreating, handleInputChange, handleEditProduct }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreating) {
      handleEditProduct(product); // Llama a createProduct si se está creando, de lo contrario, llama a handleEditProductDetails
    } else {
      handleSave();
    }
    handleClose();
  };
  

  
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{isCreating ? 'Crear Nuevo Producto' : 'Editar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" defaultValue={product ? product.title : ''} onChange={handleInputChange} />
          <label htmlFor="price">Precio:</label>
          <input type="text" id="price" name="price" defaultValue={product ? product.price : ''} onChange={handleInputChange}/>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" defaultValue={product ? product.description : '' } onChange={handleInputChange}/>
          <div className="buttons">
            <button type="submit">{isCreating ? 'Crear' : 'Guardar'}</button>
            <button type="button" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdmin;
