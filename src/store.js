import { configureStore } from '@reduxjs/toolkit'
import {windowWidth} from "./features/windowWidth.js";
import {windowHeight} from "./features/windowHeight.js";
import {profileHeight} from "./features/profileHeight.js";
import {impostWidth} from "./features/impostWidth.js";
import {impostConfigOpen} from "./features/impostConfigOpen.js";
import {impostPosition} from "./features/ImpostPosition.js";
import {tree} from "./features/tree.js";
import {node} from "./features/node.js";
import {configListOpen} from "./features/configListOpen.js";
import {glassId} from "./features/glassId.js";
import {sashDirection} from "./features/sashDirection.js";
import {page} from "./features/page.js";
import {sashWidth} from "./features/sashWidth.js";
import {pageList} from "./features/pageList.js";
import {frameId} from "./features/frameId.js";
import {sashId} from "./features/sashId.js";
import {shtulpId} from "./features/shtulpId.js";
import {completion} from "./features/completion.js";
import {hardware} from "./features/hardware.js";
import {windows} from "./features/windows.js";
import {impostId} from "./features/impostId.js";
import {shtulpWindows} from "./features/shtulpWindows.js";


export default configureStore({
    reducer: {
        windowWidth:windowWidth.reducer,
        windowHeight:windowHeight.reducer,
        profileHeight:profileHeight.reducer,
        impostWidth:impostWidth.reducer,
        impostConfigOpen:impostConfigOpen.reducer,
        impostPosition:impostPosition.reducer,
        tree:tree.reducer,
        node:node.reducer,
        configListOpen:configListOpen.reducer,
        glassId:glassId.reducer,
        sashDirection:sashDirection.reducer,
        page:page.reducer,
        sashWidth:sashWidth.reducer,
        pageList:pageList.reducer,
        frameId:frameId.reducer,
        sashId:sashId.reducer,
        shtulpId:shtulpId.reducer,
        completion:completion.reducer,
        hardware:hardware.reducer,
        windows:windows.reducer,
        impostId:impostId.reducer,
        shtulpWindows:shtulpWindows.reducer

    },
})