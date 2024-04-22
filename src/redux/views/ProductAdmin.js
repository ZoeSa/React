import React, { useEffect, useState } from 'react';
import ProductRender from '../../context/ProductRender';
import EditPopup from '../../componentes/EditPopup'; // Importa el componente EditPopup
import { deleteProduct, editProduct } from '../actions';
import { useCart } from '../../context/CartContext';
import AddProduct from '../AddProduct';
import { selectAllProducts } from '../reduce/productReducer'; 
import { useDispatch, useSelector } from 'react-redux';
import useProductAction from '../../hook/useProductAction';

const ProductAdmin = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  
 
 // const loggedIn = true; 
  const { addToCart } = useCart();
  const handleAddProduct = AddProduct();
  const products = useSelector(selectAllProducts); // Obtén la lista de productos del estado de Redux
  const dispatch= useDispatch();
  
  const {getAllProducts, addNewProduct, loggedIn, error} = useProductAction(); 
 
  useEffect(() => {
   getAllProducts()
  }, [])

  const handleProductClick = (productId, navigate) => {
    console.log("soy product admin");
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

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleEditProduct = (productId) => {
    dispatch(editProduct(productId)); // Llama a la acción editProduct con el ID del producto
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)); // Llama a la acción deleteProduct con el ID del producto
  };

  return (
    <div>

      <h2>Productos</h2>

      <ProductRender
         products={products}
         loggedIn={loggedIn}
         addToCart={addToCart}
         handleProductClick={handleProductClick}
         openEditPopup={openEditPopup}
         handleDeleteProduct={handleDeleteProduct}
         handleEditProduct={handleEditProduct}
      />

      {loggedIn && (
        <button className="create-product-btn" onClick={handleAddProduct}>
          Crear Producto
        </button>
      )}

      {popupOpen && (
        <EditPopup
          product={popupData}
          handleClose={closePopup}
          handleSave={() => {}} // Aquí debes pasar la función handleSave si la tienes
          handleInputChange={() => {}} // Aquí debes pasar la función handleInputChange si la tienes
          isCreating={true} // Cambia esto a false si estás editando un producto
        />
      )}
    </div>
  );
};

export default ProductAdmin;
