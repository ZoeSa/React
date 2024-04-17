import React, {useEffect, useState} from "react";
import Product from "./Product";
import {useProduct} from "../hook/useProduct";
import  useAuth  from "../hook/useAuth";
import AddProductModal from "./AddProductModal";
import Loader from "./Loader";
import ErrorComponent from "./Error404";
import useFilter from "../hook/useFilter";

function ProductAdmin(){
    const {filtro} = useFilter();
    const {products, isLoading, error, addProduct}=useProduct();
    const {useData} =useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAdmin =useData?.role ==="admin";


    const openModal =() => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
    };

    const filteredProducts = products.filter((product)=>
        product.title.toLoweCase().includes(filtro.toLoweCase())
    );

    const handleAddProduct =() => {
        openModal();
    };

    if (isLoading){
        return <Loader/>;
    };

    return(
        <>
            <ErrorComponent error={error}/>
            {isModalOpen && (
                <AddProductModal 
                    closeModal={closeModal}
                    addProduct={(newProduct)=> {
                        addProduct(newProduct);
                        closeModal();
                    }}
                />            
            )}

            <div>
                {filteredProducts.length 
                    ? filteredProducts.map((product)=>(
                        <Product 
                            key={`${product.id}-${product.updatedAt}`}
                            product ={product}
                            useData={useData}
                        />
                    ))
                    : !error && <p>No hay productos que coincidan con tu busqueda</p>
                }
            </div>

            {isAdmin &&(
                <div> <button onClick={handleAddProduct}>Crear nuevo product </button></div>
            )}
        </>
    )

}

export default ProductAdmin;