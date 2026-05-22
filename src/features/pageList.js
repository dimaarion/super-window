import { createSlice } from '@reduxjs/toolkit'

export const pageList = createSlice({
    name:"pageList",
    initialState: {
        value: "",
    },
    reducers:{
        setPageList:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setPageList } = pageList.actions

export default pageList.reducer