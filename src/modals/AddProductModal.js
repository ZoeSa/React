import React, { useState } from "react";

const AddProductModal = ({ addProduct, closeModal }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    closeModal();
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div>
        <h2>Crear un nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </label>
          
           <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
            />
          </label> 
          <button type="submit">Añadir</button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
