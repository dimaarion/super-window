import './App.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createBase, select} from "./action/index.js";
import Home from "./components/Home.jsx";
import Accessories from "./components/Accessories.jsx";
import {setPage} from "./features/page.js";
import HardwareForm from "./components/HardwareForm.jsx";
import {connection} from "./Db.js";
import SetForm from "./components/SetForm.jsx";
import {Button, createTheme, ThemeProvider} from "flowbite-react";
import DbTools from "./components/DbTools.jsx";

const tb = "CALCULATOR_4"
await createBase(tb, 1)

function App() {
    const page = useSelector(state => state.page.value);


    const dispatch = useDispatch()
    useEffect(() => {

///insertTable("Colors",{name:"Белый",color: "#ffffff"});

        connection.getDbSchema(tb).then((res) => {
            //   console.log(res)
        })

        connection.getDbSchema(tb).then((res) => {
            console.log(res)
        })
    }, []);

    const navigation = ["Главная", "Комплектующие", "Фурнитура", "Наборы", "Цвет"]
    const customTheme = createTheme({
        modal:{
            "content": {
                "base": "relative  h-full w-full p-4 rounded-lg md:h-auto",

            },
            "body": {
                "base": "flex-1 text-gray-50 bg-gray-600 overflow-auto p-6",
                "popup": "pt-0"
            },
            "header": {
                "base": "flex items-start bg-gray-800 justify-between rounded-t border-b p-5 dark:border-gray-600",
                "popup": "border-b-0 p-2",
                "title": "text-xl font-medium text-gray-50 dark:text-white",
                "close": {
                    "base": "ms-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
                    "icon": "h-5 w-5"
                }
            },
            "footer": {
                "base": "flex items-center gap-2 bg-gray-800 rounded-b border-gray-200 p-6 dark:border-gray-600",
                "popup": "border-t"
            }

        },
        button:{
          "base":"cursor-pointer",
            "color": {
                "myColor": "border-gray-600 bg-gray-900 text-gray-50 placeholder-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500",
                "gray": "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
            },
        },
        textInput: {
            "base": "flex",
            "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
            "field": {
                "base": "relative w-full",
                "input": {
                    "base": "block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                    "sizes": {
                        "sm": "p-2 sm:text-xs",
                        "md": "p-2.5 text-sm",
                        "lg": "p-4 sm:text-base"
                    },
                    "colors": {
                        "myColor": "border-gray-600 bg-gray-900 text-gray-50 placeholder-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500",
                        "gray": "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                        "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                        "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                        "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                        "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
                    },
                },
            }
        },
        select: {
            "base": "flex",
            "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
            "field": {
                "base": "relative w-full",
                "icon": {
                    "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
                    "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
                },
                "rightIcon": {
                    "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                    "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
                },
                "select": {
                    "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                    "colors": {
                        "myColor": "border-gray-600 bg-gray-900 text-gray-50 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    },
                    "sizes": {
                        "sm": "p-2 sm:text-xs",
                        "md": "p-2.5 text-sm",
                        "lg": "p-4 sm:text-base"
                    },
                    "withRightIcon": {
                        "on": "pr-10",
                        "off": ""
                    },
                    "withIcon": {
                        "on": "pl-10",
                        "off": ""
                    },
                    "withAddon": {
                        "on": "rounded-r-lg",
                        "off": "rounded-lg"
                    },
                    "withShadow": {
                        "on": "shadow-sm dark:shadow-sm-light",
                        "off": ""
                    }
                }
            }
        }

    });
    return (
        <>
            <ThemeProvider theme={customTheme}>
                <header className={"flex justify-center h-[60px] text-white px-4 bg-gray-950 shadow-md"}>
                    <nav className={"flex justify-between w-full gap-2"}>
                        <div className={"w-full"}>

                        </div>
                        <div className={"flex justify-between w-full"}>
                            {navigation.map((el) => <div key={el} onClick={() => {
                                dispatch(setPage(el))
                            }} className={`flex self-center hover:underline cursor-pointer hover:text-blue-400 ${page === el ? 'underline text-blue-400' : ''}`} >
                                {el}
                            </div>)}
                        </div>
                        <div className={"w-full justify-end flex"}>
                            <div className={"self-center"}>
                              <DbTools/>
                            </div>

                        </div>
                    </nav>


                </header>
                <article className={"bg-gray-800"}>
                    {page === "Главная" ? <div className={"flex justify-center w-full"}><Home/></div> : ""}
                    {page === "Комплектующие" ? <Accessories/> : ""}
                    {page === "Фурнитура" ? <HardwareForm/> : ""}
                    {page === "Наборы" ? <SetForm/> : ""}
                </article>
                <footer className={"bg-gray-950 w-full h-100"}>

                </footer>
            </ThemeProvider>

        </>
    )
}

export default App
