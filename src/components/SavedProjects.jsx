import LeftPanel from "./LeftPanel.jsx";
import {useEffect, useState} from "react";
import {select} from "../action/index.js";
import EditSvg from "./EditSvg.jsx";
import DeleteSvg from "./DeleteSvg.jsx";
import {useDispatch} from "react-redux";
import {setTree} from "../features/tree.js";
import {setPageList} from "../features/pageList.js";
import {
    setWindowArticle,
    setWindowCategory,
    setWindowColor,
    setWindowId, setWindowImpostId,
    setWindowName,
    setWindowSystem
} from "../features/windows.js";
import {setWindowWidth} from "../features/windowWidth.js";
import {setWindowHeight} from "../features/windowHeight.js";
import {setFrameId} from "../features/frameId.js";
import {setSashId} from "../features/sashId.js";
import {setShtulpId} from "../features/shtulpId.js";
import {setCompletionId} from "../features/completion.js";

export default function SavedProjects(){
    const dispatch = useDispatch();
    const [project, setProject] = useState([{}]);

    useEffect(() => {
        select("Window").then((result) => {
            setProject(result);
        })
    }, []);

    return <>
        <div className={"flex w-full justify-start gap-8"}>
            <div className={"hidden lg:block"}>
                <LeftPanel/>
            </div>
            <div className={"w-full"}>
                {project.map((el, index) => <div key={el.id + "project"} className={"sm:flex text-gray-50 text-xl p-3"}>
                    <div className={"w-full sm:w-[200px] px-4 border-b-2 pb-2 mb-2 sm:border-r-2 sm:border-b-0 border-gray-400 "}>
                        <img className={"w-full"} src={el.image} alt={el.name} />
                    </div>
                        <div className={"sm:border-r-2 border-gray-400 px-4"}>
                            <div>{el.name}</div>
                            <div>{el.article}</div>
                            <div>{el.system}</div>
                            <div>{el.category}</div>
                            <div><span>{el.width} x {el.height} мм.</span></div>
                            <div>Цена: {el.price}</div>
                        </div>
                    <div className={"flex border-b-2 pb-2 mb-2 sm:border-r-2 sm:border-b-0 border-gray-400 px-4"}>
                        <div className={"self-center flex text-2xl"}>{el.count} шт.</div>
                    </div>
                    <div className={"flex border-b-2 pb-2 mb-2 sm:border-r-2 sm:border-b-0 border-gray-400  px-4"}>
                        <div>
                            <div onClick={()=>{
                                dispatch(setTree(el.tree))
                                dispatch(setPageList("update-project"));
                                dispatch(setWindowId(el.id));
                                dispatch(setWindowArticle(el.article));
                                dispatch(setWindowName(el.name));
                                dispatch(setWindowWidth(el.width));
                                dispatch(setWindowHeight(el.height));
                                dispatch(setWindowCategory(el.category));
                                dispatch(setWindowSystem(el.system));
                                dispatch(setWindowColor(el.color));
                                dispatch(setFrameId(el.frameId));
                                dispatch(setSashId(el.sashId));
                                dispatch(setShtulpId(el.shtulpId));
                                dispatch(setCompletionId(el.fillingId));
                                dispatch(setWindowImpostId(el.impostId));

                            }} className={"flex gap-4 py-2 h-[35px] cursor-pointer"}>
                                <div><EditSvg width={20}/></div>
                                <div className={"flex self-center"}>Редактировать</div>
                            </div>
                            <div className={"flex gap-4 py-2 h-[35px]"}>
                                <div><DeleteSvg width={20}/></div>
                                <div className={"flex self-center"}>Удалить</div>
                            </div>
                        </div>
                    </div>

                </div>)}
            </div>
            <div>

            </div>
        </div>
    </>
}