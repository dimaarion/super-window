import {useDispatch, useSelector} from "react-redux";
import {setWindowGlass, setWindowSash} from "../features/windows.js";
import {useEffect} from "react";

const Sash = ({
                  x, y, w, h,
                  color = "#FFFFFF",
                  overlap = 24,
                  sashWidth = 65,
                  openSide = 'left',
                  id,
                  node
              }) => {
    const dispatch = useDispatch();
    const tree = useSelector(state => state.tree.value);
    // Внешние габариты створки (с наплавом)
    const sx = x - overlap;
    const sy = y - overlap;
    const sw = w + (overlap * 2);
    const sh = h + (overlap * 2);

    const isLeft = openSide === 'left';

    // Параметры петель
    const hingeW = 12;
    const hingeH = 45;
    const hOffset = 60; // Отступ от углов

    // 1. Позиция петель (снаружи профиля, нахлест на раму)
    // Если петли слева, они смещены чуть левее края створки
    const hingeX = isLeft ? sx - (hingeW / 2) : sx + sw - (hingeW / 2);

    // 2. Позиция ручки (строго по центру профиля створки)
    const handleX = isLeft
        ? sx + sw - (sashWidth / 2)  // Центр правого профиля
        : sx + (sashWidth / 2);      // Центр левого профиля
    const handleY = sy + sh / 2;
    useEffect(() => {
        dispatch(setWindowSash({id:id,width:sw,height:sh}))
        dispatch(setWindowGlass({id:id,width:Math.max(0, sw - (sashWidth * 2)),height:Math.max(0, sh - (sashWidth * 2))}))

    }, [sashWidth, sw, sh, dispatch,tree,id,sy,sx]);

    return (
        <g className="sash-component" style={{ pointerEvents: 'none' }}>
            {/* ПРОФИЛЬ СТВОРКИ */}

            <g  fill={color} stroke="#000" strokeWidth="1.5">
                <path d={`M${sx},${sy} L${sx + sw},${sy} L${sx + sw - sashWidth},${sy + sashWidth} L${sx + sashWidth},${sy + sashWidth} Z`} />
                <path d={`M${sx},${sy + sh} L${sx + sw},${sy + sh} L${sx + sw - sashWidth},${sy + sh - sashWidth} L${sx + sashWidth},${sy + sh - sashWidth} Z`} />
                <path d={`M${sx},${sy} L${sx + sashWidth},${sy + sashWidth} L${sx + sashWidth},${sy + sh - sashWidth} L${sx},${sy + sh} Z`} />
                <path d={`M${sx + sw},${sy} L${sx + sw - sashWidth},${sy + sashWidth} L${sx + sw - sashWidth},${sy + sh - sashWidth} L${sx + sw},${sy + sh} Z`} />
            </g>

            {/* СТЕКЛОПАКЕТ */}
            <rect
                x={sx + sashWidth} y={sy + sashWidth}
                width={Math.max(0, sw - (sashWidth * 2))} height={Math.max(0, sh - (sashWidth * 2))}
                fill="#7DD3FC" fillOpacity="1" stroke="#94A3B8" strokeWidth="0.5"
            />

            {/* ПЕТЛИ (Снаружи створки) */}
            <g fill="#CBD5E1" stroke="#475569" strokeWidth="1">
                <rect x={hingeX} y={sy + hOffset} width={hingeW} height={hingeH} rx={1} />
                <rect x={hingeX} y={sy + sh - hOffset - hingeH} width={hingeW} height={hingeH} rx={1} />
            </g>



            {/* РУЧКА (По центру профиля) */}
            <g transform={`translate(${handleX}, ${handleY})`}>
                {/* Розетка ручки (центрирована по handleX) */}
                <rect x="-15" y="-18" width="30" height="70" rx={2} fill="#ccc" stroke="#475569" strokeWidth="1" />
                <rect x="-10" y="5" width="20" height="100" rx={2} fill="#ccc" stroke="#475569" strokeWidth="1" />
                {/* Сама рукоятка */}
            </g>
            {/* ЛИНИИ ОТКРЫТИЯ */}
            <g fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="6,4" opacity="1">
                <path d={`M${isLeft ? sx + sashWidth : sx + sw - sashWidth},${sy + sashWidth} 
                          L${isLeft ? sx + sw - sashWidth : sx + sashWidth},${sy + sh / 2} 
                          L${isLeft ? sx + sashWidth : sx + sw - sashWidth},${sy + sh - sashWidth}`} />
                <path d={`M${sx + sashWidth},${sy + sh - sashWidth} L${sx + sw / 2},${sy + sashWidth} L${sx + sw - sashWidth},${sy + sh - sashWidth}`} />
            </g>
        </g>
    );
};
export default Sash