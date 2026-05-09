import {useDispatch, useSelector} from "react-redux";
import {setConfigListOpen} from "../features/configListOpen.js";
import {setTree} from "../features/tree.js";




export default function ConfigList() {
    const dispatch = useDispatch()
    const impostId = useSelector((state)=>state.impostId.value)
    const tree = useSelector(state => state.tree.value);
    const impostWidth = useSelector(state => state.impostWidth.value);
    const glassId = useSelector((state)=>state.glassId.value)
    const node = useSelector(state => state.node.value);
    function createImpost(type,minSize = 0){
        const updateTree = (node) => {
            if (node.id === impostId) {
                if (type === 'vertical' && node.w < minSize * 2 + impostWidth) return node;
                if (type === 'horizontal' && node.h < minSize * 2 + impostWidth) return node;

                return {
                    id: Math.random(),
                    type: 'split',
                    splitType: type,
                    ratio: 0.5,
                    child1: { id: Math.random(), type: 'glass' },
                    child2: { id: Math.random(), type: 'glass' }
                };
            }
            return node.type === 'split' ? { ...node, child1: updateTree(node.child1), child2: updateTree(node.child2) } : node;
        };
        dispatch(setTree(updateTree(tree))) ;
    }

    function createSash(){
        const update = (n) => {
            if (n.id === glassId) return { ...n, hasSash: !n.hasSash };
            return n.type === 'split' ? { ...n, child1: update(n.child1), child2: update(n.child2) } : n;
        };
        dispatch(setTree(update(tree)))
    }

    const checkSashStatus = (node, targetId) => {
        // Если дошли до стекла — проверяем ID
        if (node.type === 'glass') {
            return node.id === targetId ? node.hasSash : null;
        }

        // Если это узел разделения — ищем в детях
        if (node.type === 'split') {
            const result1 = checkSashStatus(node.child1, targetId);
            if (result1 !== null) return result1;

            const result2 = checkSashStatus(node.child2, targetId);
            if (result2 !== null) return result2;
        }

        return null;
    };
console.log(tree)
    return <div className={"bg-amber-50 w-[300px] h-[500px] m-auto  absolute top-0 bottom-0 right-0 left-0"}>
        <div id={"separation"} className={"p-2 flex gap-2 hover:bg-blue-300 cursor-pointer justify-between border-b-2"}>
            <div>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"/>
                        <rect width="5" height="30" fill="#E61240" fillRule="evenodd" transform="translate(12 0)"/>
                    </g>
                </svg>
            </div>
            <div className={"self-center"}>
                Разделение контура
            </div>
            <div className={"rotate-270"}>
                <svg width="18.335" height="11.852" viewBox="0 0 18.335 11.852" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.16772 0L18.3354 11.8517L0 11.8517L9.16772 0Z" fill="#000000" fillRule="evenodd" transform="matrix(1 0 -0 -1 -0 11.852)" />
                </svg>
            </div>
            <div id={"separation-item"}>
                <div onClick={()=>{
                    createImpost("vertical")
                    dispatch(setConfigListOpen(false))
                }} className={"flex gap-2 justify-start p-2 hover:bg-blue-300 border-b-2"}>
                    <div>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"/>
                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd" transform="translate(12 0)"/>
                            </g>
                        </svg>
                    </div>
                    <div className={"self-center"}>
                        Вертикальный
                    </div>
                </div>
                <div onClick={()=>{
                    createImpost("horizontal")
                    dispatch(setConfigListOpen(false))
                }} className={"flex gap-2 justify-start p-2 hover:bg-blue-300 border-b-2"}>
                    <div>
                        <svg width="30.5" height="30" viewBox="0 0 30.5 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd" transform="translate(0.5 0)" />
                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd" transform="matrix(0 1 -1 0 30 12.5)" />
                            </g>
                        </svg>
                    </div>
                    <div className={"self-center text-start"}>
                        Горизонтальный
                    </div>
                </div>

            </div>
        </div>
        <div  id={"sash"} className={"p-2 flex gap-2 hover:bg-blue-300 cursor-pointer justify-between border-b-2 "}>
            <div>

                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd" transform="translate(0 0)" />
                        <rect width="5" height="30" fill="#E61240" fillRule="evenodd" transform="translate(0 0)" />
                        <rect width="5" height="30" fill="#E61240" fillRule="evenodd" transform="translate(25 0)" />
                        <rect width="30" height="5" fill="#E61240" fillRule="evenodd" transform="translate(0 0)" />
                        <rect width="30" height="5" fill="#E61240" fillRule="evenodd" transform="translate(0 25)" />
                    </g>
                </svg>
            </div>
            <div onClick={()=>{
                dispatch(setConfigListOpen(false))
                createSash()
            }} className={"self-center text-start"}>
                {checkSashStatus(tree,glassId)?"Удалить створку":"Новая створка"}
            </div>
            <div className={"rotate-270"}>
                <svg width="18.335" height="11.852" viewBox="0 0 18.335 11.852" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.16772 0L18.3354 11.8517L0 11.8517L9.16772 0Z" fill="#000000" fillRule="evenodd" transform="matrix(1 0 -0 -1 -0 11.852)" />
                </svg>
            </div>
            <div id={"sash-item"}>
                <div id={"furniture"} className={"flex gap-2 h-[48px] justify-between p-2 hover:bg-blue-300 border-b-2"}>
                    <div className={"self-center"}>
                       Фурнитура
                    </div>
                    <div className={"rotate-270"}>
                        <svg width="18.335" height="11.852" viewBox="0 0 18.335 11.852" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16772 0L18.3354 11.8517L0 11.8517L9.16772 0Z" fill="#000000" fillRule="evenodd" transform="matrix(1 0 -0 -1 -0 11.852)" />
                        </svg>
                    </div>
                    <div id={"furniture-item"} >
                        <div className={"flex justify-start h-[48px] hover:bg-blue-300 border-b-2"}>
                            <label className={"flex gap-2 px-2 cursor-pointer"}>
                                <div className={"self-center flex"}>
                                    <input  type={"checkbox"}/>
                                </div>
                                <div  className={"self-center"}>MACO</div>

                            </label>

                        </div>
                    </div>
                </div>
                <div id={"direction"}  className={"flex gap-2 justify-between  hover:bg-blue-300 border-b-2"}>
                    <div className={"self-center px-2"}>
                        Направление открывания
                    </div>
                    <div className={"rotate-270"}>
                        <svg width="18.335" height="11.852" viewBox="0 0 18.335 11.852" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16772 0L18.3354 11.8517L0 11.8517L9.16772 0Z" fill="#000000" fillRule="evenodd" transform="matrix(1 0 -0 -1 -0 11.852)" />
                        </svg>
                    </div>
                    <div id={"direction-item"}  >
                        <div className={"flex gap-2 justify-between h-[50px] hover:bg-blue-300 border-b-2"}>
                            <div className={"self-center px-2"}>
                                Справа
                            </div>
                        </div>
                        <div className={"flex gap-2 justify-between h-[50px] hover:bg-blue-300 border-b-2"}>
                            <div className={"self-center px-2"}>
                                Слева
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div onClick={()=>{
            dispatch(setConfigListOpen(false))
        }} className={"absolute m-auto right-2 bottom-2 w-[100px] h-[50px] flex justify-center cursor-pointer bg-blue-300 hover:bg-blue-400"}>
            <div className={"flex self-center"}>
                Закрыть
            </div>

        </div>
    </div>
}