import {createSlice} from '@reduxjs/toolkit'

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
            unit:"м",
            sash:[],
            sashPrice:0,
            impostProfile:[],
            impostPrice:0,
            should:[],
            totalPrice:0,
            shouldPrice:0,
            glass:[]


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
        },
        setWindowSash:(state,action)=>{
            if(state.value.sash.filter((el)=>el.id === action.payload.id).length === 0){
                state.value.sash = [...state.value.sash,action.payload]
            }else {
                state.value.sash = state.value.sash.map((el)=> {
                   if(el.id === action.payload.id){
                       el = action.payload
                   }
                    return el
                })
            }
        },
        setWindowGlass:(state,action)=>{
            if(state.value.glass.filter((el)=>el.id === action.payload.id).length === 0){
                state.value.glass = [...state.value.glass,action.payload]
            }else {
                state.value.glass = state.value.glass.map((el)=> {
                    if(el.id === action.payload.id){
                        el = action.payload
                    }
                    return el
                })
            }
        },
        setWindowSashRemove:(state,action)=>{
            if(action.payload === "remove"){
                state.value.sash = [];
            }else {
                state.value.sash = state.value.sash.filter((el)=> el.id !== action.payload)
            }

        },
        setWindowSashPrice:(state,action)=>{
            state.value.sashPrice = parseInt(action.payload)
        },
        setWindowImpostPrice:(state,action)=>{
            state.value.impostPrice = parseInt(action.payload)
        },
        setWindowImpostProfile:(state,action)=>{
            const items = [...state.value.impostProfile,action.payload ]
            state.value.impostProfile = [...new Map(items.map(item => [item.id, item])).values()];
        },
        setWindowImpostProfileRemove:(state,action)=>{
            if(action.payload === "remove"){
                state.value.impostProfile = [];
            }else {
                const items = state.value.impostProfile.filter((el)=> el.id !== action.payload)
                state.value.impostProfile = [...new Map(items.map(item => [item.id, item])).values()];
            }

        },
        setWindowShould:(state,action)=>{
            const items = [...state.value.should, action.payload];
            state.value.should = [...new Map(items.map(item => [item.id, item])).values()];
        },
        setWindowShouldRemove:(state,action)=>{
            if(action.payload === "remove"){
                state.value.should = [];
            }else {
                state.value.should = state.value.should.filter((el)=> el.id !== action.payload)
            }
        },
        setWindowTotal:(state,action)=>{
            state.value.totalPrice = action.payload
        },
        setWindowShouldPrice:(state,action)=>{
            state.value.shouldPrice = action.payload
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
    setWindowUnit,
    setWindowSash,
    setWindowSashPrice,
    setWindowImpostProfile,
    setWindowSashRemove,
    setWindowImpostProfileRemove,
    setWindowImpostPrice,
    setWindowShould,
    setWindowShouldPrice,
    setWindowShouldRemove,
    setWindowTotal,
    setWindowGlass

} = windows.actions

export default windows.reducer