import { useDispatch } from "react-redux";
import { editProduct, deleteProduct, addProduct, getProducts } from "../redux/actions";

const useProductAction = () => {
    const dispatch = useDispatch();

    const editProductById= async (product)=> {
        try {
            await dispatch(editProduct(product));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProductById= async (productId)=> {
        try {
            await dispatch(deleteProduct(productId));
        } catch (error) {
            console.error(error);
        }
    };

    const getAllProducts = async() =>{
        try {
            await dispatch(getProducts());
        } catch (error) {
            console.error(error);
        }
    }

    const addNewProduct= async (newProduct)=> {
        try{
            await dispatch(addProduct(newProduct));
        }catch(error){
            console.error(error);
        }
    };

    return {
        addNewProduct,
        getAllProducts,
        editProductById,
        deleteProductById
    };
};

export default useProductAction;
