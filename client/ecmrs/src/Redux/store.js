import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authsliice.js'
import { composeWithDevTools } from "redux-devtools-extension";


const store = configureStore({
    reducer:{
        auth : authSliceReducer
    },
    devTools:true,

},composeWithDevTools());
export default store