import axios from "axios";
/*import{
    PRODUCTS_ADD_PRODUCT,
    PRODUCTS_EDIT_PRODUCT,
    PRODUCTS_DELETE_PRODUCT,
    PRODUCTS_GET_PRODUCTS
} from "../redux/actions/actionTypes";*/

const API_URL = "http://localhost:3000/products";

 /*export const addProduct = (product) =>async (dispatch) =>{
   try{
        await axios.post(API_URL, product);
        dispatch({ //objeto plano de la accion real
            type: PRODUCTS_ADD_PRODUCT,
            payload:product,
        });
    }catch (error){
        throw new Error(error.message);
    }
}*/
export const addProduct = async (product) =>{
    try{
        const response =await axios.post(API_URL, product);
        return response.data;
    }catch(error){
        throw new Error(error.message);
    }
};

/*export const editProduct = (id, updatedProduct) =>   async (dispatch) => {
    try {
        await axios.put(`${API_URL}/${id}`, updatedProduct);
        dispatch({
            type: PRODUCTS_EDIT_PRODUCT,
            payload: { id, product: updatedProduct },
        });
    } catch (error) {
        throw new Error(error.message);
    }
}*/

export const editProduct =  async (id, updatedProduct) => {

    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

 /*export const deleteProduct = (productId) =>async (dispatch) =>  {
   try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({
            type: PRODUCTS_DELETE_PRODUCT,
            payload: id,
        });
    } catch (error) {
        throw new Error(error.message);
    }
}*/
export const deleteProduct = async (productId) =>  {
    try {
        const response =await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

/*export const getProducts = () => async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        dispatch({
            type: PRODUCTS_GET_PRODUCTS,
            payload: response.data,
        });
    } catch (error) {
        throw new Error(error.message);
    }
}; */

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data
    } catch (error) {
        throw new Error(error.message);
    }
};
