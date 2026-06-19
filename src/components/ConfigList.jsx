import {useDispatch, useSelector} from "react-redux";
import {setConfigListOpen} from "../features/configListOpen.js";
import {setTree} from "../features/tree.js";
import {useState} from "react";
import {setSashDirection} from "../features/sashDirection.js";
import ConfigSash from "./ConfigSash.jsx";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "flowbite-react";
import {setWindowImpostProfile, setWindowImpostProfileRemove, setWindowSashRemove} from "../features/windows.js";
import {setStulpOpenConfig} from "../features/shtulpWindows.js";


export default function ConfigList() {
    const dispatch = useDispatch()
    const impostId = useSelector((state) => state.impostId.value)
    const tree = useSelector(state => state.tree.value);
    const impostWidth = useSelector(state => state.impostWidth.value);
    const glassId = useSelector((state) => state.glassId.value)
    const sashDirection = useSelector(state => state.sashDirection.value);
    const configOpen = useSelector(state => state.configListOpen.value);
    const shtulpConfig = useSelector(state => state.shtulpWindows.value);

    const [openSashConfig, setOpenSashConfig] = useState(false);
    const [openSashConfigUpdate, setOpenSashConfigUpdate] = useState(false);
    const [openImpostConfig, setOpenImpostConfig] = useState(false);
    const [openShtulpConfig, setOpenShtulpConfig] = useState(false);
    const [activeSide, setActiveSide] = useState("left");
    const [activeDir, setActiveDir] = useState("tiltTurn");

   function removeSash(){
        const resetNode = (node) => {
            if (node.id === glassId) {
                const { hasSash, isStulp, activeSide, activeDir, passiveDir, ...rest } = node;
                return { ...rest, hasSash: false, isStulp: false };
            }
            if (node.type === 'split') {
                return {
                    ...node,
                    child1: resetNode(node.child1),
                    child2: resetNode(node.child2)
                };
            }
            return node;
        };
       dispatch(setTree(resetNode(tree)))
    }


    function  addStulpSash(action = {activeSide:"left",activeDir:"tiltTurn",passiveDir:"turn"}){
        const { activeSide, activeDir, passiveDir } = action;

        // Рекурсивная функция для поиска нужного стекла и его модификации
        const updateNode = (node) => {
            if (node.id === glassId && node.type === 'glass') {
                return {
                    ...node,
                    hasSash: true,       // Активируем рендер створки
                    isStulp: true,       // Указываем, что это именно ШТУЛЬП
                    activeSide: activeSide || 'left',    // 'left' или 'right'
                    activeDir: activeDir || 'tiltTurn',  // 'turn' (поворотная) или 'tiltTurn' (поворотно-откидная)
                    passiveDir: passiveDir || 'turn',    // Пассивная обычно только 'turn'
                };
            }
            if (node.type === 'split') {
                return {
                    ...node,
                    child1: updateNode(node.child1),
                    child2: updateNode(node.child2)
                };
            }
            return node;
        };

      dispatch(setTree(updateNode(tree)))
    }


    function createImpost(type, minSize = 0) {

        const updateTree = (node) => {

            if (node.id === impostId) {
                if (type === 'vertical' && node.w < minSize * 2 + impostWidth) return node;
                if (type === 'horizontal' && node.h < minSize * 2 + impostWidth) return node;
                if(node.type !== "glass"){
                    dispatch(setWindowImpostProfile(node))
                }

                return {
                    id: Math.random(),
                    type: 'split',
                    splitType: type,
                    ratio: 0.5,
                    child1: {id: Math.random(), type: 'glass'},
                    child2: {id: Math.random(), type: 'glass'}
                };
            }

            return node.type === 'split' ? {
                ...node,
                child1: updateTree(node.child1),
                child2: updateTree(node.child2)
            } : node;
        };
        dispatch(setTree(updateTree(tree)));
    }

    function createSash() {
        const update = (n) => {
            dispatch(setWindowSashRemove(n.id))
            if (n.id === glassId) return {...n, hasSash: !n.hasSash, dir: sashDirection};
            return n.type === 'split' ? {
                ...n,
                child1: update(n.child1),
                child2: update(n.child2),
                dir: sashDirection
            } : n;
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


    return  <>
        {!openSashConfig || !openSashConfigUpdate ?
            <div>
                <Modal show={configOpen}>
                    <ModalHeader>

                    </ModalHeader>
                    <ModalBody>
                        <div className={"flex justify-center pt-3"}>
                            {checkSashStatus(tree, glassId) ? "" :   <div className={"flex-wrap sm:flex gap-4"}>
                                <div onClick={() => {
                                    setOpenImpostConfig(true)
                                }} className={"flex gap-2 justify-start p-2 hover:bg-blue-700 cursor-pointer rounded-md"}>
                                    <div>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"/>
                                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(12 0)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={"self-center"}>
                                        Разделение контура
                                    </div>
                                </div>
                            </div>}
                            {!shtulpConfig.config?<div className={"flex-wrap sm:flex gap-4"}>
                                <div onClick={() => {
                                    setOpenSashConfig(true)
                                }}
                                     className={"flex gap-2 justify-start p-2 hover:bg-blue-700 cursor-pointer rounded-md"}>
                                    <div>

                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"
                                                      transform="translate(0 0)"/>
                                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(0 0)"/>
                                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(25 0)"/>
                                                <rect width="30" height="5" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(0 0)"/>
                                                <rect width="30" height="5" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(0 25)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={"self-center"}>
                                        {checkSashStatus(tree, glassId) ? "Настройка створки" : "Новая створка"}
                                    </div>
                                </div>
                            </div>:""}
                            {checkSashStatus(tree, glassId) ? "" :   <div className={"flex-wrap sm:flex gap-4"}>
                                <div onClick={() => {
                                    setOpenShtulpConfig(true)
                                }}
                                     className={"flex gap-2 justify-start p-2 hover:bg-blue-700 cursor-pointer rounded-md"}>
                                    <div>


                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"/>
                                                <rect width="30" height="30"/>
                                                <rect width="4" height="30" fill="#E61240" fillRule="evenodd"/>
                                                <rect width="2" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(14 0)"/>
                                                <rect width="4" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(26 0)"/>
                                                <rect width="22" height="4" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(4 0)"/>
                                                <rect width="22" height="4" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(4 26)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={"self-center"}>
                                        {checkSashStatus(tree, glassId) ? "Настройка штульповой створки" : "Новая штульповая створка"}
                                    </div>
                                </div>
                            </div>}
                            {shtulpConfig.config?<div className={"flex-wrap sm:flex gap-4"}>
                                <div onClick={() => {
                                    setOpenShtulpConfig(true)
                                }}
                                     className={"flex gap-2 justify-start p-2 hover:bg-blue-700 cursor-pointer rounded-md"}>
                                    <div>


                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"/>
                                                <rect width="30" height="30"/>
                                                <rect width="4" height="30" fill="#E61240" fillRule="evenodd"/>
                                                <rect width="2" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(14 0)"/>
                                                <rect width="4" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(26 0)"/>
                                                <rect width="22" height="4" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(4 0)"/>
                                                <rect width="22" height="4" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(4 26)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={"self-center"}>
                                        {checkSashStatus(tree, glassId) ? "Настройка штульповой створки" : "Новая штульповая створка"}
                                    </div>
                                </div>
                            </div>:""}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className={"flex justify-end w-full"}>
                            <div className={"flex"}>
                                <Button onClick={() => {
                                    dispatch(setConfigListOpen(false))
                                    dispatch(setStulpOpenConfig(false))
                                }}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal show={openImpostConfig}>
                    <ModalHeader>

                    </ModalHeader>
                    <ModalBody>
                        <h5 className={"text-center text-xl"}>Добавить импост</h5>
                        <div className={"flex justify-center pt-3"}>

                            <div className={"flex-wrap sm:flex gap-4"}>
                                <div onClick={() => {
                                    createImpost("vertical")
                                    dispatch(setConfigListOpen(false))
                                }} className={"flex gap-2 justify-start p-2 hover:bg-blue-700 cursor-pointer rounded-md"}>
                                    <div>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"/>
                                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="translate(12 0)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={"self-center"}>
                                        Вертикальный
                                    </div>
                                </div>
                                <div onClick={() => {
                                    createImpost("horizontal")
                                    dispatch(setConfigListOpen(false))
                                }} className={"flex gap-2 justify-start p-2 hover:bg-blue-700 cursor-pointer rounded-md"}>
                                    <div>
                                        <svg width="30.5" height="30" viewBox="0 0 30.5 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd"
                                                      transform="translate(0.5 0)"/>
                                                <rect width="5" height="30" fill="#E61240" fillRule="evenodd"
                                                      transform="matrix(0 1 -1 0 30 12.5)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={"self-center text-start"}>
                                        Горизонтальный
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className={"flex justify-end w-full"}>
                            <div className={"flex"}>
                                <Button onClick={() => {
                                   setOpenImpostConfig(false)
                                    dispatch(setStulpOpenConfig(false))
                                    //dispatch(setConfigListOpen(false))
                                }}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal show={openSashConfig}>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                            <ConfigSash config={!checkSashStatus(tree, glassId)} setOpenSashConfig={setOpenSashConfig} createSash={createSash}/>
                    </ModalBody>
                    <ModalFooter>
                        <div className={"flex justify-end w-full"}>
                        <div className={"flex"}>
                            <Button onClick={() => {
                                setOpenSashConfig(false)
                                dispatch(setStulpOpenConfig(false))
                            }}>
                                Закрыть
                            </Button>
                        </div>
                    </div>
                    </ModalFooter>
                </Modal>
                <Modal show={openShtulpConfig}>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                      <div className={"grid grid-cols-2 gap-4 text-center"}>
                          <div onClick={()=>{
                              setActiveSide("left")
                              setActiveDir("turn")
                          }} className={`flex hover:underline cursor-pointer ${activeSide === "left" && activeDir === "turn"?"underline":""}`}>
                              <div>
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g>
                                          <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd" />
                                          <rect width="30" height="30" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" />
                                          <rect width="2" height="30" fill="#E61240" fillRule="evenodd" transform="translate(14 0)" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" transform="translate(26 0)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 0)" />
                                          <rect width="2" height="4" fill="#E61240" fillRule="evenodd" transform="translate(10 13)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 26)" />
                                      </g>
                                  </svg>
                              </div>
                              <div className={"self-center px-4"}>
                                 <div>
                                     Активная створка слева
                                 </div>
                                  <div>Поворотная</div>
                              </div>
                          </div>
                          <div onClick={()=>{
                              setActiveSide("right")
                              setActiveDir("turn")
                          }} className={`flex hover:underline cursor-pointer ${activeSide === "right" && activeDir === "turn"?"underline":""}`}>
                              <div>
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g>
                                          <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd" />
                                          <rect width="30" height="30" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" />
                                          <rect width="2" height="30" fill="#E61240" fillRule="evenodd" transform="translate(14 0)" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" transform="translate(26 0)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 0)" />
                                          <rect width="2" height="4" fill="#E61240" fillRule="evenodd" transform="translate(18 13)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 26)" />
                                      </g>
                                  </svg>
                              </div>
                              <div className={"self-center px-4"}>
                                  <div>Активная створка справа</div>
                                  <div>Поворотная</div>
                              </div>
                          </div>
                          <div onClick={()=>{
                              setActiveSide("left")
                              setActiveDir("tiltTurn")
                          }} className={`flex hover:underline cursor-pointer ${activeSide === "left" && activeDir === "tiltTurn"?"underline":""}`}>
                              <div>
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g>
                                          <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd" />
                                          <rect width="30" height="30" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" />
                                          <rect width="2" height="30" fill="#E61240" fillRule="evenodd" transform="translate(14 0)" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" transform="translate(26 0)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 0)" />
                                          <rect width="2" height="4" fill="#E61240" fillRule="evenodd" transform="translate(10 13)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 26)" />
                                      </g>
                                  </svg>
                              </div>
                              <div className={"self-center px-4"}>
                                  <div>Активная створка слева</div>
                                  <div>Поворотно-откидная</div>
                              </div>
                          </div>
                          <div onClick={()=>{
                              setActiveSide("right")
                              setActiveDir("tiltTurn")
                          }} className={`flex hover:underline cursor-pointer ${activeSide === "right" && activeDir === "tiltTurn"?"underline":""}`}>
                              <div>
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g>
                                          <rect width="30" height="30" fill="#FFFFFF" fillRule="evenodd" />
                                          <rect width="30" height="30" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" />
                                          <rect width="2" height="30" fill="#E61240" fillRule="evenodd" transform="translate(14 0)" />
                                          <rect width="4" height="30" fill="#E61240" fillRule="evenodd" transform="translate(26 0)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 0)" />
                                          <rect width="2" height="4" fill="#E61240" fillRule="evenodd" transform="translate(18 13)" />
                                          <rect width="22" height="4" fill="#E61240" fillRule="evenodd" transform="translate(4 26)" />
                                      </g>
                                  </svg>
                              </div>
                              <div className={"self-center px-4"}>
                                  <div>Активная створка справа</div>
                                  <div>Поворотно-откидная</div>
                              </div>
                          </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className={"flex justify-end w-full gap-4"}>
                            <div className={"flex"}>
                                <Button onClick={() => {
                                    removeSash()
                                    dispatch(setWindowSashRemove(glassId))
                                }}>
                                    Удалить
                                </Button>
                            </div>
                            <div className={"flex"}>
                                <Button onClick={() => {
                                    addStulpSash({activeSide:activeSide,activeDir:activeDir,passiveDir:"turn"})
                                }}>
                                    Применить
                                </Button>
                            </div>
                            <div className={"flex"}>
                                <Button onClick={() => {
                                    setOpenShtulpConfig(false)
                                    dispatch(setStulpOpenConfig(false))
                                }}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>

            </div>
             : ""}
    </>


}