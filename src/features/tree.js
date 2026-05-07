import { createSlice } from '@reduxjs/toolkit'

export const tree = createSlice({
    name:"tree",
    initialState: {
        value: { id: 'root', type: 'glass'},
    },
    reducers:{
        setTree:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setTree } = tree.actions

export default tree.reducer