import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./SliceTodo";
import countSlice from './Slice-count'

let store = configureStore({
    reducer:{
        todo: todoSlice,
        count: countSlice,
    },

})



export default store