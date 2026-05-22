import { createSlice } from '@reduxjs/toolkit'

export const completion = createSlice({
    name:"completion",
    initialState: {
        value: {id:0},
    },
    reducers:{
        setCompletionId:(state,action)=>{
            state.value.id = action.payload
        }
    }

})
export const { setCompletionId } = completion.actions

export default completion.reducer