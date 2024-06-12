import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const itemSlice = createSlice({
    name:'item',
    initialState,//: initialState,
    reducers:{
        addItem(state, action) {
            state.push(action.payload)
        }
    }
})


export const  {addItem}= itemSlice.actions
export default itemSlice.reducer