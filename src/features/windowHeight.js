import { createSlice } from '@reduxjs/toolkit'

export const windowHeight = createSlice({
    name:"height",
    initialState: {
        value: 1500,
    },
    reducers:{
        setWindowHeight:(state,action)=>{
            state.value = Number.parseInt(action.payload)
        }
    }

})
export const { setWindowHeight } = windowHeight.actions

export default windowHeight.reducer