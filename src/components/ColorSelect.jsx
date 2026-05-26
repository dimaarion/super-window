import {useEffect, useState} from "react";
import {connection} from "../Db.js";
import {useDispatch, useSelector} from "react-redux";
import {Select} from "flowbite-react";
import {setWindowColor} from "../features/windows.js";

export default function ColorSelect(){
    const [colors, setColors] = useState([{}]);
    const windows = useSelector((state) => state.windows.value);
    useEffect(() => {

        connection.select({
            from: "Colors"
        }).then((result) => {
            setColors(result);
        });

    }, []);

    const dispatch = useDispatch()
    return (
        <Select color="myColor" value={windows.color} onChange={(e)=>{
            dispatch(setWindowColor(e.target.value));
        }} className={"w-full"} >
            {colors.map((color, index) => <option key={index + color.name} value={color.id}>{color.name}</option>)}
        </Select>
    )
}