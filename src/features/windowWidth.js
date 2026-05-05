import { createSlice } from '@reduxjs/toolkit'

export const windowWidth = createSlice({
    name:"width",
    initialState: {
        value: 0,
    },
    reducers:{
        setWindowWidth:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setWindowWidth } = windowWidth.actions

export default windowWidth.reducer