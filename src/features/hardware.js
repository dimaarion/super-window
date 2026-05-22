import { createSlice } from '@reduxjs/toolkit'

export const hardware = createSlice({
    name:"hardware",
    initialState: {
        value: {id:0},
    },
    reducers:{
        setHardwareId:(state,action)=>{
            state.value.id = action.payload
        }
    }

})
export const { setHardwareId } = hardware.actions

export default hardware.reducer