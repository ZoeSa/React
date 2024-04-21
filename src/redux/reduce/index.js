import { combineReducers } from "redux";
import productSlice from "./productReducer";

const rootReducer =combineReducers({
    products: productSlice,
})

export default rootReducer;