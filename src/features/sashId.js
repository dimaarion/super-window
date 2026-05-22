import { createSlice } from '@reduxjs/toolkit'

export const sashId = createSlice({
    name:"sashId",
    initialState: {
        value: 0,
    },
    reducers:{
        setSashId:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setSashId } = sashId.actions

export default sashId.reducer