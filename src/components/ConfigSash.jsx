import {setSashDirection} from "../features/sashDirection.js";
import {useDispatch, useSelector} from "react-redux";
import {setTree} from "../features/tree.js";
import {Button} from "flowbite-react";


export default function ConfigSash({setOpenSashConfig, createSash, config = false}){

    const tree = useSelector(state => state.tree.value);
    const glassId = useSelector((state) => state.glassId.value)
    const dispatch = useDispatch()

    function updateSash(dir) {
        const update = (n) => {
            if (n.id === glassId) return {...n, dir: dir};
            return n.type === 'split' ? {...n, child1: update(n.child1), child2: update(n.child2)} : n;
        };
        dispatch(setTree(update(tree)))
    }

    const dirSashStatus = (node, targetId) => {
        // Если дошли до стекла — проверяем ID
        if (node.type === 'glass') {
            return node.id === targetId ? node.dir : null;
        }

        // Если это узел разделения — ищем в детях
        if (node.type === 'split') {
            const result1 = dirSashStatus(node.child1, targetId);
           if (result1 !== null) return result1;

            const result2 = dirSashStatus(node.child2, targetId);
            if (result2 !== null) return result2;
        }

        return null;
    };
    

    return <>
        <div className={"border-b-2"}>
            <h2 className={"font-bold"}>Фурнитура</h2>
            <div className={"p-2"}>
                <div>
                    <label className={"flex gap-2"}>
                        <div>
                            <input type={"checkbox"} />
                        </div>
                        <div>
                            MACO
                        </div>
                    </label>
                </div>

            </div>
        </div>
        <div>
            <h2 className={"font-bold"}>Направление открывания</h2>
            <div className={"p-2"}>
                <div>
                    <label className={"flex gap-2"}>
                        <div>
                            <input defaultValue={"right"} checked={dirSashStatus(tree,glassId) === "right"}   name={"sash"} onChange={(e)=>{
                                dispatch(setSashDirection(e.target.value))
                                updateSash(e.target.value)
                            }} type={"radio"} />
                        </div>
                        <div>
                            Правое
                        </div>
                    </label>
                </div>
                <div>
                    <label className={"flex gap-2"}>
                        <div>
                            <input checked={dirSashStatus(tree,glassId) === "left"} onChange={(e)=>{
                                dispatch(setSashDirection(e.target.value))
                                updateSash(e.target.value)
                            }} defaultValue={"left"} name={"sash"} type={"radio"} />
                        </div>
                        <div>
                            Левое
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div className={"flex gap-2 justify-end"}>
            {config? <Button onClick={() => {
                setOpenSashConfig(false)
                createSash()
            }} >
                Применить
            </Button>:
                <div className={"flex gap-2"}>
                    <Button onClick={()=>{
                        setOpenSashConfig(false)
                    }} >
                        Применить
                    </Button>
                    <Button onClick={()=>{
                        setOpenSashConfig(false)

                        createSash()
                    }} >
                        Удалить
                    </Button>
                </div>
               }

        </div>
    </>
}