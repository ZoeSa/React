import { combineReducers } from "redux";
import {productReducer} from "./productReducer";

const rootReduce =combineReducers({
    products:  productReducer,
})

export default rootReduce;