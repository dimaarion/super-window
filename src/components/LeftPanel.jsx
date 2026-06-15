import {setPageList} from "../features/pageList.js";
import {useDispatch} from "react-redux";

export default function LeftPanel(){
    const dispatch = useDispatch();
    return <>
        <div className={"hidden sm:flex text-xl justify-between container text-gray-50"}>
            <div className={"flex-wrap justify-center px-3 w-[300px] shadow-xl shadow-gray-950"}>
                <div onClick={()=>{
                    dispatch(setPageList(""));
                }} className={"flex gap-2 px-2 hover:text-blue-400 cursor-pointer"}>
                    <div className={"flex self-center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path
                                d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                        </svg>
                    </div>

                    <div className="flex self-center p-2">Главная</div>
                </div>
                <div onClick={() => {
                    dispatch(setPageList("new-project"));
                }} className={"flex gap-2 px-2 hover:text-blue-400 cursor-pointer"}>
                    <div className={"flex self-center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </div>

                    <div className="flex self-center p-2">Новый расчет</div>
                </div>
                <div onClick={()=>{
                    dispatch(setPageList("saved-project"));
                }} className={"flex gap-2 px-2 hover:text-blue-400 cursor-pointer"}>
                    <div className={"flex self-center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-folder-fill" viewBox="0 0 16 16">
                            <path
                                d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                        </svg>
                    </div>

                    <div className="flex self-center p-2">Сохраненные проекты</div>
                </div>
                <div onClick={()=>{
                    dispatch(setPageList("bd-settings"));
                }} className={"flex gap-2 px-2 hover:text-blue-400 cursor-pointer"}>
                    <div className={"flex self-center"}>

                        <svg width="16"  viewBox="0 0 89 81" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(1 0.5)">
                                <line x1="0" y1="0" x2="0" y2="40" fill="currentColor" strokeWidth="2" stroke="#808080" strokeLinecap="round" strokeLinejoin="bevel" transform="translate(0 20)" />
                                <line x1="0" y1="0" x2="0" y2="40" fill="currentColor" strokeWidth="2" stroke="#808080" strokeLinecap="round" strokeLinejoin="bevel" transform="translate(87 20)" />
                                <path d="M0 20C0 8.9543 19.5875 0 43.75 0C67.9125 0 87.5 8.9543 87.5 20C87.5 31.0457 67.9125 40 43.75 40C19.5875 40 0 31.0457 0 20Z" fill="currentColor" fillRule="evenodd" strokeWidth="1" transform="translate(0 40)" />
                                <path d="M0 20C0 8.9543 19.5875 0 43.75 0C67.9125 0 87.5 8.9543 87.5 20C87.5 31.0457 67.9125 40 43.75 40C19.5875 40 0 31.0457 0 20Z" fill="currentColor" fillRule="evenodd" strokeWidth="1"  transform="translate(0 20)" />
                                <path d="M0 20C0 8.9543 19.5875 0 43.75 0C67.9125 0 87.5 8.9543 87.5 20C87.5 31.0457 67.9125 40 43.75 40C19.5875 40 0 31.0457 0 20Z" fill="currentColor" fillRule="evenodd" strokeWidth="1"  />
                            </g>
                        </svg>
                    </div>

                    <div className="flex self-center p-2">База данных</div>
                </div>
                <div className={"flex gap-2 px-2 hover:text-blue-400 cursor-pointer"}>
                    <div className={"flex self-center"}>

                        <svg width="16"  viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle fill="currentColor" cx="12" cy="12" r="3"   strokeWidth="2"/>
                            <path fill="currentColor" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </div>

                    <div className="flex self-center p-2">Настройки</div>
                </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    </>
}