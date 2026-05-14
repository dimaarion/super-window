import { createSlice } from '@reduxjs/toolkit'
import {parseNum} from "../action/index.js";

export const windowHeight = createSlice({
    name:"height",
    initialState: {
        value: 1500,
    },
    reducers:{
        setWindowHeight:(state,action)=>{
            state.value = parseNum( action.payload);
        }
    }

})
export const { setWindowHeight } = windowHeight.actions

export default windowHeight.reducer