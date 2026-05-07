import {connection} from "../Db.js";

export async function createBase(name) {
    const tbColors = {
        name: "Colors",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            name: { dataType: "string"},
            color: { dataType: "string" },
        }
    };
    const tblAccessories = {
        name: "Accessories",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            article: { dataType: "string", notNull: true },    // Артикул (уникальный код детали)
            name: { dataType: "string", notNull: true },       // Название (ручка, замок, петля)
            category: { dataType: "string" },                  // Категория (фурнитура, крепёж, уплотнитель)
            unit: { dataType: "string" },                      // Единица измерения (шт., комплект, м)
            price: { dataType: "number", notNull: true },      // Цена за единицу
            manufacturer: { dataType: "string" }               // Производитель
        }
    };
    let db = {
        name: "CALCULATOR",
        tables: [tblAccessories,tbColors]
    }


   await connection.initDb(db);
}


export  function createTableColors(){
   return  {
        name: "colors",
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            name: { dataType: "string", notNull: true },       // Название (ручка, замок, петля)
            color: { dataType: "string" ,notNull:true},                  // Категория (фурнитура, крепёж, уплотнитель)
        }
    };
}

export async function insertTable(tbName, value){
     await connection.insert({
        into: tbName,
        values: [value],
    });
}

export const removeImpost = (targetId,setTree) => {
    // Если пытаемся удалить корневой элемент, ничего не делаем
    if (targetId === 'root') return;

    const updateTree = (node) => {
        // Если этот узел — тот самый split, который мы хотим удалить
        if (node.id === targetId && node.type === 'split') {
            return {
                id: Math.random(),
                type: 'glass'
            };
        }

        // Если нет, идем глубже по дереву
        if (node.type === 'split') {
            return {
                ...node,
                child1: updateTree(node.child1),
                child2: updateTree(node.child2)
            };
        }
        return node;
    };

    setTree(prev => updateTree(prev));
};