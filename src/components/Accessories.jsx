import {useEffect, useState} from "react";
import {insertTable, remove, select, updateTb} from "../action/index.js";
import {Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput} from "flowbite-react";
import {connection} from "../Db.js";


export default function Accessories() {

    const price = [
        {name: "Без цвета", type: "noColor"},
        {name: "Белый", type: "white"},
        {name: "Двусторонняя ламинация", type: "both_sides"},
        {name: "Наружная ламинация", type: "outside"},
        {name: "Внутренняя ламинация", type: "inside"},
    ]
    let defaultValue = {
        article: "",
        name: "",
        category: "",
        width: 0,
        dearth: 0,
        grooveOffset: 0,
        unit: "мм",
        noColor: 0,
        white: 0,
        both_sides: 0,
        outside: 0,
        inside: 0,
        manufacturer: ""
    }
    const [value, setValue] = useState(defaultValue);
    // const [updateValue, setUpdateValue] = useState(defaultValue);
    const [list, setList] = useState([{}]);
    const [listCategory, setListCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [element, setElement] = useState({id: 0, name: ""});
    const [update, setUpdate] = useState(false);

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

    const selectData = ["мм", "шт", "м"]
    const uniqueCategory = Array.from(
        new Map(list.map(el => [el.category, el])).values()
    );
    return <>
        <div className={"flex justify-end hidden"}>
            <Button onClick={() => {
                setOpen(true)
                setValue(defaultValue)
            }} className={"w-[100px] p-2  text-white cursor-pointer hover:bg-blue-600 bg-blue-300 text-center"}>
                Добавить
            </Button>
        </div>
        <div className={"flex justify-between text-white mb-6 pt-6"}>
            <div className={"w-1/2 mx-4 shadow-2xl"}>
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
                    {uniqueCategory.filter((el)=>el.category).map((el)=> <div onClick={()=>{
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
            <div className={"w-full"}>
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
                        {list.filter((f)=>f.category === listCategory || listCategory === "all").filter((sh)=>sh.article.match(new RegExp(search, "g"))).map((item, index) => <tr onClick={() => {
                            setOpen(true)
                            setUpdate(true)
                            setElement({id: item.id, name: item.name})
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
                                setOpenModal(true)
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
                    <div className={"p-4"}>
                        <Button onClick={()=>{
                            setValue(defaultValue)
                            if(element.id === value.id)return
                            insertTable("Accessories", value)
                        }} color={"blue"}>
                            Добавить новый артикул
                        </Button>

                    </div>
                </div>
            </div>
            <div className={"w-1/2 mx-4 shadow-2xl"}>
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
        {/* <table className={"absolute hidden m-auto bg-amber-50 w-1/3 h-auto top-[100px] border-5 border-amber-100 left-0 right-0"}>
            <tbody>
            <tr>
                <td className={"p-2 text-center"}>
                    <label>
                        <div className={"text-start"}>Артикул</div>
                        <div className={"text-start"}><input name={"article"} defaultValue={value.article}
                                                             onChange={handleChange}
                                                             placeholder={"Артикул"} type={"text"}
                                                             className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                    <label>
                        <div className={"text-start"}>Название</div>
                        <div className={"text-start"}><input name={"name"} defaultValue={value.name}
                                                             onChange={handleChange} placeholder={"Название"}
                                                             type={"text"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
                <td className={"p-2 text-center w-[100px]"}>
                    <label>
                        <div className={"text-start"}>Ширина</div>
                        <div className={"text-start"}><input name={"width"} onChange={handleChange}
                                                             defaultValue={value.width} type={"number"}
                                                             className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                    <label>
                        <div className={"text-start"}>Глубина</div>
                        <div className={"text-start"}><input name={"dearth"} onChange={handleChange}
                                                             defaultValue={value.dearth} type={"number"}
                                                             className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"px-2"}>
                    <div>Расстояние до фурнитурного паза</div>
                </td>
                <td className={"p-2 text-center w-[100px]"}>
                    <label>
                        <div className={"text-start"}><input name={"grooveOffset"} onChange={handleChange}
                                                             defaultValue={value.grooveOffset} type={"number"}
                                                             className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"px-2"}>
                    <div>Единица измерения</div>
                </td>
                <td>
                    <label>
                        <div className={"text-center"}>
                            <Select name={"unit"} onChange={handleChange}>
                                {selectData.filter((el) => el === value.unit).map((el, i) => <option
                                    key={i + "unit_def"} value={el}>{el}.</option>)}
                                {selectData.filter((el) => el).map((el, i) => <option key={i + "unit_"}
                                                                                      value={el}>{el}.</option>)}
                            </Select>
                        </div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"font-bold p-2"}>Цена</td>
            </tr>
            {price.map((elem, index) => <tr key={index + elem.name}>
                <td className={"p-2"}>
                    <div className={"text-start"}>
                        <label className={"flex gap-2"}>
                            <div className={"w-full"}>
                                {elem.name}
                            </div>
                            <div>
                                <input name={elem.type} onChange={handleChange}
                                       defaultValue={[value.noColor, value.white, value.both_sides, value.outside, value.inside][index]}
                                       type={"number"} className={"bg-gray-200 w-[100px] px-2 self-center flex"}/>
                            </div>
                        </label>
                    </div>
                </td>
                <td className={"flex justify-center"}>
                    <svg className={"flex self-center"} width="20" viewBox="0 0 300 300" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="M10.2767 0.0443742C11.4993 0 13.0282 0 15 0L30 0L30 267L0 267L0 15C0 10.6108 0 8.41616 0.489433 6.90983Q0.671671 6.34896 0.918567 5.8134Q1.16546 5.27784 1.4736 4.77501Q1.78173 4.27219 2.14683 3.80906Q2.51193 3.34594 2.92893 2.92893Q3.34593 2.51193 3.80906 2.14683Q4.27219 1.78173 4.77501 1.4736Q5.27784 1.16547 5.8134 0.918569Q6.34896 0.671673 6.90983 0.489436C7.73946 0.219874 8.77786 0.0987762 10.2767 0.0443742L10.2767 0.0443742Z"
                                fill="#000000" transform="translate(57 0)"/>
                            <rect width="87" height="30" fill="#000000" fillRule="evenodd" transform="translate(87 0)"/>
                            <path
                                d="M0 29.999L0 0C0 0 52.6011 3.06455 54.0001 65.3893C55.3991 127.714 0 136 0 136L0 106C0 106 26.8859 97.3217 26.0001 65.3893C25.1143 33.4569 0 29.999 0 29.999Z"
                                fill="#000000" fillRule="evenodd" transform="translate(173 0)"/>
                            <rect width="174" height="30" fill="#000000" fillRule="evenodd"
                                  transform="translate(0 106)"/>
                            <rect width="174" height="30" fill="#000000" fillRule="evenodd"
                                  transform="translate(0 169)"/>
                        </g>
                    </svg>
                </td>
            </tr>)}
            <tr>
                <td className={"flex justify-end p-2 gap-x-4"}>
                    {update ? <Button onClick={() => {
                        remove("Accessories", element.id)
                        setOpen(false)
                        setUpdate(false)
                    }}
                                      className={"bg-blue-300 text-gray-900 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Удалить
                    </Button> : ""}
                    <Button type={"submit"} onClick={() => {
                        if (value.article === "" || value.name === "") return;
                        if (update) {
                            updateTb("Accessories", value, element.id)
                        } else {
                            insertTable("Accessories", value)
                        }
                        setSave(true)
                        setOpen(false)
                        setUpdate(false)
                    }}
                            className={"bg-blue-300 text-gray-900 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Сохранить
                    </Button>

                </td>
                <td className={"p-2"}>
                    <Button onClick={() => {
                        setOpen(false)
                        setUpdate(false)
                    }}
                            className={"bg-blue-300 text-gray-900 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Закрыть
                    </Button>
                </td>
            </tr>
            </tbody>
        </table>*/}


        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <ModalHeader/>
            <ModalBody>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
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