import {deleteDatabase, exportDb, importDb} from "../action";
import {FileInput, Label} from "flowbite-react";

function DbTools() {
    return (
        <div className="grid sm:grid-cols-2 gap-x-8">
            <div onClick={exportDb} className={"relative text-parent h-[80px]"}>
                <div className={"text-gray-800 cursor-pointer z-20 m-auto left-[50px] top-0 bottom-0 h-[55px] text-xl absolute"}>
                    Экспортировать базу
                </div>
                <div className={"text-gray-800 w-full absolute mt-2 text-item cursor-pointer hover:text-gray-600 bg-gray-100 border-2 border-gray-100 rounded-lg text-xl"} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40"  fill="currentColor"
                         className="bi bi-arrow-right-square-fill text-item" viewBox="0 0 16 16">
                        <path
                            d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                    </svg>
                </div>
            </div>
            <div onClick={deleteDatabase} className={"relative text-parent h-[80px]"}>
                <div className={"text-gray-800 cursor-pointer z-20 m-auto left-[50px] top-0 bottom-0 h-[55px] text-xl absolute"}>
                    Удалить базу
                </div>
                <div className={"text-gray-800 w-full absolute mt-2 text-item cursor-pointer hover:text-gray-600 bg-gray-100 border-2 border-gray-100 rounded-lg text-xl"} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40"  fill="currentColor"
                         className="bi bi-arrow-right-square-fill text-item" viewBox="0 0 16 16">
                        <path
                            d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                    </svg>
                </div>
            </div>
            <div>
                <Label className={"text-gray-50 text-xl"}>
                    Импортировать базу
                </Label>
                <FileInput
                    id="file-upload"
                    color={"gray"}
                    accept="application/json"
                    className={"mt-2"}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) importDb(file);
                    }}
                />
            </div>

        </div>
    );
}

export default DbTools;
