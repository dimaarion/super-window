import { createSlice } from '@reduxjs/toolkit'

export const impostWidth = createSlice({
    name:"profileHeight",
    initialState: {
        value: 60,
    },
    reducers:{
        setImpostWidth:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setImpostWidth } = impostWidth.actions

export default impostWidth.reducer