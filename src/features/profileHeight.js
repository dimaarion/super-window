import { createSlice } from '@reduxjs/toolkit'

export const profileHeight = createSlice({
    name:"profileHeight",
    initialState: {
        value: 60,
    },
    reducers:{
        setProfileHeight:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setProfileHeight } = profileHeight.actions

export default profileHeight.reducer