// ProductAdmin.js
import React, { useState, useEffect } from 'react';
import useProducts from '../hook/useProduct';
import Product from './Product'; // Importa el componente Product normal
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import { useNavigate } from 'react-router-dom';

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

  const [loggedIn, setLoggedIn] = useState(false); // Estado para mantener el estado de inicio de sesión
  const { addToCart } = useCart(); // Obtener la función addToCart desde el contexto del carrito
  const navigate = useNavigate();
  const [targetProduct, setTargetProduct]= useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail && userEmail.includes('@admin')) {
      setLoggedIn(true);
      
    }
  }, []); // Verifica el estado de inicio de sesión al montar el componente

  const handleProductClick = (productId, navigate) => {
    if (loggedIn) {
      // Si el usuario ha iniciado sesión, maneja el clic del producto
      console.log(`Producto seleccionado: ${productId}`);
      // Aquí puedes implementar la lógica para abrir la página de detalles del producto
      navigate(`/producto/${productId}`);
    } else {
      // Si el usuario no ha iniciado sesión, redirige al usuario a la página de registro
      console.log('Usuario no autenticado. Redirigiendo al usuario a la página de registro...');
      setTargetProduct(`/producto/${productId}`);
      navigate('/registro');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Productos</h2>
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          image={product.image}
          handleProductClick={() => handleProductClick(product.id, navigate)}
          addToCart={() => addToCart(product.id)} // Llama a la función addToCart desde el contexto del carrito
        />
      ))}
      {loggedIn && ( // Si el usuario ha iniciado sesión como administrador, muestra los botones adicionales
      <div>
        {products.map(product => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
            addToCart={() => addToCart(product.id)} // Llama a la función addToCart desde el contexto del carrito
            editedProduct={() => editedProduct()}
            deletedProduct={() => deletedProduct()}
          />
        ))}
        <div>
          createProduct{()=> createProduct()}
        </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
