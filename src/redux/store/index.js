import {configureStore} from "@reduxjs/toolkit";
import rootReduce from "../reduce";

const store =configureStore({
    reducer: rootReduce,
    devTools: true,
});

export default store;