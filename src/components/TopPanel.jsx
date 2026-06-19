import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput} from "flowbite-react";
import {exportSvgToBase64, insertTable, updateTb} from "../action/index.js";
import {setPageList} from "../features/pageList.js";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setTree} from "../features/tree.js";
import {
    setWindowArticle,
    setWindowCategory,
    setWindowColor, setWindowImpostId, setWindowImpostProfileRemove,
    setWindowName, setWindowSashRemove, setWindowShouldRemove,
    setWindowSystem
} from "../features/windows.js";
import {setWindowWidth} from "../features/windowWidth.js";
import {setWindowHeight} from "../features/windowHeight.js";
import {setFrameId} from "../features/frameId.js";
import {setSashId} from "../features/sashId.js";
import {setShtulpId} from "../features/shtulpId.js";
import {setCompletionId} from "../features/completion.js";
import {setPage} from "../features/page.js";


export default function TopPanel(){
    const dispatch = useDispatch();
    const pageList = useSelector(state => state.pageList.value)
    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const frameId = useSelector((state) => state.frameId.value);
    const sashId = useSelector((state) => state.sashId.value);
    const shtulpId = useSelector((state) => state.shtulpId.value);
    const completion = useSelector((state) => state.completion.value);
    const hardware = useSelector((state) => state.hardware.value);
    const tree = useSelector(state => state.tree.value);
    const windows = useSelector(state => state.windows.value);




    const [openModal, setOpenModal] = useState(false);
    const [save, setSave] = useState(false);

    let defaultValue = {
        article: windows.article,
        name: windows.name,
        category: windows.category,
        system: windows.system,
        width: windowWidth,
        height: windowHeight,
        color: windows.color,
        frameId: frameId,
        sashId: sashId,
        impostId:windows.impostId,
        shtulpId: shtulpId,
        fillingId: completion.id,
        hardwareId: hardware.id,
        accessories: windows.accessories,
        price: windows.price,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: windows.image,
        tree: tree,
        count: windows.count,
    }



    const [value, setValue] = useState(defaultValue);
    const handleChange = (e) => {
        const {name, value, type} = e.target;
        setValue((prevState) => ({
            ...prevState, [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    return <>
        <div className={" bg-gray-950 justify-between flex h-15 z-20 relative text-gray-50"}>
            <div onClick={() => {dispatch(setPageList(""));dispatch(setPage("Главная"))}} className={"border-r-2 hover:bg-gray-800 border-gray-500 cursor-pointer w-1/2 flex justify-center " + `${pageList === "" ? "bg-gray-800" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     className="bi bi-house-door-fill p-2" viewBox="0 0 16 16">
                    <path
                        d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                </svg>
            </div>
            <div onClick={() => {
                dispatch(setPageList("new-project"));
                dispatch(setTree({ id: 'root', type: 'glass'}));
                dispatch(setWindowArticle(""));
                dispatch(setWindowName(""));
                dispatch(setWindowCategory(""));
                dispatch(setWindowSystem(""));
                dispatch(setWindowSystem(""));
                dispatch(setWindowColor(1));
                dispatch(setWindowWidth(1500));
                dispatch(setWindowHeight(1500));
                dispatch(setFrameId(1));
                dispatch(setSashId(1));
                dispatch(setShtulpId(1));
                dispatch(setWindowImpostId(1));
                dispatch(setCompletionId(1));
                dispatch(setPage("Главная"));
                dispatch(setWindowSashRemove("remove"))
                dispatch(setWindowImpostProfileRemove("remove"))
                dispatch(setWindowShouldRemove("remove"))
            }} className={"border-r-2 hover:bg-gray-800 border-gray-500 cursor-pointer w-1/2 flex justify-center " + `${pageList === "new-project" ? "bg-gray-800" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     className="bi bi-plus-lg p-2" viewBox="0 0 16 16">
                <path fillRule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </div>
            <div onClick={()=>{dispatch(setPageList("saved-project"));dispatch(setPage("Главная"))}} className={"border-r-2 hover:bg-gray-800 border-gray-500 cursor-pointer w-1/2 flex justify-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     className="bi bi-folder-fill p-2" viewBox="0 0 16 16">
                    <path
                        d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                </svg>
            </div>
            <div onClick={()=>{dispatch(setPageList("bd-settings"));dispatch(setPage("Главная"))}} className={"border-r-2 hover:bg-gray-800 border-gray-500 cursor-pointer w-1/2 flex justify-center" + `${pageList === "bd-settings"?" bg-gray-800 ":""}`}>
                <svg  className={"p-2"} viewBox="0 0 89 81" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1 0.5)">
                        <line x1="0" y1="0" x2="0" y2="40" fill="#cccccc" strokeWidth="2" stroke="#808080" strokeLinecap="round" strokeLinejoin="bevel" transform="translate(0 20)" />
                        <line x1="0" y1="0" x2="0" y2="40" fill="#cccccc" strokeWidth="2" stroke="#808080" strokeLinecap="round" strokeLinejoin="bevel" transform="translate(87 20)" />
                        <path d="M0 20C0 8.9543 19.5875 0 43.75 0C67.9125 0 87.5 8.9543 87.5 20C87.5 31.0457 67.9125 40 43.75 40C19.5875 40 0 31.0457 0 20Z" fill="currentColor" fillRule="evenodd" strokeWidth="1" transform="translate(0 40)" />
                        <path d="M0 20C0 8.9543 19.5875 0 43.75 0C67.9125 0 87.5 8.9543 87.5 20C87.5 31.0457 67.9125 40 43.75 40C19.5875 40 0 31.0457 0 20Z" fill="currentColor" fillRule="evenodd" strokeWidth="1"  transform="translate(0 20)" />
                        <path d="M0 20C0 8.9543 19.5875 0 43.75 0C67.9125 0 87.5 8.9543 87.5 20C87.5 31.0457 67.9125 40 43.75 40C19.5875 40 0 31.0457 0 20Z" fill="currentColor" fillRule="evenodd" strokeWidth="1"  />
                    </g>
                </svg>
            </div>
            <div onClick={()=>{dispatch(setPageList("saved-project"));dispatch(setPage("Главная"))}} className={"hover:bg-gray-800 cursor-pointer w-1/2 flex justify-center"}>
                <svg  className={"p-2"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z" fill="none" strokeWidth="2" stroke="#FFFFFF" transform="translate(9 9)" />
                        <path d="M18.4 14C18.1277 14.6171 18.2583 15.3378 18.73 15.82C18.73 15.82 18.79 15.88 18.79 15.88C19.2958 16.3855 19.4935 17.1224 19.3085 17.8132C19.1235 18.5039 18.5839 19.0435 17.8932 19.2285C17.2024 19.4135 16.4655 19.2158 15.96 18.71C15.96 18.71 15.9 18.65 15.9 18.65C15.4178 18.1783 14.6971 18.0476 14.08 18.32C13.4755 18.5791 13.0826 19.1724 13.08 19.83C13.08 19.83 13.08 20 13.08 20C13.08 21.1046 12.1846 22 11.08 22C9.97543 22 9.08 21.1046 9.08 20C9.08 20 9.08 19.91 9.08 19.91C9.06415 19.2327 8.63587 18.6339 8 18.4C7.38291 18.1277 6.66218 18.2583 6.18 18.73C6.18 18.73 6.12 18.79 6.12 18.79C5.61453 19.2958 4.87755 19.4935 4.18681 19.3085C3.49606 19.1235 2.95652 18.5839 2.77152 17.8932C2.58652 17.2024 2.78418 16.4655 3.29 15.96C3.29 15.96 3.35 15.9 3.35 15.9C3.82166 15.4178 3.95234 14.6971 3.68 14.08C3.42093 13.4755 2.82764 13.0826 2.17 13.08C2.17 13.08 2 13.08 2 13.08C0.89543 13.08 0 12.1846 0 11.08C1.19209e-07 9.97543 0.895431 9.08 2 9.08C2 9.08 2.09 9.08 2.09 9.08C2.76733 9.06415 3.36613 8.63587 3.6 8C3.87235 7.38291 3.74167 6.66219 3.27 6.18C3.27 6.18 3.21 6.12 3.21 6.12C2.70418 5.61453 2.50653 4.87756 2.69153 4.18681C2.87653 3.49606 3.41606 2.95653 4.10681 2.77153C4.79756 2.58653 5.53453 2.78418 6.04 3.29C6.04 3.29 6.1 3.35 6.1 3.35C6.58219 3.82167 7.30291 3.95235 7.92 3.68C7.92 3.68 8 3.68 8 3.68C8.60447 3.42093 8.99738 2.82764 9 2.17C9 2.17 9 2 9 2C9 0.89543 9.89543 0 11 0C12.1046 0 13 0.895431 13 2C13 2 13 2.09 13 2.09C13.0026 2.74761 13.3955 3.34091 14 3.59999C14.6171 3.87233 15.3378 3.74165 15.82 3.26999C15.82 3.26999 15.88 3.20999 15.88 3.20999C16.3854 2.70416 17.1224 2.50651 17.8132 2.69151C18.5039 2.87651 19.0434 3.41605 19.2284 4.1068C19.4134 4.79754 19.2158 5.53451 18.71 6.03999C18.71 6.03999 18.65 6.09999 18.65 6.09999C18.1783 6.58217 18.0476 7.3029 18.32 7.91999C18.32 7.91999 18.32 8 18.32 8C18.579 8.60447 19.1723 8.99738 19.83 9C19.83 9 20 9 20 9C21.1046 9 22 9.89543 22 11C22 12.1046 21.1046 13 20 13C20 13 19.91 13 19.91 13C19.2524 13.0026 18.6591 13.3955 18.4 14C18.4 14 18.4 14 18.4 14Z" fill="none" strokeWidth="2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 1)" />
                    </g>
                </svg>
            </div>

            {pageList === "new-project" || pageList === "update-project" ?<div className={"cursor-pointer hidden border-l-2 border-gray-500 w-1/2 sm:flex justify-center"}>
                <Button className={"self-center"} onClick={() => {
                    setOpenModal(true)
                    setSave(false)
                    setValue({...defaultValue,image:exportSvgToBase64(document.querySelector("#window-project"))})
                }}>
                    Сохранить
                </Button>
            </div>:""}
        </div>
       <div>
           {pageList === "new-project" || pageList === "update-project" ?<div className={"p-2 cursor-pointer border-gray-500 w-full sm:hidden justify-center"}>
               <div className={"flex justify-between gap-2 ml-[-60px]"}>
                   <div className={"flex self-center bg-gray-950 p-2 rounded"}>
                       Параметры
                   </div>
                   <div className={"flex self-center bg-gray-950 p-2 rounded"}  >
                       Спецификации
                   </div>
                   <div>
                       <Button onClick={() => {
                           setOpenModal(true)
                           setSave(false)

                           setValue({...defaultValue,image:exportSvgToBase64(document.querySelector("#window-project"))})
                       }}>
                           Сохранить
                       </Button>
                   </div>
               </div>

       </div>:""}
       </div>
        <Modal show={openModal} size="3xl" onClose={() => setOpenModal(false)} popup>
            <ModalHeader>
                <div className={"text-2xl p-4"}>Настройки Окна</div>
            </ModalHeader>
            <ModalBody>
                <div className={"p-4 grid grid-cols-2 gap-4"}>
                    <div>
                        <Label className={"text-gray-50 pl-4 text-xl"} htmlFor={"name"}>Название</Label>
                        <TextInput onChange={handleChange} value={value.name} name={"name"} id={"name"} color={`${save && !value.name?"failure":"myColor"}`} type={"text"}/>
                    </div>
                    <div>
                        <Label className={"text-gray-50 pl-4 text-xl"} htmlFor={"article"}>Конфигурация</Label>
                        <TextInput onChange={handleChange} value={value.article} name={"article"} id={"article"} color={`${save && !value.article?"failure":"myColor"}`} type={"text"}/>
                    </div>
                    <div>
                        <Label className={"text-gray-50 pl-4 text-xl"} htmlFor={"system"}>Система</Label>
                        <TextInput onChange={handleChange} value={value.system} name={"system"} id={"system"} color={`${save && !value.system?"failure":"myColor"}`} type={"text"}/>
                    </div>
                    <div>
                        <Label className={"text-gray-50 pl-4 text-xl"} htmlFor={"category"}>Категория</Label>
                        <TextInput onChange={handleChange} value={value.category} name={"category"} id={"category"} color={`${save && !value.category?"failure":"myColor"}`} type={"text"}/>
                    </div>
                    <div>
                        <Label className={"text-gray-50 pl-4 text-xl"} htmlFor={"count"}>Количество</Label>
                        <TextInput onChange={handleChange} value={value.count} name={"count"} id={"count"} color={`${save && !value.category?"failure":"myColor"}`} type={"number"}/>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className={"flex w-full justify-between"}>
                    <div className={"text-gray-400"}>Все поля обязательны к заполнению</div>
                    <div className={"flex gap-4"}>
                        <div className={"flex"}>
                            <Button onClick={()=>{
                                if(value.name && value.category && value.article && value.article) {
                                    if(pageList === "new-project") {
                                        insertTable("Window",value)
                                    }
                                    if(pageList === "update-project"){
                                        updateTb("Window",value,windows.id)
                                    }
                                    setOpenModal(false)
                                }

                                setSave(true)
                            }}>Да</Button>
                        </div>
                        <div className={"flex"}>
                            <Button onClick={()=>{
                                setOpenModal(false)
                            }}>Нет</Button>
                        </div>
                    </div>

                </div>
            </ModalFooter>
        </Modal>
    </>
}