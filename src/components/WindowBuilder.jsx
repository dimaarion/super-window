import {Label, Select, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {select, whereId} from "../action/index.js";
import {useDispatch, useSelector} from "react-redux";
import {setProfileHeight} from "../features/profileHeight.js";
import {setSashWidth} from "../features/sashWidth.js";
import {setImpostWidth} from "../features/impostWidth.js";
import {setWindowWidth} from "../features/windowWidth.js";
import {setWindowHeight} from "../features/windowHeight.js";

export default function WindowBuilder() {

    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windowColor = useSelector((state) => state.windowColor.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const configOpen = useSelector(state => state.configListOpen.value);

    const [list, setList] = useState([{}]);
    const [hardware, setHardware] = useState([{}]);
    const dispatch = useDispatch()




    useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
       select("Hardware").then((res) => {
            setHardware(res)
        })
    }, []);

    return <>
        <div className={"w-full relative z-20 mt-6 ml-4 flex justify-center bg-gray-800 shadow-2xl border-2 text-xl text-white border-gray-500 shadow-black"}>
            <div className={"w-full "}>
                <div className={"p-4 bg-gray-900 w-full"}>Параметры {windowWidth}</div>
                <div className={"flex justify-between p-4 border-b-2 border-gray-500"}>
                    <div>
                        <Label htmlFor="width"><div className={"text-xl flex self-center text-white"}>Ширина:</div></Label>
                    </div>
                    <div>
                        <TextInput onChange={(e) => {
                            dispatch(setWindowWidth(e.target.value))
                        }} id={"width"} color="myColor" value={windowWidth} />
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 border-gray-500"}>
                    <div>
                        <Label htmlFor="height"><div   className={"text-xl flex self-center text-white"}>Высота:</div></Label>
                    </div>
                    <div>
                        <TextInput onChange={(e) => {
                            dispatch(setWindowHeight(e.target.value))
                        }} id={"height"} color="myColor"  value={windowHeight} />
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="ramen"><div className={"text-xl flex self-center text-white"}>Рама:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setProfileHeight(el.width))
                            })
                        }} id="ramen" required>
                            {list.map((el) => <option key={el.id + 'ramen'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="sash"><div className={"text-xl flex self-center text-white"}>Створка:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setSashWidth({width: el.width, paz: el.grooveOffset}))
                            })
                        }} id="sash" required>
                            {list.map((el) => <option key={el.id + 'sash'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="impost"><div className={"text-xl flex self-center text-white"}>Импост:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                dispatch(setImpostWidth({width: el.width}))
                            })
                        }} id="impost" required>
                            {list.map((el) => <option key={el.id + 'impost'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="shtulp"><div className={"text-xl flex self-center text-white"}>Штульп:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                                //dispatch(setSashWidth({width: el.width, paz: el.grooveOffset}))
                            })
                        }} id="shtulp" required>
                            {list.map((el) => <option key={el.id + 'shtulp'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="glass"><div className={"text-xl flex self-center text-white"}>Заполнение:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                               // dispatch(setSashWidth({width: el.width, paz: el.grooveOffset}))
                            })
                        }} id="glass" required>
                            {list.map((el) => <option key={el.id + 'glass'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 gap-2 border-gray-500"}>
                    <div className={"flex"}>
                        <Label htmlFor="furniture"><div className={"text-xl flex self-center text-white"}>Фурнитура:</div></Label>
                    </div>
                    <div className={"w-full max-w-[180px] flex"}>
                        <Select color="myColor" className={"w-full"} onChange={(e) => {
                            whereId("Accessories", e.target.value).then((res) => {
                                const el = res[0]
                               // dispatch(setSashWidth({width: el.width, paz: el.grooveOffset}))
                            })
                        }} id="furniture" required>
                            {list.map((el) => <option key={el.id + 'furniture'} value={el.id}>{el.article}</option>)}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    </>
}