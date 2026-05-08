import { createSlice } from '@reduxjs/toolkit'

export const glassId = createSlice({
    name:"glassId",
    initialState: {
        value: 0,
    },
    reducers:{
        setGlassId:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setGlassId } = glassId.actions

export default glassId.reducer