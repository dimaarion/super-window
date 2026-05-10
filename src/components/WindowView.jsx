import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setImpostConfigOpen} from "../features/impostConfigOpen.js";
import {setImpostPosition} from "../features/ImpostPosition.js";
import {setNode} from "../features/node.js";
import {setImpostId} from "../features/impostId.js";
import {setConfigListOpen} from "../features/configListOpen.js";
import Sash from "./Sash.jsx";
import {setGlassId} from "../features/glassId.js";
import DragGuide from "./DragGuide.jsx";

/**
 * WindowView - Компонент динамического чертежа окна.
 * Позволяет делить сегменты и перемещать импосты по клику.
 */
export default function WindowView({
                                       width = 1500,        // Ширина проема (мм)
                                       height = 1500,       // Высота проема (мм)
                                       heightProfile = 60,  // Ширина рамы (мм)
                                       color = "#FFFFFF",
                                       impostWidth = 120
                                       // Цвет профиля
                                   }) {
    const tree = useSelector(state => state.tree.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const dispatch = useDispatch()
    const hp = heightProfile;
    const minSize = 0;    // Минимально допустимый размер стеклопакета
    const BASE_WIDTH = 1500;
    const BASE_FONT_SIZE = 50;
    const MIN_FONT_SIZE = 20;
    const MAX_FONT_SIZE = 60;
    const offset = 120;
// Расчет
    const dynamicFontSize = Math.min(
        MAX_FONT_SIZE,
        Math.max(MIN_FONT_SIZE, ((width + height) / BASE_WIDTH) * BASE_FONT_SIZE)
    );
    // Состояние дерева сегментов.
    // ratio - это положение импоста от 0 до 1 (процент от доступной площади)


    /**
     * Рекурсивный расчет координат и размеров.
     * Применяет "предохранители" для ratio, чтобы импосты не уходили в ноль.
     */
    const calculateLayout = (node, x, y, w, h) => {
        if (node.type === 'glass') {
            return { ...node, x, y, w, h };
        }

        const isVert = node.splitType === 'vertical';
        const totalAvailable = isVert ? (w - impostWidth) : (h - impostWidth);

        // Ограничиваем ratio так, чтобы сегменты не были меньше minSize
        const minRatio = minSize / totalAvailable;
        const maxRatio = (totalAvailable - minSize) / totalAvailable;
        const safeRatio = Math.max(minRatio, Math.min(node.ratio, maxRatio));

        const size1 = totalAvailable * safeRatio ;
        const size2 = totalAvailable - size1;

        const child1W = isVert ? size1 : w;
        const child1H = isVert ? h : size1;
        const child2W = isVert ? size2 : w;
        const child2H = isVert ? h : size2;

        const child2X = isVert ? x + size1 + impostWidth : x;
        const child2Y = isVert ? y : y + size1 + impostWidth;

        return {
            ...node,
            x, y, w, h,
            child1: calculateLayout(node.child1, x, y, child1W, child1H),
            child2: calculateLayout(node.child2, child2X, child2Y, child2W, child2H),
            impX: isVert ? x + size1 : x,
            impY: isVert ? y : y + size1
        };
    };

    // Вычисляем финальную геометрию на каждый рендер
    const layoutTree = useMemo(() => calculateLayout(tree, 0, 0, width, height), [tree, width, height]);

    // Обработка клика по импосту для его смещения
    const handleImpostClick = (e, node) => {
        e.stopPropagation();

        const isVert = node.splitType === 'vertical';
        const totalSpace = isVert ? (node.w - impostWidth) : (node.h - impostWidth);
        const currentPx = Math.round(totalSpace * node.ratio);

        dispatch(setImpostConfigOpen(true))
        dispatch(setImpostPosition(currentPx))
        dispatch(setNode(node))

    };


    // Разделение стекла на два сегмента
    const splitSegment = (targetId) => {
        dispatch(setImpostId(targetId))
        dispatch(setConfigListOpen(true))
    };

    // Рекурсивный рендер элементов SVG
    const renderTree = (node) => {

        if (node.type === 'split'){
            const isVert = node.splitType === 'vertical';
            return (
                <g key={node.id}>

                    <rect
                        x={hp + node.impX} y={hp + node.impY}
                        width={isVert ? impostWidth : Math.max(0, node.w)}
                        height={isVert ? Math.max(0, node.h): impostWidth}
                        fill={color} stroke="#334155" strokeWidth="1"
                        className="cursor-move hover:brightness-95 transition-all"
                        onClick={(e) => handleImpostClick(e, node)}
                    />
                    {renderTree(node.child1)}
                    {renderTree(node.child2)}
                </g>
            );
        }


        if (node.type === 'glass') {
            const worldX = hp + node.x;
            const worldY = hp + node.y;
            return (
                <g key={node.id}>
                    {/* Базовое стекло / проем */}
                    <rect
                        x={worldX} y={worldY} width={Math.max(0, node.w)} height={Math.max(0, node.h)}
                        fill="#BAE6FD" fillOpacity="0.2" stroke="#94A3B8" strokeWidth="1"
                        className="cursor-pointer hover:fill-sky-100 transition-colors"
                        onClick={() => {
                            splitSegment(node.id)
                            dispatch(setGlassId(node.id))
                        }}
                    />

                    {/* Вставка створки как отдельного компонента */}
                    {node.hasSash && (
                        <Sash
                            x={worldX}
                            y={worldY}
                            w={Math.max(0, node.w)}
                            h={Math.max(0, node.h)}
                            color={color}
                            openSide={node?.dir}
                        />
                    )}


                </g>
            );
        }


    };

    // Сбор размеров для отрисовки линеек
    const getDimensions = (type) => {
        const points = [];
        const collect = (n) => {
            if (n.type === 'glass') {
                points.push({ x: n.x, y: n.y, w: n.w, h: n.h });
            } else {
                collect(n.child1);
                collect(n.child2);
            }
        };
        collect(layoutTree);

        const axis = type === 'vertical' ? 'y' : 'x'; // для верт. размеров смотрим Y, для гор. — X
        const total = type === 'vertical' ? height : width;

        // Собираем все уникальные координаты начала и КОНЦА каждого проема
        // Это важно, чтобы знать, где проем закончился, а где начался импост
        const coords = [];
        points.forEach(p => {
            if (type === 'vertical') {
                coords.push(Math.round(p.y));
                coords.push(Math.round(p.y + p.h));
            } else {
                coords.push(Math.round(p.x));
                coords.push(Math.round(p.x + p.w));
            }
        });

        // Оставляем только уникальные точки и сортируем их
        const uniqueCoords = [...new Set(coords)].sort((a, b) => a - b);

        const results = [];
        for (let i = 0; i < uniqueCoords.length - 1; i++) {
            const start = uniqueCoords[i];
            const end = uniqueCoords[i + 1];
            const distance = end - start;

            if (distance <= impostWidth + 2) continue;

            // Проверяем, является ли этот отрезок крайним
            const isFirst = i === 0;
            const isLast = i === uniqueCoords.length - 2;

            // Вычитаем hp из значения, если это крайний элемент
            // (Например, если размер должен показывать расстояние до импоста БЕЗ рамы)
            let val = distance;
            if (isFirst) val -= hp;
            if (isLast) val -= hp;

            results.push({
                pos: start + distance / 2,
                val: Math.round(val),
                start: start,
                end: end
            });
        }

        return results;
    };

    const fullW = width + hp * 2;
    const fullH = height + hp * 2;

    return (
        <div className="w-full flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-inner">
            <svg
                className="w-full max-h-[700px] overflow-visible"
                viewBox={`0 0 ${fullW + 200} ${fullH + 200}`}
                fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                {/* Внешняя рама профиля */}
                <g fill={color} stroke="#334155" strokeWidth="2">
                    <path d={`M0,0 L${fullW},0 L${fullW-hp},${hp} L${hp},${hp} Z`} />
                    <path d={`M0,${fullH} L${fullW},${fullH} L${fullW-hp},${fullH-hp} L${hp},${fullH-hp} Z`} />
                    <path d={`M0,0 L${hp},${hp} L${hp},${fullH-hp} L0,${fullH} Z`} />
                    <path d={`M${fullW},0 L${fullW-hp},${hp} L${fullW-hp},${fullH-hp} L${fullW},${fullH} Z`} />
                </g>

                {/* Содержимое окна (стекла и импосты) */}
                {renderTree(layoutTree)}

                {/* Выносные линии и размеры */}
                <g fill="#64748b" style={{ fontSize: `${dynamicFontSize}px`, fontWeight: '500', fontFamily: 'monospace' }}>
                    <g className="dimensions-bottom">
                        {getDimensions('horizontal').map((d, i) => {
                            const xStart = hp + d.start;
                            const xEnd = hp + d.end;
                            const yPos = hp + height + offset;

                            return (
                                <g key={i}>
                                    {/* Размерная линия (горизонтальная) */}
                                    <line x1={xStart} y1={yPos} x2={xEnd} y2={yPos} stroke="#64748b" strokeWidth="1" />

                                    {/* Засечки (диагональные штрихи) */}
                                    <line x1={xStart - 4} y1={yPos + 4} x2={xStart + 4} y2={yPos - 4} stroke="#475569" strokeWidth="2" />
                                    <line x1={xEnd - 4} y1={yPos + 4} x2={xEnd + 4} y2={yPos - 4} stroke="#475569" strokeWidth="2" />

                                    {/* Текст размера */}
                                    <text
                                        x={hp + d.pos}
                                        y={yPos - 8}
                                        textAnchor="middle"
                                        style={{
                                            fontSize: `${Math.max(14, (width + height) / 60)}px`,
                                            fill: '#334155', fontWeight: '600' }}
                                    >
                                        {d.val}
                                    </text>
                                </g>
                            );
                        })}

                    </g>

                    {/* Вертикальные размеры слева */}
                    <g className="dimensions-right">
                        {getDimensions('vertical').map((d, i) => {
                            const yStart = hp + d.start;
                            const yEnd = hp + d.end;
                            const xPos = hp + width + offset;

                            return (
                                <g key={i}>
                                    {/* Размерная линия (вертикальная) */}
                                    <line x1={xPos} y1={yStart} x2={xPos} y2={yEnd} stroke="#64748b" strokeWidth="1" />

                                    {/* Засечки */}
                                    <line x1={xPos - 4} y1={yStart + 4} x2={xPos + 4} y2={yStart - 4} stroke="#475569" strokeWidth="2" />
                                    <line x1={xPos - 4} y1={yEnd + 4} x2={xPos + 4} y2={yEnd - 4} stroke="#475569" strokeWidth="2" />

                                    {/* Текст размера, повернутый на 90 градусов */}
                                    <text
                                        x={xPos} // Смещение вправо от линии, чтобы текст не лежал на ней
                                        y={d.pos + 90}
                                        textAnchor="middle" // Центрируем по "длине" текста после поворота
                                        dominantBaseline="hanging" // Чтобы текст "свисал" от точки вправо
                                        transform={`rotate(90, ${xPos + 15}, ${hp + d.pos})`} // Поворот вокруг собственной точки
                                        style={{
                                            fontSize: `${Math.max(14, (width + height) / 60)}px`,
                                            fill: '#334155',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {d.val}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </g>

                {/* Общие габариты */}
                <g fill="#1e293b" style={{ fontSize: `${dynamicFontSize}px`, fontWeight: '700' }}>
                    <text style={{
                        fontSize: `${Math.max(14, (width + height) / 60)}px`,
                        fill: '#334155',
                        fontWeight: '600'
                    }}  x={fullW / 2} y={fullH + 160} textAnchor="middle">Ширина: {width} мм</text>
                    <text style={{
                        fontSize: `${Math.max(14, (width + height) / 60)}px`,
                        fill: '#334155',
                        fontWeight: '600'
                    }} x={fullW + 160} y={fullH / 2} textAnchor="middle" transform={`rotate(90, ${fullW + 160}, ${fullH / 2})`}>Высота: {height} мм</text>
                </g>

                {impostOpen && (
                    <DragGuide
                        width={width}
                        height={height}
                        hp={hp}
                    />
                )}
            </svg>
        </div>
    );
}