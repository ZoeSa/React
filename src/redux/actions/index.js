
import { PRODUCTS_ADD_PRODUCT,
    PRODUCTS_EDIT_PRODUCT,
    PRODUCTS_DELETE_PRODUCT,
    PRODUCTS_GET_PRODUCTS,
} from "./actionTypes";

export const addProduct = (product) =>({
    type: PRODUCTS_ADD_PRODUCT,
    payload: product,
});

export const editProduct = (productId) =>({
    type: PRODUCTS_EDIT_PRODUCT,
    payload: productId,
});

export const deleteProduct = (productId) =>({
    type: PRODUCTS_DELETE_PRODUCT,
    payload: productId,
});
export const getProducts = () =>({
    type: PRODUCTS_GET_PRODUCTS,
    
});