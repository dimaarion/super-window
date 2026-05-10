import {connection} from "../Db.js";

export async function createBase(name,v = 1) {
    const tbColors = {
        name: "Colors",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            name: { dataType: "string"},
            type: { dataType: "string"},
            color: { dataType: "string" },
        }
    };
    const tblAccessories = {
        name: "Accessories",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            article: { dataType: "string", notNull: true },
            name: { dataType: "string", notNull: true },
            width: { dataType: "number", default: 0 },
            dearth: { dataType: "number", default: 0 },
            grooveOffset: { dataType: "number", default: 0 },
            unit: { dataType: "string" },
            noColor: { dataType: "number",  default: 0 },
            white: { dataType: "number",  default: 0 },
            both_sides: { dataType: "number",  default: 0 },
            outside: { dataType: "number",  default: 0 },
            inside: { dataType: "number",  default: 0 },
            manufacturer: { dataType: "string" }
        }
    };
    let db = {
        name: name,
        version: v,
        tables: [tblAccessories,tbColors]
    }


   await connection.initDb(db);
}


export async function deleteDatabase() {
    try {
        await connection.dropDb();
        console.log("База данных успешно удалена");
    } catch (ex) {
        console.error("Ошибка при удалении базы:", ex);
    }
}


export async function insertTable(tbName, value){
     await connection.insert({
        into: tbName,
        values: [value],
    });
}

export async function select(tbName){
   return  await connection.select({
       from: tbName
   });
}

