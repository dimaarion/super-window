import { createSlice } from '@reduxjs/toolkit'

export const sashWidth = createSlice({
    name:"sashWidth",
    initialState: {
        value: {width:60,paz:24},
    },
    reducers:{
        setSashWidth:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setSashWidth } = sashWidth.actions

export default sashWidth.reducer