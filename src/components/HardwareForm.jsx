import {Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {insertTable, parseNan, remove, select, updateTb} from "../action/index.js";
import {connection} from "../Db.js";

export default function HardwareForm() {
    const defaultHardware = {
        name: "",
        setId: []
    }


    const [hardwareList, setHardwareList] = useState([{}]);

    const [arrId, setArrId] = useState({id:0,arr:[]});
    const [hardware, setHardware] = useState(defaultHardware);
    const [hardwareSet, setHardwareSet] = useState([{}]);


    const [openModal, setOpenModal] = useState(false);


   /* useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
    }, [setList]);*/

    useEffect(() => {
        select("Hardware").then((res) => {
            setHardwareList(res)
        })
    }, [hardwareList]);


    useEffect(() => {
        if(!arrId.id)return
        console.log(arrId);
        connection.update({
            in: "Hardware",
            set: {
                setId: hardware?.setId,
            },
            where: {
                id: arrId.id,
            }
        });
    }, [hardware,arrId]);

    useEffect(() => {
        connection.select({
            from: "Hardware",
            where: {
                id: 1
            }
        }).then((res)=>{
            const h = res[0]
            setHardware(h)
            setArrId({id:h?.id,arr:h?.setId})
        })
    }, []);

    useEffect(() => {
        select("HardwareSet").then((res) => {
            setHardwareSet(res)
        })
    }, [hardwareSet]);


    return <>
            <div className={"flex justify-center text-gray-50 pt-6 px-4"}>
                <div className={"lg:flex w-full justify-center lg:px-6 gap-4"}>
                    <div className={"lg:w-1/2  shadow-xl shadow-gray-950"}>
                        <div className={"flex justify-between bg-gray-700"}>
                            <div>
                                <h2 className={"text-center p-2"}>Фурнитура</h2>
                            </div>
                            <div onClick={() => {
                                setOpenModal(true)
                            }} data-tooltip="Добавить фурнитуру"
                                 className="group relative flex text-3xl self-center items-center justify-center mt-[-2px] w-10 text-gray-400 cursor-pointer">
                                <span>+</span>
                                <div
                                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
                                    Добавить фурнитуру
                                </div>
                            </div>
                        </div>
                        <div className={"p-3"}>
                            {hardwareList.map((el) => <div onClick={()=>{
                                setArrId({id:el.id,arr:el?.setId})
                                connection.select({
                                    from: "Hardware",
                                    where: {
                                        id: el.id
                                    }
                                }).then((res)=>{
                                    const h = res[0]
                                    setHardware(h)
                                })
                            }} key={el.id + "hardwareList"} className={`flex gap-2 p-2 hover:bg-gray-700 cursor-pointer hover:shadow-lg visible-parent border-b-2 border-gray-500 ${el.id === arrId.id?'bg-gray-700':''}`}>
                                {el.name}
                            </div>)}

                        </div>
                    </div>
                    <div className={"lg:w-1/2  shadow-xl shadow-gray-950"}>
                        <div className={"flex justify-between bg-gray-700"}>
                            <div>
                                <h2 className={"text-center p-2"}>Наборы</h2>
                            </div>
                            <div onClick={() => {
                                let h = hardware?.setId
                                setHardware({name: hardware.name, setId: [...h, 0]})
                            }}
                                 data-tooltip="Добавить набор"
                                 className="group relative flex text-3xl self-center items-center justify-center mt-[-2px] w-10 text-gray-400 cursor-pointer"
                            >+
                                <div
                                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
                                    Добавить набор
                                </div>
                            </div>
                        </div>
                        <div className={"overflow-auto h-[500px] mb-6"}>
                            <div className={"p-3"}>
                                {hardware?.setId?.map((idh, j) => <div key={j} className={"text-start flex px-4"}>
                                    <div>
                                        <Select color={"myColor"} value={idh} onChange={(e) => {
                                            setHardware({
                                                name: hardware.name, setId: hardware?.setId.map((er, g) => {
                                                    if (j === g) {
                                                        er = parseInt(e.target.value)
                                                    }

                                                    return er
                                                })
                                            })

                                        }} className={"w-[190px] mt-2"}>
                                            {hardwareSet.map((set) => <option value={set.id} key={set.id + "opt"}>
                                                {set.name}
                                            </option>)}
                                        </Select>
                                    </div>
                                    <div className={"flex ml-4"}>
                                        <div onClick={()=>{
                                            setHardware({name: hardware.name, setId: hardware.setId.filter((fl,l)=>j !== l)})
                                        }} className={"flex self-center visible-parent  relative cursor-pointer"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="#2b2b2b" fill="none"/>
                                                <line x1="8" y1="8" x2="16" y2="16"/>
                                                <line x1="16" y1="8" x2="8" y2="16"/>
                                            </svg>
                                            <div className={"absolute visible-item text-sm w-auto m-auto z-30 top-[-25px] left-[-20px]"}>Удалить</div>
                                        </div>
                                    </div>
                                </div>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader/>
                <ModalBody>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg">
                            Добавить фурнитуру
                        </h3>
                        <TextInput color={"myColor"} name={"name"} onChange={(e) => {
                            const {name, value, type} = e.target;
                            setHardware((prevState) => ({
                                ...prevState, [name]: type === 'number' ? parseFloat(value) || 0 : value
                            }));
                        }}/>
                        <div className="flex justify-center gap-4 mt-6">
                            <Button color="blue" onClick={() => {
                                setOpenModal(false)
                                insertTable("Hardware", {name: hardware.name, setId: []})
                            }}>
                                Сохранить
                            </Button>
                            <Button color="blue" onClick={() => setOpenModal(false)}>
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
}