import React, { useEffect } from 'react';
import useProducts from '../hook/useProduct';

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

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Editar producto</h2>
      <form onSubmit={handleSave}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="text"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
      
    </div>
    /* Esto tiene que ir en la página global dado que tiene que ser un botón general 
    <div>
    <button onClick={() => createProduct()}>Crear Producto</button>
  </div>*/
  );
};

export default ProductAdmin;
