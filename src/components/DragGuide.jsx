import {useSelector} from "react-redux";

const DragGuide = ({width, height, hp }) => {
    const offset = 45; // На каком расстоянии от рамы рисовать линии

    const currentX = useSelector((state)=>state.impostPosition.value)
    const currentY = useSelector((state)=>state.impostPosition.value)
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const node = useSelector(state => state.node.value);
    const type = node.splitType
console.log(currentX + profileHeight)
    return (
        <g style={{ pointerEvents: 'none' }}>
            {/* 1. ГОРИЗОНТАЛЬНАЯ ЛИНИЯ (Снизу) */}
            {type === 'vertical' && (
                <g>
                    {/* Линия от левого края до импоста */}
                    <line
                        x1={0}
                        y1={profileHeight}
                        x2={currentX + profileHeight}
                        y2={profileHeight}
                        stroke="#ef4444"
                        strokeWidth="4"
                    />
                </g>
            )}

            {/* 2. ВЕРТИКАЛЬНАЯ ЛИНИЯ (Справа) */}
            {type === 'horizontal' && (
                <g>
                    {/* Линия от верха до импоста */}
                    <line
                        x1={profileHeight}
                        y1={0}
                        x2={profileHeight}
                        y2={currentX + profileHeight}
                        stroke="#ef4444"
                        strokeWidth="4"
                    />
                </g>
            )}
        </g>
    );
};

export default DragGuide;