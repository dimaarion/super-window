import {useEffect} from "react";
import {setWindowImpostProfile} from "../features/windows.js";
import {useDispatch, useSelector} from "react-redux";

export default function ImpostView({id = 0, hp, node, impostWidth,isVert,color,handleImpostClick}){
    const dispatch = useDispatch();
    useEffect(()=>{


    },[node,dispatch, id])
    return  <rect
        x={hp + node.impX} y={hp + node.impY}
        width={isVert ? impostWidth : Math.max(0, node.w)}
        height={isVert ? Math.max(0, node.h): impostWidth}
        fill={color} stroke="#334155" strokeWidth="1"
        className="cursor-move hover:brightness-95 transition-all"
        onClick={(e) => handleImpostClick(e, node)}
    />
}