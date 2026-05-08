import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setImpostConfigOpen} from "../features/impostConfigOpen.js";
import {setImpostPosition} from "../features/ImpostPosition.js";
import {setNode} from "../features/node.js";
import {setImpostId} from "../features/impostId.js";
import {setConfigListOpen} from "../features/configListOpen.js";
import Sash from "./Sash.jsx";
import {setGlassId} from "../features/glassId.js";

/**
 * WindowView - Компонент динамического чертежа окна.
 * Позволяет делить сегменты и перемещать импосты по клику.
 */
export default function WindowView({
                                       width = 1500,        // Ширина проема (мм)
                                       height = 1500,       // Высота проема (мм)
                                       heightProfile = 60,  // Ширина рамы (мм)
                                       color = "#FFFFFF"    // Цвет профиля
                                   }) {
    const tree = useSelector(state => state.tree.value);
    const dispatch = useDispatch()
    const hp = heightProfile;
    const impostWidth = 60; // Ширина перегородки (импоста)
    const minSize = 0;    // Минимально допустимый размер стеклопакета
    const BASE_WIDTH = 1500;
    const BASE_FONT_SIZE = 50;
    const MIN_FONT_SIZE = 20;
    const MAX_FONT_SIZE = 60;

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

        const size1 = totalAvailable * safeRatio;
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
                        width={isVert ? impostWidth : node.w}
                        height={isVert ? node.h : impostWidth}
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
                        x={worldX} y={worldY} width={node.w} height={node.h}
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
                            w={node.w}
                            h={node.h}
                            color={color}
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
            if (n.type === 'glass') points.push({ x: n.x, y: n.y, w: n.w, h: n.h });
            else { collect(n.child1); collect(n.child2); }
        };
        collect(layoutTree);

        const axis = type === 'vertical' ? 'x' : 'y';
        const sizeKey = type === 'vertical' ? 'w' : 'h';
        const total = type === 'vertical' ? width : height;

        const coords = [...new Set(points.map(p => Math.round(p[axis])))].sort((a, b) => a - b);
        return coords.map((c, i) => {
            const next = coords[i + 1] || total;
            return { pos: c + (next - c) / 2, val: Math.round(next - c), start: c, end: next };
        });
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
                    {getDimensions('vertical').map((d, i) => (
                        <g key={i}>
                            <line x1={hp + d.start} y1={fullH + 50} x2={hp + d.end} y2={fullH + 50} stroke="#cbd5e1" strokeWidth="2" />
                            <text  x={hp + d.pos} y={fullH + 90} textAnchor="middle">{d.val}</text>
                        </g>
                    ))}
                    {getDimensions('horizontal').map((d, i) => (
                        <g key={i}>
                            <line x1={fullW + 50} y1={hp + d.start} x2={fullW + 50} y2={hp + d.end} stroke="#cbd5e1" strokeWidth="2" />
                            <text  x={fullW + 85} y={hp + d.pos} textAnchor="middle" transform={`rotate(90, ${fullW + 85}, ${hp + d.pos})`}>{d.val}</text>
                        </g>
                    ))}
                </g>

                {/* Общие габариты */}
                <g fill="#1e293b" style={{ fontSize: `${dynamicFontSize}px`, fontWeight: '700' }}>
                    <text  x={fullW / 2} y={fullH + 160} textAnchor="middle">Ширина: {width} мм</text>
                    <text  x={fullW + 160} y={fullH / 2} textAnchor="middle" transform={`rotate(90, ${fullW + 160}, ${fullH / 2})`}>Высота: {height} мм</text>
                </g>
            </svg>

            <div className="mt-6 p-3 bg-white border border-slate-200 rounded text-sm text-slate-600">
                <p>💡 <b>Клик по стеклу:</b> разделить на две части.</p>
                <p>💡 <b>Клик по импосту:</b> задать точное смещение.</p>
            </div>
        </div>
    );
}