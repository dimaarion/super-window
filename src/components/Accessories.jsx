import {useEffect, useState} from "react";
import {insertTable, remove, select} from "../action/index.js";
import {Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput} from "flowbite-react";
import {connection} from "../Db.js";


export default function Accessories() {

    let defaultValue = {
        article: "",
        name: "",
        category: "",
        width: 0,
        dearth: 0,
        grooveOffset: 0,
        unit: "м",
        noColor: 0,
        white: 0,
        both_sides: 0,
        outside: 0,
        inside: 0,
        manufacturer: ""
    }
    const [value, setValue] = useState(defaultValue);
    const [list, setList] = useState([{}]);
    const [listCategory, setListCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [element, setElement] = useState({id: 0, name: ""});


    const handleChange = (e) => {
        const {name, value, type} = e.target;
        if(element.id === 0)return;
        connection.update({
            in: "Accessories",
            set:{
                [name]:type === 'number'?parseFloat(e.target.value) : e.target.value
            },
            where: {
                id:element.id
            }
        })
        setValue((prevState) => ({
            ...prevState, [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
    }, [list]);


    const selectData = ["м","шт","м2"]
    const uniqueCategory = Array.from(
        new Map(list.map(el => [el.category, el])).values()
    );
    return <>
        <div className={"lg:flex justify-between text-white mb-6 pt-6"}>
            <div className={"w-full lg:w-1/2 px-4 shadow-2xl"}>
                <div className={"flex justify-between bg-gray-700"}>
                    <div>
                        <h2 className={"text-center p-2"}>Категории комплектующих</h2>
                    </div>
                    <div
                        data-tooltip="Добавить категорию"
                        className="group relative flex text-3xl self-center items-center justify-center mt-[-2px] w-10 text-gray-400 cursor-pointer"
                    >+
                        <div
                            className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
                            Добавить категорию
                        </div>
                    </div>
                </div>
                <div className={"p-3"}>
                    <div onClick={()=>{
                        setListCategory("all")
                    }} className={`flex gap-2 p-2 hover:bg-gray-700 cursor-pointer hover:shadow-lg visible-parent ${listCategory === "all"?'bg-gray-700':''}`}>
                        <div>
                            <svg className="w-6 h-6 text-gray-50 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m15 19-7-7 7-7"/>
                            </svg>

                        </div>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div>
                                <h5>Все</h5>
                            </div>
                        </div>

                    </div>
                    {uniqueCategory.filter((el)=>el.category).map((el)=> <div key={el.id + "category"} onClick={()=>{
                        setListCategory(el.category)
                    }} className={`flex gap-2 p-2 hover:bg-gray-700 cursor-pointer hover:shadow-lg visible-parent ${listCategory === el.category?'bg-gray-700':''}`}>
                        <div>
                            <svg className="w-6 h-6 text-gray-50 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m15 19-7-7 7-7"/>
                            </svg>

                        </div>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div>
                                <h5>{el.category}</h5>
                            </div>
                        </div>

                    </div>)}
                </div>
            </div>
            <div className={"w-full px-4"}>
                <div className={"flex justify-start bg-gray-900 gap-2"}>
                    <div className={"text-start flex w-1/2 self-center"}>
                        <h1 className={"p-2 flex self-center"}>Список комплектующих</h1>
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
                                <TextInput placeholder={"По артикулу"} onChange={(e)=>{
                                    setSearch(e.target.value);
                                }} color={"myColor"} className={"w-full"} type={"search"}/>
                            </div>

                        </div>
                    </div>
                </div>
                <table className={"w-full"}>
                    <thead>
                    <tr className={"bg-gray-700 "}>
                        <td className={"p-2 text-center"}>№</td>
                        <td className={"p-2 text-center"}>Артикул</td>
                        <td className={"p-2 text-center"}>Название</td>
                    </tr>
                    </thead>
                </table>
                <div className={"w-full max-h-[500px] min-h-[400px] overflow-auto"}>
                    <table className={"w-full mb-6"}>
                        <tbody>
                        {list.filter((f)=>f.category === listCategory || listCategory === "all").filter((sh)=>sh.article?.match(new RegExp(search, "g"))).map((item, index) => <tr onClick={() => {
                            setElement({id: item.id, name: item.article})
                            setValue({
                                id: item.id,
                                article: item.article,
                                name: item.name,
                                category:item.category,
                                width: item.width,
                                dearth: item.dearth,
                                grooveOffset: item.grooveOffset,
                                unit: item.unit,
                                noColor: item.noColor,
                                white: item.white,
                                both_sides: item.both_sides,
                                outside: item.outside,
                                inside: item.inside,
                                manufacturer: item.manufacturer
                            })
                        }} className={`cursor-pointer hover:bg-blue-300 hover:text-gray-900 border-b-2 ${element.id === item.id?'bg-blue-300 text-gray-900': 'border-gray-500'}`}
                                                       key={index + item.id + item.article}>
                            <td className={"p-2 text-center"}>{item.id}</td>
                            <td className={"p-2 text-start"}>{item.article}</td>
                            <td className={"p-2 text-start"}>{item.name}</td>
                            <td onClick={() => {
                                setElement({id: item.id, name: item.name})
                            }} className={"hover:bg-blue-600 hidden"}>
                                <div className={"flex justify-center w-full h-full"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                    </svg>
                                </div>

                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                    <div className={"flex justify-between mx-2"}>
                        <div>
                            <Button onClick={()=>{

                                if(element.id === value.id){
                                    setValue(defaultValue)
                                }else {
                                    insertTable("Accessories", value)
                                }
                            }} color={"blue"}>
                                {element.id === value.id?"Очистить поля":"Добавить новый артикул"}
                            </Button>
                        </div>
                        {element.id === value.id?
                        <div>
                            <Button onClick={()=>{
                                setOpenModal(true)
                            }} color={"blue"}>
                                Удалить артикул
                            </Button>
                        </div>
                            :""}
                    </div>

                </div>
            </div>
            <div className={"w-full lg:w-1/2 px-4 shadow-2xl"}>
                <div className={"flex justify-between bg-gray-700"}>
                    <div>
                        <h2 className={"text-center p-2"}>Детали компонента</h2>
                    </div>
                </div>
                <div className={"p-3 overflow-auto max-h-[700px]"}>
                    <div className={"flex gap-2 p-2  border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor={"article"} className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Артикул</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"article"} onChange={handleChange} id={"article"} color={"myColor"} className={"w-full"} type={"text"}  value={value.article} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="name" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Название</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"name"} onChange={handleChange} value={value.name} id={"name"} color={"myColor"} className={"w-full"} type={"text"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="category" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Категория</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"category"} onChange={handleChange} value={value.category} id={"category"} color={"myColor"} className={"w-full"} type={"text"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="width" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Ширина</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"width"} onChange={handleChange} value={value.width} id={"width"} color={"myColor"} className={"w-full"} type={"number"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="dearth" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Глубина</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"dearth"} onChange={handleChange} value={value.dearth} type={"number"} id={"dearth"} color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="grooveOffset" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Расстояние до фурнитурного паза</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"grooveOffset"} onChange={handleChange} value={value.grooveOffset} id={"grooveOffset"} type={"number"}  color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="unit" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Единица измерения</div>
                                </Label>
                            </div>
                            <div className={"w-1/2"}>
                                <Select name={"unit"} onChange={handleChange} value={value.unit} id={"unit"} className={"w-full"} color={"myColor"}>
                                    {selectData.filter((el) => el).map((el, i) => <option key={i + "unit_"}
                                                                                          value={el}>{el}.</option>)}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className={"p-2 bg-gray-700"}><h2>Цены</h2></div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="noColor" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Без цвета</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"noColor"} onChange={handleChange} value={value.noColor} id={"noColor"} type={"number"}  color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="white" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Белый</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"white"} onChange={handleChange} value={value.white} id={"white"} type={"number"}  color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="both_sides" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Двусторонняя ламинация</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"both_sides"} onChange={handleChange} value={value.both_sides} id={"both_sides"} type={"number"}  color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="outside" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Наружная ламинация</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"outside"} onChange={handleChange} value={value.outside} id={"outside"} type={"number"}  color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex gap-2 p-2 border-gray-500 border-b-2  hover:shadow-lg"}>
                        <div  className={"flex gap-2 justify-between w-full"}>
                            <div className={"w-1/2"}>
                                <Label htmlFor="inside" className={"w-full"}>
                                    <div className={"flex self-center p-2 text-gray-50"}>Внутренняя ламинация</div>
                                </Label>
                            </div>
                            <div>
                                <TextInput name={"inside"} onChange={handleChange} value={value.inside} id={"inside"} type={"number"}  color={"myColor"} className={"w-full"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <Modal  show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <ModalHeader/>
            <ModalBody>
                <div className="text-center">
                    <h3 className={"p-4"}>
                        Удалить элемент: {element.name}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="red" onClick={() => {
                            setOpenModal(false)
                            remove("Accessories", element.id)
                        }}>
                            Да
                        </Button>
                        <Button color="alternative" onClick={() => setOpenModal(false)}>
                            Нет
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    </>
}