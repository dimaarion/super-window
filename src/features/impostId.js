import { createSlice } from '@reduxjs/toolkit'

export const impostId = createSlice({
    name:"impostId",
    initialState: {
        value: 0,
    },
    reducers:{
        setImpostId:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setImpostId } = impostId.actions

export default impostId.reducer