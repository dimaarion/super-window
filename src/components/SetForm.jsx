import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from "flowbite-react";
import {insertTable, parseNan, select, updateTb} from "../action/index.js";
import {useEffect, useState} from "react";
import {connection} from "../Db.js";
import EditSvg from "./EditSvg.jsx";

export default function SetForm() {
    const defaultValue = {
        name: "",
        accessoriesId: 1,
        count: 1,
        specificationId: [],
        distance: 0,
        indent: 0
    }


    const [data, setData] = useState([{}])
    const [dataAccessories, setAccessoriesData] = useState([{}])
    const [value, setValue] = useState(defaultValue)
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(0);
    const [article, setArticle] = useState("");

    useEffect(() => {
        select("HardwareSet").then((res) => {
            setData(res)
        })
    }, [data]);

    useEffect(() => {
        select("Accessories").then((res) => {
            setAccessoriesData(res)
        })
    }, []);
    return <div className={"pt-6"}>
        <div className={"overflow-auto h-[700px]"}>
            <div className={"flex justify-start bg-gray-900 gap-2 text-gray-50"}>
                <div className={"text-start flex w-1/2 self-center"}>
                    <h1 className={"p-2 flex self-center"}>Список наборов</h1>
                </div>
                <div className={"flex self-center w-full"}>
                    <div className={"p-2 w-full"}>
                        <div className={"relative w-full flex"}>
                            <div
                                className="absolute inset-y-0 z-20 w-full justify-end rounded start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-10 h-4 text-body" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <TextInput placeholder={"По названию"} onChange={(e)=>{
                                setSearch(e.target.value);
                            }} color={"myColor"} className={"w-full"} type={"search"}/>
                        </div>

                    </div>
                </div>
            </div>
        <div className={"justify-center flex "}>
            <div className={"flex w-full justify-center bg-gray-700 shadow-2xl px-6 py-2 text-gray-50"}>
                <div className={"w-full"}>
                    <div className={" text-center"}>Артикул</div>

                </div>
                <div className={"w-full hidden lg:block"}>
                    <div className={" text-center"}>Название</div>

                </div>
                <div className={"w-full hidden lg:block"}>
                    <div className={" text-center"}>Количество</div>

                </div>
                <div className={"w-full hidden lg:block"}>
                    <div className={" text-center"}>Расстояние</div>

                </div>
                <div className={"w-full hidden lg:block"}>
                    <div className={" text-center"}>Отступ</div>

                </div>
            </div>
        </div>
        <div className={"flex justify-center"}>
            <div className={"justify-center px-6 w-full shadow-2xl  pb-4"}>
                {data.filter((sh)=>sh.name?.match(new RegExp(search, "gi"))).map((el) => <div key={el.id + "set"} className={"flex pt-3 border-b-2 border-gray-500 gap-2"}>

                    <div className={"w-full"}>
                        <div className={"text-center"}>
                            <Select color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        accessoriesId: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })
                            }}>
                                {dataAccessories.filter((f) => f.id === el.accessoriesId).map((elData) => <option
                                    value={elData.id} key={elData.id + "select_acs"}>{elData.article}</option>)}
                                {dataAccessories.map((elData) => <option value={elData.id}
                                                                         key={elData.id + "select_acs"}>{elData.article}</option>)}
                            </Select>
                        </div>

                    </div>
                    <div className={"w-full hidden lg:block"}>
                        <div className={"text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        name: e.target.value
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })
                            }} type={"text"} defaultValue={el.name}/>
                        </div>

                    </div>
                    <div className={"w-full hidden lg:block"}>
                        <div className={" text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        count: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })

                            }} type={"number"} min={0} defaultValue={parseNan(el.count)}/>

                        </div>

                    </div>
                    <div className={"w-full hidden lg:block"}>
                        <div className={" text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        distance: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })

                            }} type={"number"} min={0} defaultValue={parseNan(el.distance)}/>

                        </div>

                    </div>
                    <div className={"w-full hidden lg:block"}>
                        <div className={" text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        indent: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })

                            }} type={"number"} min={0} defaultValue={parseNan(el.indent)}/>
                        </div>

                    </div>
                    <div onClick={()=>{
                        setOpenModal(true)
                        setId(el.id)
                        setArticle(el.name)
                    }} className={"text-gray-50 px-2 lg:hidden"}><EditSvg width={40}/></div>
                </div>)}
            </div>
        </div>

        </div>
        <div className={"flex justify-end p-4 mb-6"}>
            <Button onClick={() => {
                setValue(defaultValue)
                insertTable("HardwareSet", value)
            }}>
                Добавить
            </Button>
        </div>

        <Modal show={openModal} size="3xl" onClose={() => setOpenModal(false)}>
            <ModalHeader>{article}</ModalHeader>
            <ModalBody>
                {data.filter((sh)=>sh.name?.match(new RegExp(search, "gi"))).filter((f)=>f.id === id).map((el) => <div key={el.id + "set"} className={"pt-3 border-b-2 border-gray-500 gap-2"}>
                    <div className={"w-full"}>
                        <div className={"text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        name: e.target.value
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })
                            }} type={"text"} defaultValue={el.name}/>
                        </div>

                    </div>
                    <div className={"w-full"}>
                        <div className={" text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        count: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })

                            }} type={"number"} min={0} defaultValue={parseNan(el.count)}/>

                        </div>

                    </div>
                    <div className={"w-full"}>
                        <div className={" text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        distance: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })

                            }} type={"number"} min={0} defaultValue={parseNan(el.distance)}/>

                        </div>

                    </div>
                    <div className={"w-full"}>
                        <div className={" text-center"}>
                            <TextInput color={"myColor"} onChange={(e) => {
                                connection.update({
                                    in: "HardwareSet",
                                    set: {
                                        indent: parseInt(e.target.value)
                                    },
                                    where: {
                                        id: el.id
                                    }
                                })

                            }} type={"number"} min={0} defaultValue={parseNan(el.indent)}/>
                        </div>

                    </div>

                </div>)}
            </ModalBody>
            <ModalFooter>
                <div className={"flex justify-end p-2 w-full cursor-pointer"}>
                    <div className={"w-[100px]"}>
                        <Button onClick={() => {setOpenModal(false) }}>
                            Закрыть
                        </Button>
                    </div>

                </div>
            </ModalFooter>
        </Modal>
    </div>
}