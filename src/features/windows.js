import { createSlice } from '@reduxjs/toolkit'

export const windows = createSlice({
    name:"windows",
    initialState: {
        value: {
            id:0,
            count:1,
            impostId:1,
            impost:0,
            article:"",
            name:"",
            category:"",
            system:"",
            image:"",
            accessories: [],
            price:0,
            color:1,
            framePrice:0,
            unit:"м"


        },
    },
    reducers:{
        setWindowCount:(state,action)=>{
            state.value.count = parseInt(action.payload)
        },
        setWindowImpostId:(state,action)=>{
            state.value.impostId = parseInt(action.payload)
        },
        setWindowImpost:(state,action)=>{
            state.value.impost = parseInt(action.payload)
        },
        setWindowId:(state,action)=>{
            state.value.id = parseInt(action.payload)
        },
        setWindowArticle:(state,action)=>{
            state.value.article = action.payload
        },
        setWindowName:(state,action)=>{
            state.value.name = action.payload
        },
        setWindowCategory:(state,action)=>{
            state.value.category = action.payload
        },
        setWindowSystem:(state,action)=>{
            state.value.system = action.payload
        },
        setWindowImage:(state,action)=>{
            state.value.image = action.payload
        },
        setWindowAccessories:(state,action)=>{
            state.value.accessories = action.payload
        },
        setWindowPrice:(state,action)=>{
            state.value.price = action.payload
        },
        setWindowColor:(state,action)=>{
            state.value.color = parseInt(action.payload)
        },
        setWindowFramePrice:(state,action)=>{
            state.value.framePrice = parseInt(action.payload)
        },
        setWindowUnit:(state,action)=>{
            state.value.unit = action.payload
        }
    }

})
export const {
    setWindowCount,
    setWindowImpostId,
    setWindowId ,
    setWindowArticle,
    setWindowName,
    setWindowCategory,
    setWindowSystem,
    setWindowImage,
    setWindowAccessories,
    setWindowPrice,
    setWindowColor,
    setWindowImpost,
    setWindowFramePrice,
    setWindowUnit
} = windows.actions

export default windows.reducer