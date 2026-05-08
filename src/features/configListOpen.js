import { createSlice } from '@reduxjs/toolkit'

export const configListOpen = createSlice({
    name:"configListOpen",
    initialState: {
        value: false,
    },
    reducers:{
        setConfigListOpen:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setConfigListOpen } = configListOpen.actions

export default configListOpen.reducer