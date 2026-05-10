import {useEffect, useState} from "react";
import {connection} from "../Db.js";
import {useDispatch} from "react-redux";
import {setWindowColor} from "../features/windowColor.js";

export default function ColorSelect(){
    const [colors, setColors] = useState([{}]);
    useEffect(() => {

        connection.select({
            from: "Colors"
        }).then((result) => {
            setColors(result);
        });

    }, []);

    const dispatch = useDispatch()
    return (
        <select onChange={(e)=>{
            dispatch(setWindowColor(e.target.value));
        }} className={"bg-amber-50 p-2"} >
            {colors.map((color, index) => <option key={index + color.name} value={color.color}>{color.name}</option>)}
        </select>
    )
}