import {Label, Select, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {select, whereId} from "../action/index.js";
import {useDispatch, useSelector} from "react-redux";
import {setSashWidth} from "../features/sashWidth.js";
import {setImpostWidth} from "../features/impostWidth.js";
import {setWindowWidth} from "../features/windowWidth.js";
import {setWindowHeight} from "../features/windowHeight.js";
import ColorSelect from "./ColorSelect.jsx";
import {setFrameId} from "../features/frameId.js";
import {setProfileHeight} from "../features/profileHeight.js";
import {setSashId} from "../features/sashId.js";
import {setShtulpId} from "../features/shtulpId.js";
import {setCompletionId} from "../features/completion.js";
import {setHardwareId} from "../features/hardware.js";
import {setWindowImpostId} from "../features/windows.js";

export default function WindowBuilder() {

    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const frameId = useSelector((state) => state.frameId.value);
    const sashId = useSelector((state) => state.sashId.value);
    const shtulpId = useSelector((state) => state.shtulpId.value);
    const completion = useSelector((state) => state.completion.value);
    const hardware = useSelector((state) => state.hardware.value);
    const windows = useSelector((state) => state.windows.value);


    const [list, setList] = useState([{}]);
    const [hardwareList, setHardwareList] = useState([{}]);
    const dispatch = useDispatch()




    useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
       select("Hardware").then((res) => {
           setHardwareList(res)
        })
    }, []);

    return <>
        <div className={"w-full relative z-20 mt-6 ml-4 flex justify-center bg-gray-800 shadow-xl shadow-gray-950 text-xl text-gray-50  "}>
            <div className={"w-full "}>
                <div className={"p-4 bg-gray-700 w-full"}>Параметры</div>
                <div className={"flex justify-between p-4 border-b-2 border-gray-500"}>
                    <div>
                        <Label htmlFor="width"><div className={"text-xl flex self-center text-gray-50"}>Ширина:</div></Label>
                    </div>
                    <div>
                        <TextInput onChange={(e) => {
                            dispatch(setWindowWidth(e.target.value))
                        }} id={"width"} color="myColor" value={windowWidth} />
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 border-gray-500"}>
                    <div>
                        <Label htmlFor="height"><div   className={"text-xl flex self-center text-gray-50"}>Высота:</div></Label>
                    </div>
                    <div>
                        <TextInput onChange={(e) => {
                            dispatch(setWindowHeight(e.target.value))
                        }} id={"height"} color="myColor"  value={windowHeight} />
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="ramen"><div className={"text-xl flex self-center text-gray-50"}>Цвет:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <ColorSelect/>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="ramen"><div className={"text-xl flex self-center text-gray-50"}>Рама:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select value={frameId} color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setFrameId(el.id))
                                dispatch(setProfileHeight(el.width))
                            })
                        }} id="ramen" required>
                            {list.map((el) => <option key={el.id + 'ramen'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="sash"><div className={"text-xl flex self-center text-gray-50"}>Створка:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select value={sashId} color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setSashId(el.id))
                                dispatch(setSashWidth({width: el.width, paz: el.grooveOffset}))
                            })
                        }} id="sash" required>
                            {list.map((el) => <option key={el.id + 'sash'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="impost"><div className={"text-xl flex self-center text-gray-50"}>Импост:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select value={windows.impostId} color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setWindowImpostId(el.id))
                                dispatch(setImpostWidth(el.width))
                            })
                        }} id="impost" required>
                            {list.map((el) => <option key={el.id + 'impost'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="shtulp"><div className={"text-xl flex self-center text-gray-50"}>Штульп:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select value={shtulpId} color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setShtulpId(el.id))
                            })
                        }} id="shtulp" required>
                            {list.map((el) => <option key={el.id + 'shtulp'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="glass"><div className={"text-xl flex self-center text-gray-50"}>Заполнение:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select value={completion.id} color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setCompletionId(el.id))
                            })
                        }} id="glass" required>
                            {list.map((el) => <option key={el.id + 'glass'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="furniture"><div className={"text-xl flex self-center text-gray-50"}>Фурнитура:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select value={hardware.id} color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Hardware", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setHardwareId(el.id))
                            })
                        }} id="furniture" required>
                            {hardwareList.map((el) => <option key={el.id + 'furniture'} value={el.id}>{el.name}</option>)}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    </>
}