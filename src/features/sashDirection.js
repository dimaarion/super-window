import { createSlice } from '@reduxjs/toolkit'

export const sashDirection = createSlice({
    name:"sashDirection",
    initialState: {
        value: "right",
    },
    reducers:{
        setSashDirection:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setSashDirection } = sashDirection.actions

export default sashDirection.reducer