import { createSlice } from '@reduxjs/toolkit'

export const impostWidth = createSlice({
    name:"profileHeight",
    initialState: {
        value: 80,
    },
    reducers:{
        setImpostWidth:(state,action)=>{
            state.value = Number.parseInt(action.payload)
        }
    }

})
export const { setImpostWidth } = impostWidth.actions

export default impostWidth.reducer