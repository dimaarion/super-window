import { createSlice } from '@reduxjs/toolkit'

export const impostPosition = createSlice({
    name:"impostPosition",
    initialState: {
        value: 0,
    },
    reducers:{
        setImpostPosition:(state,action)=>{
            state.value = Number.parseInt(action.payload)
        }
    }

})
export const { setImpostPosition } = impostPosition.actions

export default impostPosition.reducer