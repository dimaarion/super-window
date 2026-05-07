import { createSlice } from '@reduxjs/toolkit'

export const windowColor = createSlice({
    name:"height",
    initialState: {
        value: "#ffffff",
    },
    reducers:{
        setWindowColor:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setWindowColor } = windowColor.actions

export default windowColor.reducer