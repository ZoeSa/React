import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductEditModal from '../context/ProductRender';
import { useProducts } from "../hook/useProducts";
import AddToCartButton from "../buttons/AddToCartButton"

const Product = ({ product, userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteProduct } = useProducts();
  const { id, title, price, description, image } = product;
  const [isLoggedIn] = useState(false); // Utilizamos un hook de estado para isLoggedIn
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductClick = (productId) => {
    if (isLoggedIn) {
      navigate(`/producto/${productId}`);
    } else {
      // Redireccionar al registro y almacenar el producto objetivo
      navigate('/registro',  { state: { targetProduct: `/producto/${productId}` } });
    }
  };

  return (
    <div className="product" key={id}>
      {userData?.role === "admin" && (
        <div>
          
          <button alt="Edit" onClick={openModal}>Editar</button>
          <button alt="Delete" onClick={() => deleteProduct(id)}>Borrar</button>
        </div>
      )}

      {/* Llama a handleProductClick al hacer clic en el producto */}
      <div onClick={() => handleProductClick(id)}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p className='description'>{description}</p>
        <div className="price-container">
          <p className="price">{`$${price}`}</p>
        </div>
      </div>
      
      {userData && <AddToCartButton item={product} closeModal={closeModal} />}
      {isModalOpen && (
        <ProductEditModal product={product} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Product;
