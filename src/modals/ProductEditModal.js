import React, { useState } from "react";
import axios from "axios"; // Asegúrate de importar axios si lo estás utilizando
import { API_URL } from "../constants"; // Asumo que tienes una constante para la URL de la API

const ProductEditModal = ({ handleEditProduct, closeModal, product }) => {
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
   
    // image: product.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/${editedProduct.id}`,
        editedProduct
      );
      const updatedProduct = response.data;
      handleEditProduct(updatedProduct);
      closeModal();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div>
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editedProduct.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              required
            />
          </label>
          {/* Asegúrate de incluir la entrada de imagen si es necesaria */}
          {/* <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={editedProduct.image}
              onChange={handleInputChange}
            />
          </label> */}
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
