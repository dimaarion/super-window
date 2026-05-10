import './App.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createBase, select} from "./action/index.js";
import Home from "./components/Home.jsx";
import Accessories from "./components/Accessories.jsx";
import {setPage} from "./features/page.js";


await createBase("CALCULATOR",2)
function App() {



    const page = useSelector(state => state.page.value);


    const dispatch = useDispatch()
    useEffect(() => {

///insertTable("Colors",{name:"Белый",color: "#ffffff"});

    }, []);



  return (
      <>
        <header className={"flex justify-center h-[60px] bg-gray-200"}>
            <nav className={"flex justify-between gap-2"}>
                <div onClick={()=>{
                    dispatch(setPage("Главная"))
                }} className={`flex self-center hover:underline cursor-pointer ${page === "Главная"?'underline':''}`}>
                    Главная
                </div>
                <div onClick={()=>{
                    dispatch(setPage("Комплектующие"))
                }} className={`flex self-center hover:underline cursor-pointer ${page === "Комплектующие"?'underline':''}`}>
                    Комплектующие
                </div>
            </nav>
        </header>
          <article >
              {page === "Главная"?<div className={"flex justify-between w-full  bg-blue-300"}><Home/></div>:""}
              {page === "Комплектующие"?<Accessories/>:""}
          </article>

      </>
  )
}

export default App
