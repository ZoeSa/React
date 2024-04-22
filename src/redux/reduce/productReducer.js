import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/*import {
    PRODUCTS_ADD_PRODUCT,
    PRODUCTS_EDIT_PRODUCT,
    PRODUCTS_DELETE_PRODUCT,
    PRODUCTS_GET_PRODUCTS
} from "../actions/actionTypes.js";*/
import * as API from "../../api/product";
/*
const initialState ={
    products: [],
}

const productReducer =(state = initialState, action)=>{
    switch (action.type){
        case PRODUCTS_GET_PRODUCTS:
            return{
                ...state, 
                products:[action.playload],
            }

        case PRODUCTS_ADD_PRODUCT:
            return{
                ...state, 
                products:[...state.product, action.playload],
            }
        case PRODUCTS_EDIT_PRODUCT:
            if (action.payload && action.payload.id) {
                return {
                    ...state,
                    products: state.products.map(product =>
                        product.id === action.payload.id ? { ...product, ...action.payload } : product
                    )
                };
            } else {
                // En caso de que action.payload no tenga la estructura esperada
                return state;
            }

        case PRODUCTS_DELETE_PRODUCT:
            return{
                ...state, 
                products: state.product.filter((product) => product.id !==action.payload)
            };
        default:
            return state;
    }
};
*/
//slice

/*const productSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{
        getAllProductsSuccess: (state, action) => {
            state.products =action.payload;
        },
        addProductSuccess: (state, action) => {
            state.products.push(action.payload)
        },
        editProductSuccess: (state, action) => {
            const { id, product } = action.payload;
            state.products = state.products.map(p =>
                p.id === id ? { ...p, ...product } : p
            );
        },
        deleteProductSuccess: (state, action) => {
            state.products = state.products.filter((product)=> product.id!== action.payload)
        }
    }
});
*/
//Thunks

export const addProductThunk = createAsyncThunk("products/addProduct", async (product) => {
    try {
        return await API.addProduct(product);
    } catch (error) {
        throw new Error(error.message);
    }
});

export const editProductThunk = createAsyncThunk(
    "product/editProduct",
    async (product) => {
        try {
            return await API.editProduct(product);
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const deleteProductThunk = createAsyncThunk(
    "product/deleteProduct",
    async (productId) => {
        try {
            return await API.deleteProduct(productId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getAllProductsThunk = createAsyncThunk(
    "products/getAllProducts",
    async () => {
        try {
            return await API.getProducts();
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(addProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload)
            })
            .addCase(editProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const { id, product } = action.payload;
                state.products = state.products.map(p =>
                    p.id === id ? { ...p, ...product } : p
                );
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter((product) => product.id !== action.payload)
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message;
                }
            )
    }
});

export const { reducer: productReducer } = productSlice; // Aquí se exporta como `productReducer`
export const selectProductsError = (state) => state.products.error;
export const selectProductsLoading = (state) => state.products.isLoading;

//export default productReducer;
//export default productSlice;
export const selectAllProducts = (state)=> state.products.products; //EL PRIMER PRODUCT CORRESPODE AL PRODUCT DE /REDUX/INDEX Y EL SEGUNDO DEL PRODUCTS DE ESTA PAGINA