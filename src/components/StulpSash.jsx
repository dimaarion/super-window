import {setGlassId} from "../features/glassId.js";
import {setConfigListOpen} from "../features/configListOpen.js";
import {useDispatch} from "react-redux";
import {setStulpOpenConfig} from "../features/shtulpWindows.js";

/**
 * StulpSash - Компонент двух штульповых створок.
 * Разделяет доступное пространство на активную и пассивную створки
 * и рисует треугольники направления открывания (фурнитурные линии).
 */
export default function StulpSash({
                                      x = 0,               // Координата X левого верхнего угла проема
                                      y = 0,               // Координата Y левого верхнего угла проема
                                      w = 600,             // Общая ширина проема (мм)
                                      h = 1200,            // Общая высота проема (мм)
                                      sashWidth = 60,      // Ширина профиля створки (мм)
                                      overlap = 8,         // Нахлест створки на раму (размер фальца / наплава)
                                      color = "#FFFFFF",   // Цвет профиля створки
                                      activeSide = "left", // Какая створка активная: 'left' или 'right'
                                      activeDir = "turn",  // Тип открывания активной створки: 'turn' (поворотное), 'tiltTurn' (поворотно-откидное)
                                      passiveDir = "turn", // Тип открывания пассивной створки: обычно 'turn' (только поворотное)
                                      id
                                  }) {
    const dispatch = useDispatch()

    // 1. Расчет геометрии. Штульп делит проем ровно пополам (в стандартном исполнении).
    const halfW = w / 2;
    const stulpWidth = 24; // Видимая ширина штульпового штуцера (накладки) посередине

    // Координаты левой створки
    const leftSash = {
        x: x - overlap,
        y: y - overlap,
        w: halfW + overlap - (stulpWidth / 2),
        h: h + overlap * 2
    };

    // Координаты правой створки
    const rightSash = {
        x: x + halfW + (stulpWidth / 2),
        y: y - overlap,
        w: halfW + overlap - (stulpWidth / 2),
        h: h + overlap * 2
    };

    // Точные координаты самого штульпа (вертикальный нащельник)
    // Он крепится к пассивной створке, но визуально находится строго по центру
    const stulpX = x + halfW - (stulpWidth / 2);
    const stulpY = y - overlap;
    const stulpH = h + overlap * 2;

    /**
     * Вспомогательная функция для отрисовки линий открывания (треугольников)
     * Линии ведут от петель к точке, где находится ручка (замок).
     */
    const renderOpeningLines = (sashX, sashY, sashW, sashH, side, dir) => {
        const sw = sashWidth; // отступ до внутреннего стекла створки
        const gx = sashX + sw;
        const gy = sashY + sw;
        const gw = Math.max(0, sashW - sw * 2);
        const gh = Math.max(0, sashH - sw * 2);

        // Координаты углов внутреннего стеклопакета створки
        const topLeft = `${gx},${gy}`;
        const bottomLeft = `${gx},${gy + gh}`;
        const topRight = `${gx + gw},${gy}`;
        const bottomRight = `${gx + gw},${gy + gh}`;
        const midLeft = `${gx},${gy + gh / 2}`;
        const midRight = `${gx + gw},${gy + gh / 2}`;
        const midTop = `${gx + gw / 2},${gy}`;

        const paths = [];

        // Поворотное открывание (зависит от стороны расположения петель)
        if (dir === 'turn' || dir === 'tiltTurn') {
            if (side === 'left') {
                // Петли слева, ручка справа (линии сходятся к середине правой стороны)
               // paths.push(`M${topLeft} L${midRight} L${bottomLeft}`);
            } else if (side === 'right') {
                // Петли справа, ручка слева (линии сходятся к середине левой стороны)
               // paths.push(`M${topRight} L${midLeft} L${bottomRight}`);
            }
        }

        // Откидное открывание (дополнительные линии к верхней части, если створка поворотно-откидная)
        if (dir === 'tiltTurn') {
            // Линии идут от нижних углов (где откидные ножницы) к центру верха
            paths.push(`M${bottomLeft} L${midTop} L${bottomRight}`);
        }

        return paths.map((d, index) => (
            <path
                key={index}
                d={d}
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeDasharray="4,4" // Пунктирные линии фурнитуры
                pointerEvents="none"
            />
        ));
    };

    return (
        <g onClick={()=>{
            dispatch(setGlassId(id))
            dispatch(setConfigListOpen(true))
            dispatch(setStulpOpenConfig(true))
        }} className="stulp-sash-group">
            {/* --- ЛЕВАЯ СТВОРКА --- */}
            <g>
                {/* Наружный профиль створки */}
                <rect
                    x={leftSash.x} y={leftSash.y} width={leftSash.w} height={leftSash.h}
                    fill={color} stroke="#000" strokeWidth="1.5"
                />

                {/* Внутреннее заполнение (стеклопакет створки) */}
                <rect
                    x={leftSash.x + sashWidth} y={leftSash.y + sashWidth}
                    width={Math.max(0, leftSash.w - sashWidth * 2)}
                    height={Math.max(0, leftSash.h - sashWidth * 2)}
                    fill="#7DD3FC" fillOpacity="1" stroke="#94A3B8" strokeWidth="0.5"
                />

                {activeSide === "left"?<g transform={`translate(${leftSash.x + leftSash.w - sashWidth / 2}, ${leftSash.y + leftSash.h / 2})`}>
                    {/* Розетка ручки (центрирована по handleX) */}
                    <rect x="-15" y="-18" width="30" height="70" rx={2} fill="#ccc" stroke="#475569" strokeWidth="1"/>
                    <rect x="-10" y="5" width="20" height="100" rx={2} fill="#ccc" stroke="#475569" strokeWidth="1"/>
                    {/* Сама рукоятка */}
                </g>:""}
                {/* спайка */}
                <g transform={`translate(${leftSash.x}, ${leftSash.y})`}>
                    <line x1={0} y1={0} x2={sashWidth} y2={sashWidth} stroke={"black"} strokeWidth="1.5"  />
                    <line x1={leftSash.w} y1={0} x2={leftSash.w - sashWidth} y2={sashWidth} stroke={"black"} strokeWidth="1.5" />
                    <line x1={sashWidth} y1={leftSash.h - sashWidth} x2={0} y2={leftSash.h} stroke={"black"} strokeWidth="1.5" />
                    <line x1={leftSash.w} y1={leftSash.h} x2={leftSash.w - sashWidth} y2={leftSash.h- sashWidth} stroke={"black"} strokeWidth="1.5" />
                    {/* Линии открытия */}
                    <line x1={sashWidth} y1={sashWidth} x2={leftSash.w - sashWidth} y2={(leftSash.h + sashWidth) / 2} stroke={"black"} strokeWidth="1"  />
                    <line x1={leftSash.w - sashWidth} y1={(leftSash.h + sashWidth) / 2} x2={sashWidth} y2={leftSash.h - sashWidth} stroke={"black"} strokeWidth="1"  />
                </g>
                {/* Линии открывания левой створки */}
                {renderOpeningLines(
                    leftSash.x, leftSash.y, leftSash.w, leftSash.h,
                    activeSide === 'left' ? 'left' : 'right', // Если активная слева, то петли у неё СЛЕВА, у пассивной СПРАВА
                    activeSide === 'left' ? activeDir : passiveDir
                )}
            </g>

            {/* --- ПРАВАЯ СТВОРКА --- */}
            <g>
                {/* Наружный профиль створки */}
                <rect
                    x={rightSash.x} y={rightSash.y} width={rightSash.w} height={rightSash.h}
                    fill={color} stroke="#000" strokeWidth="1.5"
                />
                {/* Внутреннее заполнение (стеклопакет створки) */}
                <rect
                    x={rightSash.x + sashWidth} y={rightSash.y + sashWidth}
                    width={Math.max(0, rightSash.w - sashWidth * 2)}
                    height={Math.max(0, rightSash.h - sashWidth * 2)}
                    fill="#7DD3FC" fillOpacity="1" stroke="#94A3B8" strokeWidth="0.5"
                />

                {/* Рукоятка */}
                {activeSide === "right"?<g transform={`translate(${rightSash.x + sashWidth / 2}, ${rightSash.y + rightSash.h / 2})`}>
                    {/* Розетка ручки (центрирована по handleX) */}
                    <rect x="-15" y="-18" width="30" height="70" rx={2} fill="#ccc" stroke="#475569" strokeWidth="1"/>
                    <rect x="-10" y="5" width="20" height="100" rx={2} fill="#ccc" stroke="#475569" strokeWidth="1"/>
                    {/* Сама рукоятка */}
                </g>:""}
                {/* спайка */}
                <g transform={`translate(${rightSash.x}, ${rightSash.y})`}>
                    <line x1={0} y1={0} x2={sashWidth} y2={sashWidth} stroke={"black"} strokeWidth="1.5"  />
                    <line x1={rightSash.w} y1={0} x2={rightSash.w - sashWidth} y2={sashWidth} stroke={"black"} strokeWidth="1.5" />
                    <line x1={sashWidth} y1={rightSash.h - sashWidth} x2={0} y2={rightSash.h} stroke={"black"} strokeWidth="1.5" />
                    <line x1={rightSash.w} y1={rightSash.h} x2={rightSash.w - sashWidth} y2={rightSash.h- sashWidth} stroke={"black"} strokeWidth="1.5" />
                    {/* Линии открытия */}
                    <line x1={rightSash.w - sashWidth} y1={sashWidth} x2={sashWidth} y2={(rightSash.h + sashWidth) / 2} stroke={"black"} strokeWidth="1"  />
                    <line x1={sashWidth} y1={(rightSash.h + sashWidth) / 2} x2={rightSash.w - sashWidth} y2={rightSash.h - sashWidth} stroke={"black"} strokeWidth="1"  />
                </g>
                {/* Линии открывания правой створки */}
                {renderOpeningLines(
                    rightSash.x, rightSash.y, rightSash.w, rightSash.h,
                    activeSide === 'right' ? 'right' : 'left', // Направление петель
                    activeSide === 'right' ? activeDir : passiveDir
                )}
            </g>

            {/* --- ШТУЛЬП (Центральный ложный импост-нащельник) --- */}
            <rect
                x={stulpX} y={stulpY} width={stulpWidth} height={stulpH}
                fill={color} stroke="#334155" strokeWidth="1"
                filter="drop-shadow(1px 0px 2px rgba(0,0,0,0.15))" // Создает визуальный эффект накладки
            />
            {/* Осевая декоративная линия штульпа */}
            <line
                x1={stulpX + stulpWidth / 2} y1={stulpY}
                x2={stulpX + stulpWidth / 2} y2={stulpY + stulpH}
                stroke="#cbd5e1" strokeWidth="1"
            />

        </g>
    );
}