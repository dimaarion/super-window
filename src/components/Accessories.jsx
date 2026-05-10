import {useCallback, useEffect, useState} from "react";
import {insertTable, select} from "../action/index.js";

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
    const [list, setList] = useState([{}]);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setValue((prevState) => ({
            ...prevState,
            // Если тип инпута number, преобразуем строку в число
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    useEffect(() => {
        select("Accessories").then((res) => {
            setList(res)
        })
    }, []);
    const [, updateState] = useState();
    useCallback(() => updateState({}), []);

    return <>
        <div className={"flex justify-end"}>
            <div onClick={()=>setOpen(true)} className={"w-[100px] p-2 cursor-pointer hover:bg-blue-400 bg-blue-300 text-center m-6"}>
                Добавить
            </div>
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
                {list.map((item, index) => <tr className={"cursor-pointer hover:bg-blue-100"} key={index + item.id + item.article}>
                    <td className={"p-2 text-center"}>{item.id}</td>
                    <td className={"p-2 text-start"}>{item.article}</td>
                    <td className={"p-2 text-start"}>{item.name}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
        {open?<table className={"fixed m-auto bg-amber-50 w-1/3 h-auto top-[100px]  left-0 right-0"}>
            <tbody>
            <tr>
                <td className={"p-2 text-center"}>
                    <label>
                        <div className={"text-start"}>Артикул</div>
                        <div className={"text-start"}><input name={"article"} onChange={handleChange} placeholder={"Артикул"} type={"text"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                    <label>
                        <div className={"text-start"}>Название</div>
                        <div className={"text-start"}><input name={"name"} onChange={handleChange} placeholder={"Название"} type={"text"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
                <td className={"p-2 text-center w-[100px]"}>
                    <label>
                        <div className={"text-start"}>Ширина</div>
                        <div className={"text-start"}><input name={"width"} onChange={handleChange} defaultValue={0} type={"number"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                    <label>
                        <div className={"text-start"}>Глубина</div>
                        <div className={"text-start"}><input name={"dearth"} onChange={handleChange} defaultValue={0} type={"number"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"px-2"}> <div>Расстояние до фурнитурного паза</div></td>
                <td className={"p-2 text-center w-[100px]"}>
                    <label>
                        <div className={"text-start"}><input name={"grooveOffset"} onChange={handleChange} defaultValue={0} type={"number"} className={"bg-gray-200 w-full px-2"}/></div>
                    </label>
                </td>
            </tr>
            <tr>
                <td className={"px-2"}><div>Единица измерения</div></td>
                <td>
                    <label>
                        <div className={"text-center"}>
                            <select name={"unit"} onChange={handleChange}>
                                <option>мм.</option>
                                <option>шт.</option>
                                <option>м.</option>
                            </select>
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
                                <input name={elem.type} onChange={handleChange} defaultValue={0} type={"number"} className={"bg-gray-200 w-[100px] px-2 self-center flex"}/>
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
                <td className={"flex justify-end p-2"}>
                    <div onClick={()=>{
                        if(value.article === "" || value.name === "")return;
                        insertTable("Accessories",value)
                        setOpen(false)
                    }} className={"bg-blue-300 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Сохранить
                    </div>

                </td>
                <td className={"p-2"}>
                    <div onClick={()=>{
                        setOpen(false)
                    }} className={"bg-blue-300 w-[100px] p-2 text-center cursor-pointer hover:bg-blue-400"}>
                        Закрыть
                    </div>
                </td>
            </tr>
            </tbody>
        </table>:""}


    </>
}