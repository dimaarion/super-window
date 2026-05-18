import {Button, Select, TextInput} from "flowbite-react";
import {insertTable, select} from "../action/index.js";
import {useEffect, useState} from "react";
import {connection} from "../Db.js";


export default function ColorForm(){

    let defaultValue = {
        name: "",
        type:"",
        color:""
    }
    const [value, setValue] = useState(defaultValue);
    const[colors,setColors]=useState([{}]);
    const typeColors = [
        {type:"both_sides",name:'Двойная ламинация'},
        {type:"outside",name:'Наружная ламинация'},
        {type:"inside",name:'Внутренняя ламинация'}
    ];

    useEffect(()=>{
        select('Colors').then((res)=>{
            setColors(res)
        })
    },[colors])

    const handleChange = (e) => {
        const {name, value, type, attributes} = e.target;
        connection.update({
            in: "Colors",
            set:{
                [name]:type === 'number'?parseFloat(e.target.value) : e.target.value
            },
            where: {
                id:parseInt(attributes["data-id"].value)
            }
        })
        setValue((prevState) => ({
            ...prevState, [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };
    return <>
        <div className={"min-h-[500px] pt-6"}>
            <div className={"flex items-center justify-center gap-4 text-gray-50"}>
                <div className={"container grid grid-cols-4 gap-2 bg-gray-700 text-center p-2"}>
                    <div>
                        <h3>№</h3>
                    </div>
                    <div>
                        <h3>Цвет</h3>
                    </div>
                    <div>
                        <h3>Название</h3>
                    </div>
                    <div>
                        <h3>Ламинация</h3>
                    </div>
                </div>
            </div>
            {colors?.map((item,index)=><div key={item.id + "colors"} className={"flex items-center justify-center gap-4 text-gray-50"}>
                <div className={"container grid grid-cols-4 gap-2 text-center p-2"}>
                    <div>
                        <h3>{index + 1}</h3>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <div className={"w-[200px]"}>
                            <TextInput onChange={handleChange} data-id={item.id} type={"color"} name={"color"} defaultValue={item.color} colorspace="display-p3" color={"myColor"}  />
                        </div>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <div className={"w-[200px]"}>
                            <TextInput onChange={handleChange} data-id={item.id} type={"text"} name={"name"} defaultValue={item.name} colorspace="display-p3" color={"myColor"}  />
                        </div>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <div className={"w-[200px]"}>
                            <Select onChange={handleChange} data-id={item.id} name={"type"} defaultValue={item.type} color={"myColor"}>
                                {typeColors.map((color,index)=><option value={color.type} key={index + 'type-colors'}>{color.name}</option>)}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>)}
            <div className={"mt-6"}>
                <Button onClick={()=>{
                    insertTable('Colors',{name:'',type:'',color:''})
                }}>
                    Новый цвет
                </Button>
            </div>
        </div>

    </>
}