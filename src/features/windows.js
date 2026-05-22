import { createSlice } from '@reduxjs/toolkit'

export const windows = createSlice({
    name:"windows",
    initialState: {
        value: {
            id:0,
            count:1,
            impostId:1
        },
    },
    reducers:{
        setWindowCount:(state,action)=>{
            state.value.count = parseInt(action.payload)
        },
        setWindowImpostId:(state,action)=>{
            state.value.impostId = parseInt(action.payload)
        }
    }

})
export const { setWindowCount,setWindowImpostId } = windows.actions

export default windows.reducer