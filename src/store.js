import { configureStore } from '@reduxjs/toolkit'
import {windowWidth} from "./features/windowWidth.js";
import {windowHeight} from "./features/windowHeight.js";
import {windowColor} from "./features/windowColor.js";
import {profileHeight} from "./features/profileHeight.js";
import {impostWidth} from "./features/impostWidth.js";
import {impostConfigOpen} from "./features/impostConfigOpen.js";
import {impostPosition} from "./features/ImpostPosition.js";
import {tree} from "./features/tree.js";
import {node} from "./features/node.js";
import {configListOpen} from "./features/configListOpen.js";
import {impostId} from "./features/impostId.js";
import {glassId} from "./features/glassId.js";
import {sashDirection} from "./features/sashDirection.js";
import {page} from "./features/page.js";
import {sashWidth} from "./features/sashWidth.js";


export default configureStore({
    reducer: {
        windowWidth:windowWidth.reducer,
        windowHeight:windowHeight.reducer,
        windowColor:windowColor.reducer,
        profileHeight:profileHeight.reducer,
        impostWidth:impostWidth.reducer,
        impostConfigOpen:impostConfigOpen.reducer,
        impostPosition:impostPosition.reducer,
        tree:tree.reducer,
        node:node.reducer,
        configListOpen:configListOpen.reducer,
        impostId:impostId.reducer,
        glassId:glassId.reducer,
        sashDirection:sashDirection.reducer,
        page:page.reducer,
        sashWidth:sashWidth.reducer

    },
})