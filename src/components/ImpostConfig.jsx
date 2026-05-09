import {useDispatch, useSelector} from "react-redux";
import {setImpostConfigOpen} from "../features/impostConfigOpen.js";
import {setImpostPosition} from "../features/ImpostPosition.js";
import {setTree} from "../features/tree.js";

export default function ImpostConfig({impostWidth = 120}){
    const position = useSelector((state)=>state.impostPosition.value)
    const tree = useSelector(state => state.tree.value);
    const node = useSelector(state => state.node.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const dispatch = useDispatch()
    return (
        <div className={"fixed top-0 left-0 right-0 bottom-0 w-[400px] h-[200px] m-auto bg-white"}>
           <div>
               <h1 className={"text-center p-2 text-2xl"}>Импост</h1>
               <div className={"flex p-4 w-full h-5 mt-5 justify-center"}>
                   <div className={"p-2 text-2xl self-center"}>{node.splitType === 'vertical'?"X":"Y"}</div>
                   <div className={"p-2 self-center"}><input defaultValue={position}  onChange={(e)=>dispatch(setImpostPosition(e.target.value))} className={"bg-blue-300 p-2"} type={"number"}/></div>
               </div>
           </div>
            <div className={"flex gap-4 justify-center mt-6"}>
                <div onClick={()=> {
                    if (node === 'root') return;

                    const updateTree = (current) => {
                        // Если этот узел — тот самый split, который мы хотим удалить
                        if (current.id === node.id && current.type === 'split') {
                            return {
                                id: Math.random(),
                                type: 'glass'
                            };
                        }

                        // Если нет, идем глубже по дереву
                        if (current.type === 'split') {
                            return {
                                ...current,
                                child1: updateTree(current.child1),
                                child2: updateTree(current.child2)
                            };
                        }
                        return current;
                    };
                    dispatch(setTree(updateTree(tree)));
                }}  className={"p-2 justify-center cursor-pointer hover:bg-blue-400 bg-blue-300 h-[40px] self-center flex w-[100px]"}>
                    Удалить
                </div>
                <div onClick={()=> {
                    const isVert = node.splitType === 'vertical';
                    const totalSpace = isVert ? (node.w - impostWidth) : (node.h - impostWidth);
                    if (isNaN(position) || position === 0) return;
                    const updateTree = (current) => {
                        if (current.id === node.id) {
                            const nextRatio = (position) / totalSpace;
                            return { ...current, ratio: nextRatio };
                        }
                        return current.type === 'split'
                            ? { ...current, child1: updateTree(current.child1), child2: updateTree(current.child2) }
                            : current;
                    };
                    dispatch(setTree(updateTree(tree)));
                }}  className={"p-2 justify-center cursor-pointer hover:bg-blue-400 bg-blue-300 h-[40px] self-center flex w-[100px]"}>
                    Применить
                </div>
                <div onClick={()=> {
                    dispatch(setImpostConfigOpen(false))
                }}  className={"p-2 justify-center cursor-pointer hover:bg-blue-400 bg-blue-300 h-[40px] self-center flex w-[100px]"}>
                    Закрыть
                </div>
            </div>

        </div>
    )
}