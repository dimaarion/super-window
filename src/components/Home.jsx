import CreateProject from "./CreateProject.jsx";
import DbSettings from "./DbSettings.jsx";
import {useDispatch, useSelector} from "react-redux";

import LeftPanel from "./LeftPanel.jsx";
import SavedProjects from "./SavedProjects.jsx";
import {useEffect} from "react";
import {whereId} from "../action/index.js";
import {setTree} from "../features/tree.js";


export default function Home() {
    const pageList = useSelector(state => state.pageList.value)
    const dispatch = useDispatch();


    if(pageList === "new-project"){
        return <CreateProject  />
    }else if(pageList === "bd-settings"){
        return <DbSettings />
    }else if(pageList === "saved-project"){
        return <SavedProjects />
    }else if(pageList === "update-project"){
        return <CreateProject  />
    } else {
       return <div className={"flex justify-between"}>
           <LeftPanel />


       </div>
    }




}