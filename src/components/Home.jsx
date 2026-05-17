import WindowView from "./WindowView.jsx";
import {useSelector} from "react-redux";
import ImpostConfig from "./ImpostConfig.jsx";
import ConfigList from "./ConfigList.jsx";
import WindowBuilder from "./WindowBuilder.jsx";

export default function Home() {
    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windowColor = useSelector((state) => state.windowColor.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const configOpen = useSelector(state => state.configListOpen.value);


    return <>
        <div className={"w-1/2 justify-center flex px-5"}>
           <WindowBuilder />
        </div>
        <div className={"w-full overflow-auto"}>
            <div className={"justify-center flex mt-20"}>
                    <WindowView  width={windowWidth} height={windowHeight}
                                 heightProfile={profileHeight} color={windowColor}/>

            </div>
        </div>
        <div className={"w-1/2 justify-center flex px-5"}>
            <div className={"w-full mt-6 ml-4 flex justify-center bg-gray-700 shadow-2xl border-2 border-gray-500 shadow-black"}>
            </div>
        </div>
        {impostOpen ? <ImpostConfig impostWidth={impostWidth}/> : ""}
        <ConfigList/>

    </>
}