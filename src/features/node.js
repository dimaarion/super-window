import { createSlice } from '@reduxjs/toolkit'

export const node = createSlice({
    name:"node",
    initialState: {
        value: {},
    },
    reducers:{
        setNode:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setNode } = node.actions

export default node.reducer