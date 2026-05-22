import TopPanel from "./TopPanel.jsx";
import DbTools from "./DbTools.jsx";
import LeftPanel from "./LeftPanel.jsx";

export default function DbSettings({setPageList, pageList}) {
    return <>
        <div className={"w-full"}>
            <div className={"mt-6"}>
                <div className={"flex"}>
                    <div className={"w-[400px]"}>
                        <LeftPanel />
                    </div>
                    <div className={"w-full justify-start"}>
                        <DbTools/>
                    </div>

                </div>
            </div>
        </div>

    </>
}