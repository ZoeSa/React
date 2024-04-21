import {useDispatch,  useSelector} from "react-redux";
import { selectAllProducts } from '../redux/reduce/productReducer';
import { useState } from "react";
import {
    editProduct,
    deleteProduct,
    addProduct,
    getProducts,
} from "../redux/actions";

const useProductAction = () => {
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
  

    const editProductById= async (product)=> {
        try {
            setLoggedIn(true);
            await dispatch(editProduct(product));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoggedIn(false);
        }
    };
    const deleteProductById= async (productId)=> {
        try {
            setLoggedIn(true);
            await dispatch(deleteProduct(productId));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoggedIn(false);
        }
    };
    const getAllProducts = async() =>{
        try {
            setLoggedIn(true);
            await dispatch(getProducts());
        } catch (error) {
            setError(error.message);
        } finally {
            setLoggedIn(false);
        }
    }
    const addNewProduct= async (newProduct)=> {
        try{
            setLoggedIn(true);
            await dispatch(addProduct(newProduct));

        }catch(error){
            setError(error.message);
        }finally{
            setLoggedIn(false);
        }
    };

    return{
        loggedIn,
        error,
        addNewProduct,
        getAllProducts,
        editProductById,
        deleteProductById
    };
};

export default useProductAction;