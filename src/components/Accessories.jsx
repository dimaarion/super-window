import {useEffect, useState} from "react";
import {insertTable, remove, select, updateTb} from "../action/index.js";
import { Button, Modal, ModalBody, ModalHeader, Select } from "flowbite-react";



export default function Accessories() {

 const price = [
     {name:"Без цвета",type:"noColor"},
     {name:"Белый",type:"white"},
     {name:"Двусторонняя ламинация",type:"both_sides"},
     {name:"Наружная ламинация",type:"outside"},
     {name:"Внутренняя ламинация",type:"inside"},
 ]
  let  defaultValue = {
      article:"",
      name:"",
      width: 0,
      dearth:0,
      grooveOffset:0,
      unit:"мм",
      noColor:0,
      white:0,
      both_sides:0,
      outside:0,
      inside:0,
      manufacturer:""
  }
    const [value, setValue] = useState(defaultValue);
   // const [updateValue, setUpdateValue] = useState(defaultValue);
    const [list, setList] = useState([{}]);
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [element, setElement] = useState({id:0,name:""});
    const [update, setUpdate] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setValue((prevState) => ({
            ...prevState, [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
    }, [list]);

   const selectData = ["мм","шт","м"]

    return <>
        <div className={"flex justify-end"}>
            <Button  onClick={()=> {
                setOpen(true)
                setValue(defaultValue)
            }} className={"w-[100px] p-2 text-gray-900 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center m-6"}>
                Добавить
            </Button>
        </div>
        <div className={"flex"}>
            <table className={"mx-6 w-full"}>
                <thead>
                <tr className={"bg-blue-300"}>
                    <td className={"p-2 text-center"}>№</td>
                    <td className={"p-2 text-center"}>Артикул</td>
                    <td className={"p-2 text-center"}>Название</td>
                </tr>
                </thead>
                <tbody>
                {list.map((item, index) => <tr onClick={()=>{
                    setOpen(true)
                    setUpdate(true)
                    setElement({id: item.id, name: item.name})
                    setValue({
                        id:item.id,
                        article:item.article,
                        name:item.name,
                        width: item.width,
                        dearth:item.dearth,
                        grooveOffset:item.grooveOffset,
                        unit:item.unit,
                        noColor:item.noColor,
                        white:item.white,
                        both_sides:item.both_sides,
                        outside:item.outside,
                        inside:item.inside,
                        manufacturer:item.manufacturer
                    })
                }} className={"cursor-pointer hover:bg-blue-100"} key={index + item.id + item.article}>
                    <td className={"p-2 text-center"}>{item.id}</td>
                    <td className={"p-2 text-start"}>{item.article}</td>
                    <td className={"p-2 text-start"}>{item.name}</td>
                    <td onClick={() => {
                        setOpenModal(true)
                        setElement({id: item.id, name: item.name})
                    }} className={"hover:bg-blue-400 hidden"}>
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
        </div>
        {open ? <table className={"absolute m-auto bg-amber-50 w-1/3 h-auto top-[100px] border-5 border-amber-100 left-0 right-0"}>
            <tbody>
            <tr>
                <td className={"p-2 text-center"}>
                    <label>
                        <div className={"text-start"}>Артикул</div>
                        <div className={"text-start"}><input name={"article"} defaultValue={value.article}  onChange={handleChange}
                                                             placeholder={"Артикул"} type={"text"}
                                                             className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                    <label>
                        <div className={"text-start"}>Название</div>
                        <div className={"text-start"}><input name={"name"} defaultValue={value.name} onChange={handleChange} placeholder={"Название"} type={"text"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
                <td className={"p-2 text-center w-[100px]"}>
                    <label>
                        <div className={"text-start"}>Ширина</div>
                        <div className={"text-start"}><input name={"width"}  onChange={handleChange} defaultValue={value.width} type={"number"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                    <label>
                        <div className={"text-start"}>Глубина</div>
                        <div className={"text-start"}><input name={"dearth"} onChange={handleChange} defaultValue={value.dearth} type={"number"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"px-2"}> <div>Расстояние до фурнитурного паза</div></td>
                <td className={"p-2 text-center w-[100px]"}>
                    <label>
                        <div className={"text-start"}><input name={"grooveOffset"} onChange={handleChange} defaultValue={value.grooveOffset} type={"number"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"px-2"}><div>Единица измерения</div></td>
                <td>
                    <label>
                        <div className={"text-center"}>
                            <Select name={"unit"} onChange={handleChange}>
                                {selectData.filter((el)=>el === value.unit).map((el,i)=> <option key={i + "unit_def"} value={el}>{el}.</option>)}
                                {selectData.filter((el)=>el).map((el,i)=> <option key={i + "unit_"} value={el}>{el}.</option>)}
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
                                <input name={elem.type} onChange={handleChange} defaultValue={[value.noColor,value.white,value.both_sides,value.outside,value.inside][index]} type={"number"} className={"bg-gray-200 w-[100px] px-2 self-center flex"}/>
                            </div>
                        </label>
                    </div>
                </td>
                <td className={"flex justify-center"}>
                    <svg className={"flex self-center"} width="20" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M10.2767 0.0443742C11.4993 0 13.0282 0 15 0L30 0L30 267L0 267L0 15C0 10.6108 0 8.41616 0.489433 6.90983Q0.671671 6.34896 0.918567 5.8134Q1.16546 5.27784 1.4736 4.77501Q1.78173 4.27219 2.14683 3.80906Q2.51193 3.34594 2.92893 2.92893Q3.34593 2.51193 3.80906 2.14683Q4.27219 1.78173 4.77501 1.4736Q5.27784 1.16547 5.8134 0.918569Q6.34896 0.671673 6.90983 0.489436C7.73946 0.219874 8.77786 0.0987762 10.2767 0.0443742L10.2767 0.0443742Z" fill="#000000" transform="translate(57 0)" />
                            <rect width="87" height="30" fill="#000000" fillRule="evenodd" transform="translate(87 0)" />
                            <path d="M0 29.999L0 0C0 0 52.6011 3.06455 54.0001 65.3893C55.3991 127.714 0 136 0 136L0 106C0 106 26.8859 97.3217 26.0001 65.3893C25.1143 33.4569 0 29.999 0 29.999Z" fill="#000000" fillRule="evenodd" transform="translate(173 0)" />
                            <rect width="174" height="30" fill="#000000" fillRule="evenodd" transform="translate(0 106)" />
                            <rect width="174" height="30" fill="#000000" fillRule="evenodd" transform="translate(0 169)" />
                        </g>
                    </svg>
                </td>
            </tr>)}
            <tr>
                <td className={"flex justify-end p-2 gap-x-4"}>
                    {update?<Button onClick={() => {
                        remove("Accessories", element.id)
                        setOpen(false)
                        setUpdate(false)
                    }}
                             className={"bg-blue-300 text-gray-900 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Удалить
                    </Button>:""}
                    <Button type={"submit"} onClick={()=>{
                        if(value.article === "" || value.name === "")return;
                        if(update){
                            updateTb("Accessories",value,element.id)
                        }else {
                            insertTable("Accessories",value)
                        }
                        setSave(true)
                        setOpen(false)
                        setUpdate(false)
                    }} className={"bg-blue-300 text-gray-900 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Сохранить
                    </Button>

                </td>
                <td className={"p-2"}>
                    <Button onClick={()=>{
                        setOpen(false)
                        setUpdate(false)
                    }} className={"bg-blue-300 text-gray-900 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Закрыть
                    </Button>
                </td>
            </tr>
            </tbody>
        </table>:""}


        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <ModalHeader />
            <ModalBody>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Удалить элемент: {element.name}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="red" onClick={() => {
                            setOpenModal(false)
                            remove("Accessories",element.id)
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