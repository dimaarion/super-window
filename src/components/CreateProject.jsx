import WindowView from "./WindowView.jsx";
import {useDispatch, useSelector} from "react-redux";
import ImpostConfig from "./ImpostConfig.jsx";
import ConfigList from "./ConfigList.jsx";
import WindowBuilder from "./WindowBuilder.jsx";
import {useEffect, useMemo, useState} from "react";
import {whereId} from "../action/index.js";
import TopPanel from "./TopPanel.jsx";
import {setWindowFramePrice, setWindowImpostPrice, setWindowSashPrice, setWindowUnit} from "../features/windows.js";
import {setWindowWidth} from "../features/windowWidth.js";

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
    const [step, setStep] = useState(0);
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
            if(el[0]){
                dispatch(setWindowFramePrice(el[0][color.type]))
                dispatch(setWindowSashPrice(el[0][color.type]))
                dispatch(setWindowImpostPrice(el[0][color.type]))
                dispatch(setWindowUnit(el[0].unit))
            }

        })
    }, [frameId, color.type,dispatch]);


    const frame = useMemo(() => {
        const frameLength = ((windowWidth * 2 + windowHeight * 2) / 1000).toFixed(1);
        const framePrice = frameLength * windows.framePrice;
        return {width:frameLength,price:framePrice.toFixed(2)};
    },[windowWidth,windowHeight,windows.framePrice])

  const impost =  useMemo(() => {

    const imp = windows.impostProfile.map((item,i)=>{

            if(item.h === windowHeight && item.splitType === "vertical"){
             return   {count:i, len:item.h - (profileHeight * 2) ,type:item.splitType}
            }else if(item.h !== windowHeight && item.splitType === "vertical"){
                return {count:i,len:item.h,type:item.splitType}
            }else if(item.w === windowWidth && item.splitType === "horizontal"){
                return {count:i,len:item.w - (profileHeight * 2),type:item.splitType}
            }else if(item.w !== windowWidth && item.splitType === "horizontal"){
                return {count:i,len:item.w,type:item.splitType}
            }else {
                return {count:i,len:null,type:null}
            }

        })

        const totalImpWidth = imp.reduce((acc, item) => acc + item.len, 0) / 1000;
        const price = totalImpWidth * windows.impostPrice
        return {width:totalImpWidth.toFixed(2),price:price.toFixed(2)};


    }, [windows.impostProfile,windowWidth,windowHeight,profileHeight,windows.impostPrice]);

    console.log(impost)




    useEffect(()=>{
       // console.log(windows.impostProfile)
    },[windows.impostProfile])


useEffect(()=>{
   const interval = setTimeout(() => {
       setStep(10);
   },1500)
return () => clearInterval(interval)
},[])




    return <>
        <div className={"w-1/2 justify-center hidden lg:flex"}>
            {step}
            <WindowBuilder/>
        </div>
        <div className={"w-full overflow-auto"}>
            <div className={"justify-center flex-wrap px-4"}>
                <TopPanel />
                {step > 5?<WindowView tree={tree} impostWidth={impostWidth} width={windowWidth} height={windowHeight}
                             heightProfile={profileHeight} color={color.color}/>:""}
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
                    <div className={"flex-wrap justify-between border-b-2 border-gray-500"}>
                        <div className={"flex gap-4 text-lg text-start p-2"}>
                            <div>Рама:</div>
                            <div>
                                <div>Длина:</div>
                                <div>Цена:</div>
                                <div>Стоимость:</div>
                            </div>
                            <div>
                                <div> {frame.width} {windows.unit}.</div>
                                <div> {windows.framePrice}</div>
                                <div> {frame.price}</div>
                            </div>

                        </div>
                        <div className={"flex gap-4 text-lg text-start p-2"}>
                            <div>Импост:</div>
                            <div>
                                <div>Длина: {impost.width} {windows.unit}.</div>
                                <div>Цена: {windows.impostPrice}</div>
                                <div>Стоимость: {impost.price} </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
        {impostOpen ? <ImpostConfig impostWidth={impostWidth}/> : ""}
        <ConfigList/>

    </>
}