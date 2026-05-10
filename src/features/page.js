import { createSlice } from '@reduxjs/toolkit'

export const page = createSlice({
    name:"page",
    initialState: {
        value: "Главная",
    },
    reducers:{
        setPage:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setPage } = page.actions

export default page.reducer