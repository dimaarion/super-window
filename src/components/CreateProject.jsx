import WindowView from "./WindowView.jsx";
import {useDispatch, useSelector} from "react-redux";
import ImpostConfig from "./ImpostConfig.jsx";
import ConfigList from "./ConfigList.jsx";
import WindowBuilder from "./WindowBuilder.jsx";
import {useEffect, useState} from "react";
import {whereId} from "../action/index.js";
import TopPanel from "./TopPanel.jsx";
import {setWindowFramePrice, setWindowUnit} from "../features/windows.js";

export default function CreateProject(){
    const dispatch = useDispatch();
    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windows = useSelector((state) => state.windows.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const frameId = useSelector(state => state.frameId.value);
    const tree = useSelector(state => state.tree.value);
    const node = useSelector(state => state.node.value);
    const [color, setColor] = useState({
        name: "Белый",
        type: "white",
        color: "#ffffff",
        id: 1
    });

    useEffect(() => {
        whereId("Colors",windows.color).then((el)=>{
            setColor(el[0])
        })
    }, [windows.color]);

    useEffect(() => {
        whereId("Accessories",frameId).then((el)=>{
            dispatch(setWindowFramePrice(el[0][color.type]))
            dispatch(setWindowUnit(el[0].unit))
        })
    }, [frameId, color.type,dispatch]);
    const frameLength = (windowWidth * 2 + windowHeight * 2) / 1000;
    const framePrice = frameLength * windows.framePrice

    console.log(tree,node)


    return <>
        <div className={"w-1/2 justify-center hidden lg:flex"}>
            <WindowBuilder />
        </div>
        <div className={"w-full overflow-auto"}>
            <div className={"justify-center flex-wrap px-4"}>
                <TopPanel />
                <WindowView  width={windowWidth} height={windowHeight} heightProfile={profileHeight} color={color.color}/>
                <div className={"w-full justify-center flex lg:hidden"}>
                    <div className={"w-full mt-6 flex justify-center bg-gray-700 shadow-2xl border-2 border-gray-500 shadow-black"}>
                    </div>
                </div>
            </div>
        </div>
        <div className={"w-1/2 justify-center hidden lg:flex"}>
            <div  className={"w-full relative z-20 mt-6 ml-4 flex justify-center bg-gray-800 shadow-xl shadow-gray-950 text-xl text-gray-50"}>
                <div className={"w-full"}>
                    <div className={"p-4 bg-gray-700 w-full"}>Спецификации</div>
                    <div className={"flex-wrap justify-between p-4 border-b-2 border-gray-500"}>
                        <div className={"grid grid-cols-3 text-lg text-start"}>
                            <div>Название</div>
                            <div>Цена</div>
                            <div>Сумма</div>
                        </div>
                        <div className={"grid grid-cols-3 text-lg text-start"}>
                            <div>Рама:</div>
                            <div>{frameLength} {windows.unit}.</div>
                            <div>{framePrice} </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
        {impostOpen ? <ImpostConfig impostWidth={impostWidth}/> : ""}
        <ConfigList/>

    </>
}