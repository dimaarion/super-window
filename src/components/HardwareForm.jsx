import {Button, Label, Select, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {insertTable, select, updateTb} from "../action/index.js";

export default function HardwareForm() {
    const defaultHardware = {
        name: "",
        setId: []
    }
    const defaultHardwareSet = {id:1,name:"",accessoriesId:1,count:1,specificationId:[]}
    const [list, setList] = useState([{}]);
    const [hardwareList, setHardwareList] = useState([{}]);
    const [id, setId] = useState(1);
    const [hardware, setHardware] = useState(defaultHardware);
    const [hardwareSet, setHardwareSet] = useState([{}]);
    const [createFurn, setCreateFurn] = useState(false);
    useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
    }, []);

    useEffect(() => {
        select("Hardware").then((res) => {
            setHardwareList(res)
        })
    }, [hardware,hardwareList]);

    useEffect(() => {
        select("HardwareSet").then((res) => {
            setHardwareSet(res)
        })
    }, []);

    return <>
        <div className={"flex justify-end m-2 gap-2"}>
            <Button onClick={() => {
                setCreateFurn(true)
            }} className={"w-[100px] p-2 text-gray-900 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center "}>
                Добавить
            </Button>
            <Button onClick={() => {
                console.log(hardware)
                updateTb("Hardware",hardware,id)
            }} className={"w-[100px] p-2 text-gray-900 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center "}>
                Сохранить
            </Button>
        </div>
        <div className={"flex px-4  gap-4 w-full justify-between"}>
            <div className={"text-center w-full flex"}>
                <table className={"w-full "}>
                    <thead>
                    <tr className={"bg-blue-300"}>
                        <td className={"p-2"}>№</td>
                        <td className={"p-2"}>Название</td>
                    </tr>
                    </thead>
                    <tbody>
                    {hardwareList.map((el)=><tr onClick={()=>{
                        setId(el.id)
                        setHardware({
                            name: el.name,
                            setId:el.setId
                        })
                    }} className={"hover:bg-blue-100 cursor-pointer"} key={el.id + "Hardware"}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>

            <div className={"text-center w-full relative"}>
                <div className={"bg-blue-300 p-2"}>Наборы</div>
                <div className={"flex justify-end w-full absolute"}>
                    <svg onClick={()=>{
                        setHardware({name:hardware.name,setId: [...hardware.setId,0] })

                    }}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                         className="bi bi-plus-square cursor-pointer m-6" viewBox="0 0 16 16">
                        <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
                <div className={"absolute"}>
                    {hardware.setId.map((id,j)=><div key={j} className={"text-start px-4"}>
                        <Select onChange={(e)=>{
                            setHardware({name:hardware.name,setId: hardware.setId.map((er,g)=> {
                                if(j === g){
                                  er = parseInt(e.target.value)
                                }

                                    return er
                                })})

                        }} className={"w-[200px] mt-2"}>
                            {hardwareSet.filter((f)=>f.id === id).map((set)=><option value={set.id} key={set.id + "opt"}>
                                {set.name}
                            </option>)}
                            {hardwareSet.map((set)=><option value={set.id} key={set.id + "opt"}>
                                {set.name}
                            </option>)}
                        </Select>

                    </div>)}
                </div>

            </div>
        </div>
        {createFurn ?
            <div className={" w-full sm:w-1/2 absolute p-4 m-auto right-0 left-0 bg-amber-50 overflow-auto h-auto"}>
                <div className={"flex justify-center gap-2 w-full"}>
                    <div className={"w-full"}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Название</Label>
                        </div>
                        <TextInput className={"w-full"} name={"name"} onChange={(e) => {
                            const {name, value, type} = e.target;
                            setHardware((prevState) => ({
                                ...prevState, [name]: type === 'number' ? parseFloat(value) || 0 : value
                            }));
                        }} id="name" type="text" sizing="md"/>
                    </div>
                </div>
            </div>
            <div>

            </div>

            <div className={"flex justify-end mt-6 gap-2"}>
                <Button
                    onClick={() => {
                        setCreateFurn(false)
                        insertTable("Hardware",{name:hardware.name,setId:[]})
                    }}
                    className={"text-gray-900 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center"}>Сохранить</Button>
                <Button
                    onClick={() => {
                        setCreateFurn(false)
                    }}
                    className={"text-gray-900 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center"}>Закрыть</Button>
            </div>
        </div>:""}

    </>
}