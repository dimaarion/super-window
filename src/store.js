import { configureStore } from '@reduxjs/toolkit'
import {windowWidth} from "./features/windowWidth.js";
import {windowHeight} from "./features/windowHeight.js";
import {windowColor} from "./features/windowColor.js";
import {profileHeight} from "./features/profileHeight.js";
import {impostWidth} from "./features/impostWidth.js";
import {impostConfigOpen} from "./features/ImpostConfigOpen.js";


export default configureStore({
    reducer: {
      windowWidth:windowWidth.reducer,
        windowHeight:windowHeight.reducer,
        windowColor:windowColor.reducer,
        profileHeight:profileHeight.reducer,
        impostWidth:impostWidth.reducer,
        impostConfigOpen:impostConfigOpen.reducer
    },
})