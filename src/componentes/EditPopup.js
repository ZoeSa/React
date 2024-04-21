import React from 'react';
import AddProduct from '../redux/AddProduct';

const EditPopup = ({ product, handleClose, handleSave, isCreating, handleInputChange }) => {



  const handleAddProduct = AddProduct();


 

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{isCreating ? 'Crear Nuevo Producto' : 'Editar Producto'}</h2>
        <form onSubmit={handleSave}>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" defaultValue={product ? product.title : ''} onChange={handleInputChange} />
          <label htmlFor="price">Precio:</label>
          <input type="text" id="price" name="price" defaultValue={product ? product.price : ''} onChange={handleInputChange}/>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" defaultValue={product ? product.description : '' } onChange={handleInputChange}/>
          <div className="buttons">
            {isCreating ? (
              <button type="button" onClick={handleAddProduct}>Crear</button>
            ) : (
              <button type="submit">Guardar</button>
            )}
            <button type="button" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
