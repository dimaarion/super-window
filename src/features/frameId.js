import { createSlice } from '@reduxjs/toolkit'

export const frameId = createSlice({
    name:"frameId",
    initialState: {
        value: 0,
    },
    reducers:{
        setFrameId:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setFrameId } = frameId.actions

export default frameId.reducer