import { configureStore } from '@reduxjs/toolkit'
import {windowWidth} from "./features/windowWidth.js";


export default configureStore({
    reducer: {
      windowWidth:windowWidth.reducer
    },
})