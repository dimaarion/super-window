import {Label, Select, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {select, whereId} from "../action/index.js";
import {useDispatch} from "react-redux";
import {setProfileHeight} from "../features/profileHeight.js";
import {setSashWidth} from "../features/sashWidth.js";
import {setImpostWidth} from "../features/impostWidth.js";

export default function WindowBuilder() {

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
        <div className={"w-full mt-6 ml-4 flex justify-center bg-gray-700 shadow-2xl border-2 text-xl text-white border-gray-500 shadow-black"}>
            <div className={"w-full "}>
                <div className={"p-4 bg-gray-600 w-full"}>Параметры</div>
                <div className={"flex justify-between p-4 border-b-2 border-gray-500"}>
                    <div>
                        <Label><div className={"text-xl flex self-center text-white"}>Ширина:</div></Label>
                    </div>
                    <div>
                        <TextInput color="myColor" className={"rounded-xl"} type={"number"} defaultValue = {1500} />
                    </div>
                </div>
                <div className={"flex justify-between p-4 border-b-2 border-gray-500"}>
                    <div>
                        <Label><div className={"text-xl flex self-center text-white"}>Высота:</div></Label>
                    </div>
                    <div>
                        <TextInput color="myColor" className={"rounded-xl"} type={"number"} defaultValue = {1500} />
                    </div>
                </div>


                <div className="max-w-md ">
                    <div className="mb-2 block">
                        <Label htmlFor="ramen">Рама</Label>
                    </div>
                    <Select color="myColor" className={"rounded-xl bg-gray-800 text-gray-50"} onChange={(e) => {
                        whereId("Accessories", e.target.value).then((res) => {
                            const el = res[0]
                            dispatch(setProfileHeight(el.width))
                        })
                    }} id="ramen" required>
                        {list.map((el) => <option key={el.id + 'ramen'} value={el.id}>{el.article}</option>)}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="sash">Створка</Label>
                    </div>
                    <Select onChange={(e) => {
                        whereId("Accessories", e.target.value).then((res) => {
                            const el = res[0]
                            dispatch(setSashWidth({width: el.width, paz: el.grooveOffset}))
                        })
                    }} id="sash" required>
                        {list.map((el) => <option key={el.id + 'sash'} value={el.id}>{el.article}</option>)}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="impost">Импост</Label>
                    </div>
                    <Select onChange={(e) => {
                        whereId("Accessories", e.target.value).then((res) => {
                            const el = res[0]
                            dispatch(setImpostWidth(el.width))
                        })
                    }} id="impost" required>
                        {list.map((el) => <option key={el.id + 'impost'} value={el.id}>{el.article}</option>)}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="shtulp">Штульп</Label>
                    </div>
                    <Select onChange={(e) => {
                        whereId("Accessories", e.target.value).then((res) => {
                            const el = res[0]

                        })
                    }} id="impost" required>
                        {list.map((el) => <option key={el.id + 'shtulp'} value={el.id}>{el.article}</option>)}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="glass">Заполнение</Label>
                    </div>
                    <Select onChange={(e) => {
                        whereId("Accessories", e.target.value).then((res) => {
                            const el = res[0]
                        })
                    }} id="impost" required>
                        {list.map((el) => <option key={el.id + 'glass'} value={el.id}>{el.article}</option>)}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="furniture">Фурнитура</Label>
                    </div>
                    <Select onChange={(e) => {
                       /*  whereId("Hardware", e.target.value).then((res) => {
                            const el = res[0]
                        })*/
                    }} id="impost" required>
                        {hardware.map((el) => <option key={el.id + 'furniture'} value={el.id}>{el.name}</option>)}
                    </Select>
                </div>
            </div>
        </div>
    </>
}