import { useEffect, useState } from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";


const API_URL = "http://localhost:3000/products"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState({
        id: null,
        title: "",
        price: "",
        description: "",
    });

    useEffect(()=> {
        getProducts();
    }, []);

    const getProducts = async () =>{
        try{
            const response = await axios.get(API_URL);
            console.log(response);
            setProducts(response.data);
        }catch(error){
            console.error("Error fetching products",  error);
        }
    }

    const deletedProduct = async (id) => {
        try{
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prevProducts) => 
                prevProducts.filter((product)=> product.id !== id )
            );
            alert(`Se ha eliminado un producto `);
        }catch (error){
            console.error("Error deleting product:", error);
        }
    };
    
    const handleSave =() => {
        console.log(editedProduct);
        if(editedProduct.id !== null){
          editProduct();
        } else {
           createProduct();
        }
    };

    const createProduct = async() =>{
        try{
            console.log(editedProduct)
            const newId =uuidv4();
            const newProduct ={...editedProduct, id:newId};
            const response = await axios.post(API_URL, newProduct);
            setProducts ((prevProducts) => [...prevProducts, response.data]);
            setEditedProduct({id: null, title:"", price:"", description:""});
        } catch(error){
            console.error("Error adding product", error);
        }
    };

    const editProduct = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/${editedProduct.id}`,
                editedProduct
            );
            const updatedProduct = response.data;
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            setEditedProduct({
                ...editedProduct
            });
        } catch (error) {
            console.error("Error editing product:", error);
        }
    };
    


    // Función para manejar cambios en los campos de entrada
   // Función para manejar cambios en los campos de entrada
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value
    }));
};


    const handleEditProductDetails =(id, title, price, description) => {
        const selectedProduct =products.find((product) => product.id === id)
        console.log(selectedProduct);
        setEditedProduct({...selectedProduct, title, price, description});
    };

    return {
        products,
        editedProduct,
        deletedProduct,
        handleEditProductDetails,
        handleSave,
        handleInputChange,
        createProduct
    };
};

export default useProducts;
