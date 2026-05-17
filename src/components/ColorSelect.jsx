import {useEffect, useState} from "react";
import {connection} from "../Db.js";
import {useDispatch, useSelector} from "react-redux";
import {setWindowColor} from "../features/windowColor.js";
import {Select} from "flowbite-react";

export default function ColorSelect(){
    const [colors, setColors] = useState([{}]);
    const windowColor = useSelector((state) => state.windowColor.value);
    useEffect(() => {

        connection.select({
            from: "Colors"
        }).then((result) => {
            setColors(result);
        });

    }, []);

    const dispatch = useDispatch()
    return (
        <Select color="myColor" value={windowColor} onChange={(e)=>{
            dispatch(setWindowColor(e.target.value));
        }} className={"w-full"} >
            {colors.map((color, index) => <option key={index + color.name} value={color.color}>{color.name}</option>)}
        </Select>
    )
}