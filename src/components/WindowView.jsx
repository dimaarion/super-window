import {useEffect, useState} from "react";

export default function WindowConstructor({
                                              width = 1500, // Внешний параметр ширины
                                              height = 1500, // Внешний параметр высоты
                                              heightProfile = 60,
                                              color = "#FFFFFF"
                                          }) {
    const hp = heightProfile;
    const impostWidth = 60;
    const minSize = 150;

    // Инициализируем дерево при первом рендере или сбросе
    const [tree, setTree] = useState({
        id: 'root',
        type: 'glass',
        w: width,
        h: height,
        x: 0,
        y: 0
    });

    // Эффект для обновления дерева при изменении внешних габаритов (пропорциональное масштабирование)
    useEffect(() => {
        const scaleTree = (node, newW, newH) => {
            if (node.type === 'glass') {
                return { ...node, w: newW, h: newH };
            }
            const isVert = node.splitType === 'vertical';
            // Вычисляем коэффициент изменения для сохранения пропорций при ресайзе окна
            const ratioW = newW / (node.child1.w + node.child2.w + impostWidth);
            const ratioH = newH / (node.child1.h + node.child2.h + impostWidth);

            const nextW1 = isVert ? node.child1.w * ratioW : newW;
            const nextH1 = isVert ? newH : node.child1.h * ratioH;
            const nextW2 = isVert ? node.child2.w * ratioW : newW;
            const nextH2 = isVert ? newH : node.child2.h * ratioH;

            return {
                ...node,
                w: newW,
                h: newH,
                child1: scaleTree(node.child1, nextW1, nextH1),
                child2: {
                    ...scaleTree(node.child2, nextW2, nextH2),
                    x: isVert ? node.x + nextW1 + impostWidth : node.x,
                    y: isVert ? node.y : node.y + nextH1 + impostWidth
                }
            };
        };
        setTree(prev => scaleTree(prev, width, height));
    }, [width, height]);

    const fullW = width + hp * 2;
    const fullH = height + hp * 2;

    // Логика перемещения и деления остается прежней, но использует динамические width/height
    const moveImpost = (targetId, delta) => {
        const updateTree = (node) => {
            if (node.id === targetId && node.type === 'split') {
                const isVert = node.splitType === 'vertical';
                const nextW1 = isVert ? node.child1.w + delta : node.child1.w;
                const nextH1 = isVert ? node.child1.h : node.child1.h + delta;
                const nextW2 = isVert ? node.child2.w - delta : node.child2.w;
                const nextH2 = isVert ? node.child2.h : node.child2.h - delta;

                if (isVert ? (nextW1 < minSize || nextW2 < minSize) : (nextH1 < minSize || nextH2 < minSize)) return node;

                return {
                    ...node,
                    child1: { ...node.child1, w: nextW1, h: nextH1 },
                    child2: {
                        ...node.child2, w: nextW2, h: nextH2,
                        x: isVert ? node.x + nextW1 + impostWidth : node.x,
                        y: isVert ? node.y : node.y + nextH1 + impostWidth
                    }
                };
            }
            return node.type === 'split' ? { ...node, child1: updateTree(node.child1), child2: updateTree(node.child2) } : node;
        };
        setTree(updateTree(tree));
    };

    const splitSegment = (targetId, splitType) => {
        const updateTree = (node) => {
            if (node.id === targetId) {
                const isVert = splitType === 'vertical';
                if (isVert && node.w < minSize * 2) return node;
                if (!isVert && node.h < minSize * 2) return node;

                const newW = isVert ? (node.w - impostWidth) / 2 : node.w;
                const newH = isVert ? node.h : (node.h - impostWidth) / 2;

                return {
                    ...node,
                    type: 'split',
                    splitType,
                    child1: { id: Math.random(), type: 'glass', w: newW, h: newH, x: node.x, y: node.y },
                    child2: {
                        id: Math.random(), type: 'glass', w: newW, h: newH,
                        x: isVert ? node.x + newW + impostWidth : node.x,
                        y: isVert ? node.y : node.y + newH + impostWidth
                    }
                };
            }
            return node.type === 'split' ? { ...node, child1: updateTree(node.child1), child2: updateTree(node.child2) } : node;
        };
        setTree(updateTree(tree));
    };

    const getDimensions = (type) => {
        const sizes = [];
        const collectGlass = (n) => {
            if (n.type === 'glass') sizes.push({ x: n.x, y: n.y, w: n.w, h: n.h });
            else { collectGlass(n.child1); collectGlass(n.child2); }
        };
        collectGlass(tree);

        if (type === 'vertical') {
            const xs = [...new Set(sizes.map(s => Math.round(s.x)))].sort((a, b) => a - b);
            return xs.map((x, i) => {
                const nextX = xs[i + 1] || width;
                return { pos: x + (nextX - x) / 2, val: Math.round(nextX - x), start: x, end: nextX };
            });
        } else {
            const ys = [...new Set(sizes.map(s => Math.round(s.y)))].sort((a, b) => a - b);
            return ys.map((y, i) => {
                const nextY = ys[i + 1] || height;
                return { pos: y + (nextY - y) / 2, val: Math.round(nextY - y), start: y, end: nextY };
            });
        }
    };

    const renderTree = (node) => {
        if (node.type === 'glass') {
            return (
                <rect
                    key={node.id} x={hp + node.x} y={hp + node.y} width={node.w} height={node.h}
                    fill="#BAE6FD" fillOpacity="0.4" stroke="#94A3B8" strokeWidth="1"
                    style={{ cursor: 'crosshair' }}
                    onClick={() => splitSegment(node.id, window.confirm("Разделить ВЕРТИКАЛЬНО?") ? 'vertical' : 'horizontal')}
                />
            );
        }
        const isVert = node.splitType === 'vertical';
        const impX = hp + (isVert ? node.x + node.child1.w : node.x);
        const impY = hp + (isVert ? node.y : node.y + node.child1.h);

        return (
            <g key={node.id}>
                {renderTree(node.child1)}
                {renderTree(node.child2)}
                <rect
                    x={impX} y={impY} width={isVert ? impostWidth : node.w} height={isVert ? node.h : impostWidth}
                    fill={color} stroke="#334155" strokeWidth="1"
                    style={{ cursor: 'move' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        const step = 50;
                        const delta = isVert ? (window.confirm("Сдвинуть ВПРАВО?") ? step : -step) : (window.confirm("Сдвинуть ВНИЗ?") ? step : -step);
                        moveImpost(node.id, delta);
                    }}
                />
            </g>
        );
    };

    const hDims = getDimensions('vertical');
    const vDims = getDimensions('horizontal');

    return (
        <svg
            className="h-[400px] md:h-[750px] w-auto block mx-auto overflow-visible"
            viewBox={`0 0 ${fullW + 200} ${fullH + 200}`}
            fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            {/* РАМА */}
            <g fill={color} stroke="#334155" strokeWidth="2">
                <polygon points={`0,0 ${fullW},0 ${fullW-hp},${hp} ${hp},${hp}`} />
                <polygon points={`0,${fullH} ${fullW},${fullH} ${fullW-hp},${fullH-hp} ${hp},${fullH-hp}`} />
                <polygon points={`0,0 ${hp},${hp} ${hp},${fullH-hp} 0,${fullH}`} />
                <polygon points={`${fullW},0 ${fullW-hp},${hp} ${fullW-hp},${fullH-hp} ${fullW},${fullH}`} />
            </g>

            {renderTree(tree)}

            {/* РАЗМЕРЫ СЕГМЕНТОВ */}
            <g fill="#475569" style={{ fontFamily: 'Inter, sans-serif', fontSize: '30px', fontWeight: '500' }}>
                {hDims.map((d, i) => (
                    <g key={i}>
                        <line x1={hp + d.start} y1={fullH + 110} x2={hp + d.end} y2={fullH + 110} stroke="#94A3B8" strokeWidth="2" />
                        <text x={hp + d.pos} y={fullH + 150} textAnchor="middle">{d.val}</text>
                    </g>
                ))}
                {vDims.map((d, i) => (
                    <g key={i}>
                        <line x1={fullW + 110} y1={hp + d.start} x2={fullW + 110} y2={hp + d.end} stroke="#94A3B8" strokeWidth="2" />
                        <text x={fullW + 150} y={hp + d.pos} textAnchor="middle" transform={`rotate(90, ${fullW + 150}, ${hp + d.pos})`}>{d.val}</text>
                    </g>
                ))}
            </g>

            {/* ОБЩИЕ ГАБАРИТЫ */}
            <g fill="#000" style={{ fontFamily: 'Inter, sans-serif', fontSize: '40px', fontWeight: '700' }}>
                <rect x="0" y={fullH + 30} width={fullW} height="4" />
                <text x={fullW / 2} y={fullH + 80} textAnchor="middle">{width}</text>
                <rect x={fullW + 30} y="0" width="4" height={fullH} />
                <text x={fullW + 80} y={fullH / 2} textAnchor="middle" transform={`rotate(90, ${fullW + 80}, ${fullH / 2})`}>{height}</text>
            </g>
        </svg>
    );
}