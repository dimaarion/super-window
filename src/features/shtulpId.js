import { createSlice } from '@reduxjs/toolkit'

export const shtulpId = createSlice({
    name:"shtulpId",
    initialState: {
        value: 0,
    },
    reducers:{
        setShtulpId:(state,action)=>{
            state.value = action.payload
        }
    }

})
export const { setShtulpId } = shtulpId.actions

export default shtulpId.reducer