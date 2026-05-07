export default function ImpostConfig(){
    return (
        <div className={"fixed top-0 left-0 right-0 bottom-0 w-[290px] h-[290px] m-auto bg-white"}>
           <div>
               <h1 className={"text-center p-2 text-2xl"}>Импост</h1>
               <div className={"flex p-4 w-full h-5 mt-5 justify-center"}>
                   <div className={"p-2 text-2xl self-center"}>x</div>
                   <div className={"p-2 self-center"}><input className={"bg-blue-300 p-2"} type={"number"}/></div>
               </div>
               <div className={"flex p-4 w-full h-5 mt-5 justify-center"}>
                   <div className={"p-2 text-2xl self-center"}>y</div>
                   <div className={"p-2 self-center"}><input className={"bg-blue-300 p-2"} type={"number"}/></div>
               </div>
           </div>
            <div className={"h-[50px] w-[100px] absolute right-0  left-0 bottom-0 m-auto"}>
                <div className={"p-2 justify-center cursor-pointer hover:bg-blue-400 bg-blue-300 h-[40px] self-center flex w-[100px]"}>
                    Закрыть
                </div>
            </div>

        </div>
    )
}