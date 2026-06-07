import { createSlice } from '@reduxjs/toolkit'

export const shtulpWindows = createSlice({
    name:"shtulpWindows",
    initialState: {
        value: {config:false},
    },
    reducers:{
        setStulpOpenConfig:(state,action)=>{
            state.value.config = action.payload
        }
    }

})
export const { setStulpOpenConfig } = shtulpWindows.actions

export default shtulpWindows.reducer