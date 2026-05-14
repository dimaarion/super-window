import { createSlice } from '@reduxjs/toolkit'
import {parseNum} from "../action/index.js";

export const windowWidth = createSlice({
    name:"width",
    initialState: {
        value: 1500,
    },
    reducers:{
        setWindowWidth:(state,action)=>{
            state.value = parseNum(action.payload);
        }
    }

})
export const { setWindowWidth } = windowWidth.actions

export default windowWidth.reducer