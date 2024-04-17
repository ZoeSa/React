// context/Product.js
import React, { useState } from 'react';
import ProductEditModal from '../context/ProductRender';
import { Link } from 'react-router-dom';
import {useProducts} from "../hook/useProducts";
import AddToCartButton from "../buttons/AddToCartButton"

const Product = ({ product, userData }) => {
  const[isModalOpen, setIsModalOpen]= useState(false);
  const{deleteProduct} =useProducts();
  const {id, title, price, description, image} = product;

  const openModal =()=>{
    setIsModalOpen(true);
  };

  const closeModal =()=>{
    setIsModalOpen(false);
  };

  return (
    <div className="product" key={id}>
      {userData?.role === "admin" &&(
        <div>
          <button alt="Edit" onClick={openModal}>Editar</button>
          <button alt="Delete" onClick={() => deleteProduct(id)}>Borrar</button>

        </div>
      )}
      <Link>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p className='description'>{description}</p>
        <div className="price-container">
          <p className="price">{`$${price}`}</p>
        </div>
      </Link>  
      {userData && <AddToCartButton item={product}/>}
      {isModalOpen && (
        <ProductEditModal product={product} closeModal={closeModal}/>
      )}
    </div>
  );
};

export default Product;
