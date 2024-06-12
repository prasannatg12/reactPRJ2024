import { configureStore } from "@reduxjs/toolkit";
import itemReducer from './slices/itemSlice'

export const store = configureStore({
    devTools:true,
    reducer: {
        items: itemReducer
    }
});