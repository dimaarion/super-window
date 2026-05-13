import {Button, Select, TextInput} from "flowbite-react";
import {insertTable, parseNan, select, updateTb} from "../action/index.js";
import {useEffect, useState} from "react";
import {connection} from "../Db.js";

export default function SetForm(){
    const defaultValue = {
        name:"",
        accessoriesId:1,
        count:1,
        specificationId:[],
        distance:0,
        indent:0
    }


    const [data, setData]=useState([{}])
    const [dataAccessories, setAccessoriesData]=useState([{}])
    const [value,setValue]=useState(defaultValue)

    useEffect(() => {
        select("HardwareSet").then((res)=>{
            setData(res)
        })
    }, [data]);

    useEffect(() => {
        select("Accessories").then((res)=>{
            setAccessoriesData(res)
        })
    }, []);
    return<>
        <div className={"flex justify-end m-6 gap-2"}>
            <Button onClick={() => {
                   setValue(defaultValue)
                   insertTable("HardwareSet",value)
            }} className={"w-[100px] p-2 text-gray-900 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center "}>
                Добавить
            </Button>
        </div>
        <div className={"flex ml-4 w-full"}>
            <div className={"w-full"}>
                <div className={"bg-blue-300 text-center"}>№</div>

            </div>
            <div className={"w-full"}>
                <div className={"bg-blue-300 text-center"}>Артикул</div>

            </div>
            <div className={"w-full"}>
                <div className={"bg-blue-300 text-center"}>Название</div>

            </div>
            <div className={"w-full"}>
                <div className={"bg-blue-300 text-center"}>Количество</div>

            </div>
            <div className={"w-full"}>
                <div className={"bg-blue-300 text-center"}>Расстояние</div>

            </div>
            <div className={"w-full"}>
                <div className={"bg-blue-300 text-center"}>Отступ</div>

            </div>
        </div>
        {data.map((el)=> <div key={el.id + "set"} className={"flex ml-4 w-full gap-2"}>
            <div className={"w-full"}>
                <div className={" text-center"}>
                    {el.id}
                </div>

            </div>
            <div className={"w-full"}>
                <div className={"text-center"}>
                    <Select onChange={(e)=>{
                        connection.update({
                            in: "HardwareSet",
                            set:{
                                accessoriesId:parseInt(e.target.value)
                            },
                            where: {
                                id:el.id
                            }
                        })
                    }}>
                        {dataAccessories.filter((f)=>f.id === el.accessoriesId).map((elData)=><option value={elData.id} key={elData.id + "select_acs"}>{elData.article}</option>)}
                        {dataAccessories.map((elData)=><option value={elData.id} key={elData.id + "select_acs"}>{elData.article}</option>)}
                    </Select>
                </div>

            </div>
            <div className={"w-full"}>
                <div className={"text-center"}>
                    <TextInput onChange={(e)=>{
                        connection.update({
                            in: "HardwareSet",
                            set:{
                                name:e.target.value
                            },
                            where: {
                                id:el.id
                            }
                        })
                    }} type={"text"} defaultValue={el.name} />
                </div>

            </div>
            <div className={"w-full"}>
                <div className={" text-center"}>
                    <TextInput onChange={(e)=>{
                        connection.update({
                            in: "HardwareSet",
                            set:{
                                count:parseInt(e.target.value)
                            },
                            where: {
                                id:el.id
                            }
                        })

                    }} type={"number"} min={0} defaultValue={parseNan(el.count)} />

                </div>

            </div>
            <div className={"w-full"}>
                <div className={" text-center"}>
                    <TextInput onChange={(e)=>{
                        connection.update({
                            in: "HardwareSet",
                            set:{
                                distance:parseInt(e.target.value)
                            },
                            where: {
                                id:el.id
                            }
                        })

                    }} type={"number"} min={0} defaultValue={parseNan(el.distance)} />

                </div>

            </div>
            <div className={"w-full"}>
                <div className={" text-center"}>
                    <TextInput onChange={(e)=>{
                        connection.update({
                            in: "HardwareSet",
                            set:{
                                indent:parseInt(e.target.value)
                            },
                            where: {
                                id:el.id
                            }
                        })

                    }} type={"number"} min={0} defaultValue={parseNan(el.indent)} />
                </div>

            </div>
        </div>)}
    </>
}