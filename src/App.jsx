import './App.css'
import {useEffect} from "react";
import WindowView from "./components/WindowView.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setWindowWidth} from "./features/windowWidth.js";
import {createBase, createTableColors, insertTable} from "./action/index.js";
import ColorSelect from "./components/ColorSelect.jsx";
import {setWindowHeight} from "./features/windowHeight.js";
import ImpostConfig from "./components/ImpostConfig.jsx";


await createBase()
function App() {

    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windowColor = useSelector((state) => state.windowColor.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);

    useEffect(() => {

///insertTable("Colors",{name:"Белый",color: "#ffffff"});

    }, []);

   const dispatch = useDispatch()

  return (
      <>
        <header className={"flex justify-between h-[60px] bg-gray-600"}>
            <h1>Окна</h1>
        </header>
          <article className={"flex justify-between w-full  bg-blue-300"}>
              <div className={"hidden sm:block"}>

              </div>
              <div className={"border-2 border-gray-600 w-full sm:w-1/2 "}>
                  <div className={"justify-center flex"}>
                      <WindowView impostX={50} impostWidth={impostWidth} width={windowWidth} height={windowHeight} heightProfile={profileHeight} color={windowColor}  />
                  </div>
                  <div className={"flex-wrap lg:flex justify-center"}>
                     <div className={"p-2"}>
                         <input placeholder={'1500'} onChange={(e)=>{
                             dispatch(setWindowWidth(e.target.value))
                         }} className={"bg-amber-50 p-2"} type={"number"} />
                         <div className={"text-start lg:text-center"}>Ширина</div>
                     </div>
                      <div className={"p-2"}>
                          <input placeholder={'1500'} onChange={(e)=>{
                              dispatch(setWindowHeight(e.target.value))
                          }} className={"bg-amber-50 p-2"} type={"number"} />
                          <div className={"text-start lg:text-center"}>Высота</div>
                      </div>
                      <div className={"p-2"}>
                         <ColorSelect />
                          <div className={"text-start lg:text-center"}>Цвет</div>
                      </div>
                  </div>
              </div>
              <div className={"hidden sm:block"}>

              </div>
          </article>
          <div>
              {impostOpen?<ImpostConfig/>:""}
          </div>
      </>
  )
}

export default App
