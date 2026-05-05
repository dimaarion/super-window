import './App.css'
import {connection} from "./Db.js";
import {useEffect} from "react";
import WindowView from "./components/WindowView.jsx";
import {useDispatch} from "react-redux";
import {setWindowWidth} from "./features/windowWidth.js";

function App() {


    useEffect(() => {
        const tblAccessories = {
            name: "Accessories",
            columns: {
                id: { primaryKey: true, autoIncrement: true },
                article: { dataType: "string", notNull: true },    // Артикул (уникальный код детали)
                name: { dataType: "string", notNull: true },       // Название (ручка, замок, петля)
                category: { dataType: "string" },                  // Категория (фурнитура, крепёж, уплотнитель)
                unit: { dataType: "string" },                      // Единица измерения (шт., комплект, м)
                price: { dataType: "number", notNull: true },      // Цена за единицу
                manufacturer: { dataType: "string" }               // Производитель
            }
        };
        let db = {
            name: "CALCULATOR_WINDOW",
            tables: [tblAccessories]
        }

        let isDbCreated =  connection.initDb(db);
        if(isDbCreated){
            console.log('База данных создана и соединение открыто');
        }
        else{
            console.log('Связь открыта');
        }



        const result =  connection.select({
            from: "Accessories",
        }).then((result)=>console.log(result));

    }, []);

   const dispatch = useDispatch()

  return (
      <>
        <header className={"flex justify-between h-[60px] bg-gray-600"}>
            <h1>Окна</h1>
        </header>
          <article className={"flex justify-between w-full  bg-blue-300"}>
              <div>

              </div>
              <div className={"border-2 border-gray-600 w-1/2 h-full"}>
                  <div className={"justify-center flex"}>
                      <WindowView width={1500} height={1500} heightProfile={60} />
                  </div>
                  <div className={"flex justify-center"}>
                     <div className={"p-2"}>
                         <input onChange={(e)=>{
                             dispatch(setWindowWidth(e.target.value))
                         }} className={"bg-amber-50 p-2"} type={"text"} height={50} width={200}/>
                         <div className={"text-center"}>Ширина</div>
                     </div>
                      <div className={"p-2"}>
                          <input className={"bg-amber-50 p-2"} type={"text"} height={50} width={200}/>
                      </div>
                      <div className={"p-2"}>
                          <select className={"bg-amber-50 p-2"} type={"text"} height={50} width={200}>
                              <option>sasa</option>
                              <option>sasa</option>
                          </select>
                      </div>
                  </div>
              </div>
              <div>

              </div>
          </article>
      </>
  )
}

export default App
