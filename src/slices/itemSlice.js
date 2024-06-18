import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers:{
        addItem(state, action) {
            state.push(action.payload)
            console.log("STATE ===========================", state, action)
        },
        removeItem(state, action) {
            console.log("STATE =========================== REMOVE ", state, action)
            action.payload.slice(0, action.payload.length - 1)
            action.payload = []
            state = []
            console.log("STATE =========================== REMOVE ", state, action)
        },
        searchItem(text) {
            console.log("searched",text)
            return {payload :{text}}
        }
    }
})


export const  {addItem, removeItem, searchItem}= itemSlice.actions
export default itemSlice.reducer