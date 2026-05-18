import {connection} from "../Db.js";

const NAMEDB = "CALCULATOR_4"
const VERSIONDB = 1

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
        name: NAMEDB,
        version: VERSIONDB,
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

// 📥 Импорт базы из JSON
export async function importDb(file) {
    const text = await file.text();
    const data = JSON.parse(text);

    for (const [tableName, rows] of Object.entries(data)) {
        for (const row of rows) {
            const updated = await connection.update({
                in: tableName,
                set: row,
                where: { id: row.id }
            });

            if (updated === 0) {
                await connection.insert({
                    into: tableName,
                    values: [row]
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
    num = num.replace(/A-Za-z|А-Яа-я/g,'')
    num = parseInt(num);
    num = isNaN(num) ? 0 : num;
    num = Math.min(num,10000)
    return num
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
