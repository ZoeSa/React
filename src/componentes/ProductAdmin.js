import React, { useState } from "react";
import Product from "./Product";
import { useProducts } from "../hook/useProducts";
import { useAuth } from "../hook/useAuth";
import AddProductModal from "../modals/AddProductModal";
import Loader from "./Loader";
import ErrorComponent from "./Error404";
import useFilter from "../hook/useFilter";
import { useNavigate } from "react-router";

function ProductAdmin() {
  const { filtro } = useFilter();
  const { products, isLoading, error, addProduct } = useProducts();
  const { userData } = useAuth(); // Corrección: Cambiar `useData` a `userData`
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = userData?.role === "admin"; // Corrección: Cambiar `useData` a `userData`
  const [isLoggedIn] = useState(false); // Utilizamos un hook de estado para isLoggedIn
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAddProduct = () => {
    openModal();
  };


  const handleProductClick = (productId) => {
    if (isLoggedIn) {
      navigate(`/producto/${productId}`);
    } else {
      // Redireccionar al registro y almacenar el producto objetivo
      navigate('/registro',  { state: { targetProduct: `/producto/${productId}` } });
    }
  };


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ErrorComponent error={error} />
      {isModalOpen && (
        <AddProductModal
          closeModal={closeModal}
          addProduct={(newProduct) => {
            addProduct(newProduct);
            closeModal();
          }}
        />
      )}

      <div>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <Product
              key={`${product.id}-${product.updatedAt}`}
              product={product}
              userData={userData} // Corrección: Cambiar `useData` a `userData`
              handleProductClick={handleProductClick}
            />
          ))
        ) : !error && <p>No hay productos que coincidan con tu búsqueda</p>}
      </div>

      {isAdmin && (
        <div>
          {" "}
          <button onClick={handleAddProduct}>Crear nuevo producto </button>
        </div>
      )}
    </>
  );
}

export default ProductAdmin;
