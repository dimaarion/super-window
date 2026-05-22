import CreateProject from "./CreateProject.jsx";
import DbSettings from "./DbSettings.jsx";
import {useSelector} from "react-redux";

import LeftPanel from "./LeftPanel.jsx";
import SavedProjects from "./SavedProjects.jsx";


export default function Home() {
    const pageList = useSelector(state => state.pageList.value)



    if(pageList === "new-project"){
        return <CreateProject  />
    }else if(pageList === "bd-settings"){
        return <DbSettings />
    }else if(pageList === "saved-project"){
        return <SavedProjects />
    } else {
       return <LeftPanel />
    }




}