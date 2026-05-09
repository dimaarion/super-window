import { createSlice } from '@reduxjs/toolkit'

export const windowWidth = createSlice({
    name:"width",
    initialState: {
        value: 1500,
    },
    reducers:{
        setWindowWidth:(state,action)=>{
            state.value = action.payload < 200?200:Number.parseInt(action.payload)
        }
    }

})
export const { setWindowWidth } = windowWidth.actions

export default windowWidth.reducer