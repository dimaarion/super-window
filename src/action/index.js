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
    const tblWindow = {
        name: "Window",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            article: { dataType: "string", notNull: true },     // Артикул готового окна
            name: { dataType: "string", notNull: true },        // Название (например, "Окно балконное")
            width: { dataType: "number", notNull: true },       // Ширина
            height: { dataType: "number", notNull: true },      // Высота
            color: { dataType: "string", notNull: true },                      // Цвет профиля/рамы
            system: { dataType: "string", notNull: true },      // Система (Rehau, ADOPEN, Salamander)
            category: { dataType: "string", notNull: true },    // Категория (Балконное, Панорамное, Дверь)
            frameId: { dataType: "number" },                    // Рама
            sashId: { dataType: "number" },                     // Створка
            impostId: { dataType: "number" },                   // Импост
            shtulpId: { dataType: "number" },                   // Штульп
            fillingId: { dataType: "number" },                  // Заполнение (стеклопакет/панель)
            hardwareId: { dataType: "number" },                 // Комплект фурнитуры (из таблицы Hardware)
            accessories: { dataType: "array" },                 // Доп. комплектующие (ручки, замки, петли)
            price: { dataType: "number" },                      // Итоговая цена
            createdAt: { dataType: "date_time" },               // Дата создания
            updatedAt: { dataType: "date_time" }                // Дата обновления
        }
    };

    const tblHardware = {
        name: "Hardware",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            name: { dataType: "string", notNull: true },
            setId: { dataType: "array", default: [] },
        }
    };

    const tblHardwareSet = {
        name: "HardwareSet",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            name: { dataType: "string"},
            accessoriesId: { dataType: "number", notNull: true },
            count: { dataType: "number", default: 1 },
            specificationId:{dataType: "array", default: []},
            distance:{dataType: "number", default: 0},
            indent:{dataType: "number", default: 0}
        }
    };
    const tblSetSpecification = {
        name: "SetSpecification",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            accessoriesId: { dataType: "number", notNull: true },
            count: { dataType: "number", default: 1 },
        }
    };



    let db = {
        name: name,
        version: v,
        tables: [
            tblAccessories,
            tbColors,
            tblWindow,
            tblHardware,
            tblHardwareSet,
            tblSetSpecification
        ]
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
    return  await connection.insert({
        into: tbName,
        values: [value],
    });
}

export async function remove(tbName, id){
  return   await connection.remove({
        from: tbName,
        where: {
            id: id,
        }
    });
}

export async function updateTb(tbName,value, id){
    return   await connection.update({
        in: tbName,
        set:value,
        where: {
            id: id,
        }
    });
}


export async function select(tbName){
   return  await connection.select({
       from: tbName
   });
}

export async function whereId(tbName,id){
    return  await connection.select({
        from: tbName,
        where:{
            id:Number.parseInt(id)
        }
    });
}


export function parseNan(el){
    return !isNaN(el)?el:0
}
