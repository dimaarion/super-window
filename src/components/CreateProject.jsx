import WindowView from "./WindowView.jsx";
import {useDispatch, useSelector} from "react-redux";
import ImpostConfig from "./ImpostConfig.jsx";
import ConfigList from "./ConfigList.jsx";
import WindowBuilder from "./WindowBuilder.jsx";
import {useEffect, useMemo, useState} from "react";
import {whereId} from "../action/index.js";
import TopPanel from "./TopPanel.jsx";
import {setWindowFramePrice, setWindowImpostPrice, setWindowSashPrice, setWindowUnit} from "../features/windows.js";
import Loading from "./Loading.jsx";


export default function CreateProject() {
    const dispatch = useDispatch();
    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windows = useSelector((state) => state.windows.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const frameId = useSelector(state => state.frameId.value);
    const sashId = useSelector((state) => state.sashId.value);
    const impostId = useSelector((state) => state.impostId.value);
    const tree = useSelector(state => state.tree.value);
    const node = useSelector(state => state.node.value);
    const selectSashWidth = useSelector(state => state.sashWidth.value);
    const [step, setStep] = useState(0);
    const [color, setColor] = useState({
        name: "Белый",
        type: "white",
        color: "#ffffff",
        id: 1
    });
    const [fullScreen, setFullScreen] = useState(true);


    useEffect(() => {
        whereId("Colors", windows.color).then((el) => {
            setColor(el[0])
        })
    }, [windows.color]);

    useEffect(() => {
        whereId("Accessories", frameId).then((el) => {
            if (el[0]) {
                dispatch(setWindowFramePrice(el[0][color.type]))
                dispatch(setWindowUnit(el[0].unit))
            }
        })
    }, [frameId, color.type, dispatch]);
    useEffect(() => {
        whereId("Accessories", sashId).then((el) => {
            if (el[0]) {
                dispatch(setWindowSashPrice(el[0][color.type]))
                dispatch(setWindowUnit(el[0].unit))
            }
        })
    }, [sashId, color.type, dispatch]);
    useEffect(() => {
        whereId("Accessories", windows.impostId).then((el) => {
            if (el[0]) {
                dispatch(setWindowImpostPrice(el[0][color.type]))
                dispatch(setWindowUnit(el[0].unit))
            }
        })
    }, [windows.impostId, color.type, dispatch]);


    const frame = useMemo(() => {
        const frameLength = ((windowWidth * 2 + windowHeight * 2) / 1000).toFixed(1);
        const framePrice = frameLength * windows.framePrice;
        return {width: frameLength, price: framePrice.toFixed(2)};
    }, [windowWidth, windowHeight, windows.framePrice])

    const impost = useMemo(() => {
        const imp = windows.impostProfile.map((item, i) => {
            if (item.h === windowHeight && item.splitType === "vertical") {
                return {count: i, len: item.h - (profileHeight * 2), type: item.splitType}
            } else if (item.h !== windowHeight && item.splitType === "vertical") {
                return {count: i, len: item.h, type: item.splitType}
            } else if (item.w === windowWidth && item.splitType === "horizontal") {
                return {count: i, len: item.w - (profileHeight * 2), type: item.splitType}
            } else if (item.w !== windowWidth && item.splitType === "horizontal") {
                return {count: i, len: item.w, type: item.splitType}
            } else {
                return {count: i, len: null, type: null}
            }
        })
        const totalImpWidth = imp.reduce((acc, item) => acc + item.len, 0) / 1000;
        const price = totalImpWidth * windows.impostPrice
        return {width: totalImpWidth.toFixed(2), price: price.toFixed(2)};
    }, [windows.impostProfile, windowWidth, windowHeight, profileHeight, windows.impostPrice]);

    const sash = useMemo(() => {
        const sashWidth = windows.sash.reduce((acc, item) => acc + item.width, 0) / 1000;
        const sashHeight = windows.sash.reduce((acc, item) => acc + item.height, 0) / 1000;
        const price = ((sashWidth + sashHeight) * 2) * windows.sashPrice;
        console.log(((sashWidth + sashHeight) * 2).toFixed(2))
        return {width: ((sashWidth + sashHeight) * 2).toFixed(2), price: price};
    }, [windows.sash, windows.sashPrice])

    useEffect(() => {
        console.log(tree)
    }, [tree])

    useEffect(() => {
        const interval = setTimeout(() => {
            setStep(10);
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
     //   dispatch(setTree(tree))
    }, [tree, fullScreen,dispatch])

    return <>
        {fullScreen?<div className={"w-1/2 justify-center hidden lg:flex"}>
            <WindowBuilder/>
        </div>:""}
        <div className={"w-full overflow-auto"}>
            <div className={"justify-center flex-wrap px-4 sm:px-0"}>
             <div className={"hidden sm:block"}>
                 <TopPanel/>
             </div>
                <div className={"relative"}>
                    {step > 5 ? <WindowView tree={tree} impostWidth={impostWidth} width={windowWidth} height={windowHeight}
                                              heightProfile={profileHeight} color={color.color}/> :  <div className={"absolute top-0 bottom-0 right-0 left-0 m-auto w-[425px]"}> <Loading/></div> }
                    <div  className={"w-full justify-end hidden lg:flex absolute top-0 "}>
                        <div onClick={()=>{
                            setFullScreen(!fullScreen)
                        }} className={"mt-6 flex justify-center w-[80px] cursor-pointer bg-gray-950 hover:bg-gray-800 shadow-2xl border-2 border-gray-500 shadow-black"}>
                            <div className={"text-white p-4"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        {fullScreen?<div className={"w-1/2 justify-center hidden lg:flex"}>
            <div
                className={"w-full relative z-20 mt-6 ml-4 flex justify-center bg-gray-800 shadow-xl shadow-gray-950 text-xl text-gray-50"}>
                <div className={"w-full"}>
                    <div className={"p-4 bg-gray-700 w-full"}>Спецификации</div>
                    <div className={"flex-wrap justify-between border-b-2 border-gray-500"}>
                        <div className={"flex gap-4 text-lg text-start p-2"}>
                            <div className={"w-[80px]"}>Рама:</div>
                            <div>
                                <div>Длина:</div>
                                <div>Цена:</div>
                                <div>Стоимость:</div>
                            </div>
                            <div>
                                <div> {frame.width} м.</div>
                                <div> {windows.framePrice}</div>
                                <div> {frame.price}</div>
                            </div>

                        </div>
                        <div className={"flex gap-4 text-lg text-start p-2"}>
                            <div className={"w-[80px]"}>Створка:</div>
                            <div>
                                <div>Длина:</div>
                                <div>Цена:</div>
                                <div>Стоимость:</div>
                            </div>
                            <div>
                                <div> {sash.width} м.</div>
                                <div> {windows.sashPrice}</div>
                                <div>{sash.price}</div>
                            </div>
                        </div>
                        <div className={"flex gap-4 text-lg text-start p-2"}>
                            <div className={"w-[80px]"}>Импост:</div>
                            <div>
                                <div>Длина:</div>
                                <div>Цена:</div>
                                <div>Стоимость:</div>
                            </div>
                            <div>
                                <div> {impost.width} м.</div>
                                <div> {windows.impostPrice}</div>
                                <div>{impost.price}</div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>:""}
        {impostOpen ? <ImpostConfig impostWidth={impostWidth}/> : ""}
        <ConfigList/>

    </>
}