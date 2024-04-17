import React, {createContext,useState,useEffect} from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const ProductsContext = createContext();

export const ProductsProvider=({children}) => {
    const [products, setProducts] =useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError]= useState(null);

    useEffect(()=> {
        getProducts();
    }, []);

    const getProducts = async () => {
        try{
            setIsLoggedIn(true);
            const response = await axios.get(API_URL);
            setProducts(response.data);

        } catch (e){
            if(e.response && e.response.status ===404){
                setError("No hay ningun producto", e);
            }else{
                setError("Error al recuperar los productos:", e);
            }
        }finally{
            setTimeout(()=> {
                setIsLoggedIn(false);
            }, 2000);
        }
    };
    const getProductById = async (id)=>{
        setIsLoggedIn(true);


        try{
            const response =await axios.get(`${API_URL}/${id}`);
            const product =response.data;
            return product;
            
        }catch (e){
            if(e.response && e.response.status ===404){
              setError(`El producto con ID ${id} no existia`, e);
            }else{
                setError(
                `Error al obtener el producto con ${id}:`, e
                );
            }
        }finally{
            setIsLoggedIn(false);
        }
        
    };

    const updateProduct =async (id, editedProduct)=>{
        try{
            setIsLoggedIn(true);
            const response =await axios.put(`${API_URL}/${id}`, editedProduct);
            const updatedProduct={
                ...response.data,
                updatedAt: new Date().toISOString(),
            };
            setProducts((prevProducts)=>
                prevProducts.map((product)=>
                    product.id=== id? updatedProduct :product
                )
            );
        }catch(e){
            if(e.response && e.response.status ===404){
                setError(`El producto con ID ${id} ya no existia`, e);
              }else{
                  setError(
                  `Error al guardar el producto ${id}:`, e
                  );
              }
          }finally{
              setIsLoggedIn(false);
          }
    };

    const deleteProduct = async (id)=> {
        try{
            setIsLoggedIn(true);
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prevProducts)=>
                prevProducts.filter((product) => product.id !== id)
            );
        }catch (e){
            if(e.response && e.response.status ===404){
              setError(`El producto con ID ${id} ya no existia`, e);
            }else{
                setError(
                `Error al obtener el producto con ID ${id}:`, e
                );
            }
        }finally{
            setIsLoggedIn(false);
        }
    }
        
    
    const addProduct = async (newProduct) =>{
        try{
            setIsLoggedIn(true);
            const response =await axios.post(API_URL, newProduct);
            const addedProduct = response.data;
            setProducts((prevProducts) => [...prevProducts, addedProduct]);
        }catch(e) {
            setError("Error al crear el producto", e);
        }finally{
            setIsLoggedIn(false);
        }
    };

    return(
        <ProductsContext.Provider
            value={{
                products,
                isLoggedIn,
                error,
                getProducts,
                getProductById,
                updateProduct,
                deleteProduct,
                addProduct,
            }}>
                {children}
            </ProductsContext.Provider>

    )
}