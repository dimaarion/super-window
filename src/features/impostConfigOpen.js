import { createSlice } from '@reduxjs/toolkit'

export const impostConfigOpen = createSlice({
    name:"setImpostConfigOpen",
    initialState: {
        value: false,
    },
    reducers:{
        setImpostConfigOpen:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setImpostConfigOpen } = impostConfigOpen.actions

export default impostConfigOpen.reducer