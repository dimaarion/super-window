import {connection} from "../Db.js";

export const NAMEDB = "CALCULATOR"
export const VERSIONDB = 2

export async function createBase() {
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
            article: { dataType: "string"},
            name: { dataType: "string"},
            category: { dataType: "string"},
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
            article: { dataType: "string", notNull: true },
            name: { dataType: "string", notNull: true },
            width: { dataType: "number", notNull: true },
            height: { dataType: "number", notNull: true },
            color: { dataType: "number", default: 1 },
            system: { dataType: "string", notNull: true },
            category: { dataType: "string", notNull: true },
            frameId: { dataType: "number" },
            sashId: { dataType: "number" },
            impostId: { dataType: "number" },
            shtulpId: { dataType: "number" },
            fillingId: { dataType: "number" },
            hardwareId: { dataType: "number" },
            accessories: { dataType: "array" },
            price: { dataType: "number" },
            createdAt: { dataType: "date_time" },
            updatedAt: { dataType: "date_time" },
            image: { dataType: "string" },
            tree: { dataType: "object" },
            count: { dataType: "number",default: 1 },
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

    const tbSettings = {
        name: "Settings",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            monetary_unit:{ dataType: "string", default: "ru" },
        }

    }

    // ГЛАВНОЕ ИЗМЕНЕНИЕ: Структура объекта базы данных
    let db = {
        name: NAMEDB,
        version: VERSIONDB,
        tables: [
            tblAccessories,
            tbColors,
            tblWindow,
            tblHardware,
            tblHardwareSet,
            tblSetSpecification,
            tbSettings
        ]
    }

    try {
        const isDbCreated = await connection.initDb(db);
        if (isDbCreated) {
            console.log("База данных создана успешно");
        } else {
            console.log("База данных успешно обновлена до версии", VERSIONDB);
        }
    } catch (error) {
        console.error("Ошибка при инициализации/обновлении БД:", error);
    }
}

export async function exportDb() {
    const schema = await connection.getDbSchema(NAMEDB);
    const exportData = {};

    for (const table of schema.tables) {
        const rows = await connection.select({ from: table.name });
        exportData[table.name] = rows;
    }

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "indexeddb_export.json";
    a.click();


}


export async function saveFile() {

}

// 📥 Импорт базы из JSON
export async function importDb(file) {
    const text = await file.text();
    const data = JSON.parse(text);
    const restoreDates = (obj) => {
        const isoDateRegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        for (const key in obj) {
            if (typeof obj[key] === 'string' && isoDateRegExp.test(obj[key])) {
                obj[key] = new Date(obj[key]);
            }
        }
        return obj;
    };

    for (const [tableName, rows] of Object.entries(data)) {
        for (const row of rows) {
            const preparedRow = restoreDates({ ...row });
// Если в строке есть дата, парсим её обратно в формат Date для JsStore
            if (preparedRow.createdAt) {
                preparedRow.createdAt = new Date(preparedRow.createdAt);
            }
            if (preparedRow.updatedAt) {
                preparedRow.updatedAt = new Date(preparedRow.updatedAt);
            }
            const updated = await connection.update({
                in: tableName,
                set: preparedRow,
                where: { id: preparedRow.id }
            });

            if (updated === 0) {
                await connection.insert({
                    into: tableName,
                    values: [preparedRow]
                });
            }
        }
    }

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

export function parseNum(num){
    if(Number.isInteger(num)){
        return num;
    }else {
        num = num.replace(/A-Za-z|А-Яа-я/g,'')
        num = parseInt(num);
        num = isNaN(num) ? 0 : num;
        num = Math.min(num,10000)
        return num
    }

}

export /**
 * Конвертирует SVG-элемент в PNG (Data URL)
 * @param {SVGElement} svgElement - Ссылка на ваш SVG в DOM
 * @4026 {Promise<string>} - Возвращает строку в формате data:image/png;base64...
 */

async function svgToPng(svgElement) {
    return new Promise((resolve, reject) => {
        // 1. Получаем XML-код SVG и создаем Blob URL
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);

        // 2. Создаем виртуальное изображение для загрузки SVG
        const image = new Image();

        // Берем размеры из самого SVG
        const width = svgElement.clientWidth || parseInt(svgElement.getAttribute('width')) || 300;
        const height = svgElement.clientHeight || parseInt(svgElement.getAttribute('height')) || 150;

        image.width = width;
        image.height = height;

        image.onload = () => {
            // 3. Рисуем на холсте (Canvas)
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext('2d');
            context.clearRect(0, 0, width, height); // Очищаем холст (для прозрачного фона)
            context.drawImage(image, 0, 0, width, height);

            // 4. Получаем PNG строку
            const pngDataUrl = canvas.toDataURL('image/png');

            // Освобождаем память
            URL.revokeObjectURL(blobURL);
            resolve(pngDataUrl);
        };

        image.onerror = (err) => {
            URL.revokeObjectURL(blobURL);
            reject(new Error('Ошибка при загрузке SVG в Image: ' + err.message));
        };

        image.src = blobURL;
    });
}

export function exportSvgToBase64(svgElement) {
    // 1. Клонируем SVG, чтобы случайно не изменить оригинал в интерфейсе
    const clonedSvg = svgElement.cloneNode(true);

    // Важно: если стили окна (цвет профиля, линии) заданы через внешний CSS (например, Tailwind или глобальный файл),
    // их нужно внедрить внутрь самого SVG перед экспортом, иначе в базе сохранится "черный силуэт".
    // Если у вас все стили инлайновые (fill="#3b82f6", stroke="#fff"), этот шаг можно пропустить.

    // 2. Сериализуем (переводим) DOM-объект SVG в текстовую XML-строку
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);

    // 3. Безопасное кодирование строки с кириллицей (размеры в "мм", названия профилей) в Base64
    const utf8Bytes = new TextEncoder().encode(svgString);
    const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join("");
    const base64Result = btoa(binaryString);

    // 4. Возвращаем готовый Data URL, который можно вставлять в <img src="..."> или сохранять в базу
    return `data:image/svg+xml;base64,${base64Result}`;
}
