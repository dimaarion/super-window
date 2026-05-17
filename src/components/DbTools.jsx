import { exportDb, importDb } from "../action";
import {Button, FileInput} from "flowbite-react";

function DbTools() {
    return (
        <div className="flex self-center gap-4">
            <div>
                <Button color={"myColor"} onClick={exportDb}>Экспортировать базу</Button>
            </div>
            <div>

                <FileInput
                    id="file-upload"
                    color={"gray"}
                    accept="application/json"
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
