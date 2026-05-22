import LeftPanel from "./LeftPanel.jsx";
import {useEffect, useState} from "react";
import {select} from "../action/index.js";

export default function SavedProjects(){

    const [project, setProject] = useState([{}]);

    useEffect(() => {
        select("Window").then((result) => {
            setProject(result);
        })
    }, []);

    return <>
        <div className={"flex w-full justify-start gap-8"}>
            <div>
                <LeftPanel/>
            </div>
            <div >
                {project.map((el, index) => <div key={el.id + "project"} className={"flex text-gray-50 text-xl p-3 gap-4"}>
                    <div className={"w-[200px] p-2"}>
                        <img className={"w-full"} src={el.image} alt={el.name} />
                    </div>
                        <div>
                            <div>{el.name}</div>
                        </div>
                </div>)}
            </div>
            <div>

            </div>
        </div>
    </>
}