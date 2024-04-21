import { createSlice } from '@reduxjs/toolkit';
/*import {
    PRODUCTS_ADD_PRODUCT,
    PRODUCTS_EDIT_PRODUCT,
    PRODUCTS_DELETE_PRODUCT,
    PRODUCTS_GET_PRODUCTS
} from "../actions/actionTypes.js";*/
//import * as API_URL from "/@/api/product.js";

const initialState ={
    products: [],
}
/*
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

const productSlice = createSlice({
    name: "tasks",
    initialState,
    reduce:{
        getAllProductsSuccess: (state, action) => {
            state.products =action.payload;
        },
        addProductSuccess: (state, action) => {
            state.products.push(action.payload)
        },
        editProductSuccess: (state, action) => { // Añadida la acción para editar un producto
            const { id, product } = action.payload;
            state.products = state.products.map(p =>
                p.id === id ? { ...p, ...product } : p
            );
        },
        deleteProductSuccess: (state, action) => {
            state.products = state.products.filter((product)=> product.id!== action.payload)
        }
    }
})

//Thunks
/*
export const addProductThunk = createAsyncThunk("products/addProduct", async (product) => {
    try{
        return await API_URL.addPRODUCT(product);

    }catch (error){
        throw new Error(error.message);
    }
});

export const editProductThunk =createAsyncThunk(
    "product/editProduct", 
    async (product)=>{
        try{
            return await API_URL.editProduct(product);
        }catch (error){
            throw new Error(error.message);
        }
    }
);

export const deleteProductThunk = createAsyncThunk(
    "product/deleteProduct",
    async (productId)=> {
        try{
            return await API_URL.deleteProduct(productId);
        }catch(error){
            throw new Error(error.message);
        }
    }
);
export const getAllProductsThunk =createAsyncThunk(
    "products/getAllProducts",
    async() => {
        try{
            return await API_URL.getAllProduct(); 
        }catch(error){
            throw new Error(error.message);
        }
    }
);

const initialState={
    products: [],
    isLoading: false,
    error:null,
};

const productSlice = createSlice({
    name: "tasks",
    initialState,
    reduces:[],
    estraReducers: (builder) => {
        builder
        .addCase (getAllProductsSuccess.fulfilled, (state, action) => {
            state.loading = false;
            state.products =action.payload;
        })
        .addCase(addProductSuccess.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload)
        })
        .addCase(editProductSuccess, (state, action) => { // Añadida la acción para editar un producto
            state.loading = false;
            const { id, product } = action.payload;
            state.products = state.products.map(p =>
                p.id === id ? { ...p, ...product } : p
            );
        })
        .addCase(deleteProductSuccess, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((product)=> product.id!== action.payload)
        })
        .addMatcher(
            (action)=> action.type.endsWith("/pending"),
            (state) => {
                state.isLoading = true;
                state.error=null;
            }
        )
    }
})

export const { getAllProducts, addProduct, editProduct, deleteProduct} = productSlice.actions;
export const getAllProducts = (state) => state.products.products;
export const getProductsError = (state) => state.products.error;
export const getProductsLoacing = (state) => state.products.loading
*/
//export default productReducer;
export default productSlice;
export const selectAllProducts = (state)=> state.products.products; //EL PRIMER PRODUCT CORRESPODE AL PRODUCT DE /REDUX/INDEX Y EL SEGUNDO DEL PRODUCTS DE ESTA PAGINA