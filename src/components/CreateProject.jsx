import WindowView from "./WindowView.jsx";
import {useSelector} from "react-redux";
import ImpostConfig from "./ImpostConfig.jsx";
import ConfigList from "./ConfigList.jsx";
import WindowBuilder from "./WindowBuilder.jsx";
import {useEffect, useState} from "react";
import {exportSvgToBase64, select} from "../action/index.js";
import {Button} from "flowbite-react";
import TopPanel from "./TopPanel.jsx";
export default function CreateProject({pageList, setPageList}){
    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windowColor = useSelector((state) => state.windowColor.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const [image, setImage] = useState(null);



    return <>
        <div className={"w-1/2 justify-center hidden lg:flex"}>
            <WindowBuilder />
        </div>
        <div className={"w-full overflow-auto"}>
            <div className={"justify-center flex-wrap px-4"}>
                <TopPanel />
                <WindowView  width={windowWidth} height={windowHeight} heightProfile={profileHeight} color={windowColor}/>
                <div className={"w-full justify-center flex lg:hidden"}>
                    <div className={"w-full mt-6 flex justify-center bg-gray-700 shadow-2xl border-2 border-gray-500 shadow-black"}>
                    </div>
                </div>
            </div>
        </div>
        <div className={"w-1/2 justify-center hidden lg:flex"}>
            <div className={"w-full mt-6 flex justify-center bg-gray-700 shadow-2xl border-2 border-gray-500 shadow-black"}>
            </div>
        </div>
        {impostOpen ? <ImpostConfig impostWidth={impostWidth}/> : ""}
        <ConfigList/>

    </>
}