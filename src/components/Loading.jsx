import { useEffect, useState } from "react";

export default function Loading() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        let animationFrameId;

        const updateAnimation = () => {
            setStep((prev) => {
                const next = prev + 2; // Скорость вращения (изменяйте этот шаг)
                // Когда полный цикл (3 квадрата по 90° = 270°) пройден,
                // плавно переходим на следующий круг без рывка
                return next >= 270 ? next - 270 : next;
            });
            animationFrameId = requestAnimationFrame(updateAnimation);
        };

        animationFrameId = requestAnimationFrame(updateAnimation);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Вычисляем угол для каждого квадрата на основе общего шага (от 0 до 270)
    // Каждому квадрату достается свой диапазон в 90 градусов
    const count3 = Math.min(Math.max(step, 0), 90);          // Шаг от 0 до 90
    const count2 = Math.min(Math.max(step - 90, 0), 90);     // Шаг от 90 до 180
    const count = Math.min(Math.max(step - 180, 0), 90);     // Шаг от 180 до 270

    return (
        <>
            <svg width="425" height="425" viewBox="-100 -100 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(5 5)">
                    {/* Первый квадрат (вращается с 0° до 90°) */}
                    <g transform={`translate(0 215) rotate(${count3} 208 -8)`}>
                        <rect width="200" height="200" fill="#BAFFF6" />
                        <rect  opacity={0.9} width="200" height="200" fill="none" strokeWidth={10} stroke="#22BFBF" />
                    </g>


                     {/*Второй квадрат (вращается, пока общий шаг идет от 90° до 180°)*/}
                    <g  transform={`translate(215 0) rotate(${count} -8 208)`}>
                        <rect width="200" height="200" fill="#BAFFF6" />
                        <rect  opacity={0.9} width="200" height="200" fill="none" strokeWidth={10} stroke="#22BFBF" />
                    </g>


                    {/* Третий квадрат (вращается, пока общий шаг идет от 180° до 270°)*/}
                    <g transform={`translate(215 215) rotate(${count2} -8 -8)`}>
                        <rect width="200" height="200" fill="#BAFFF6" />
                        <rect  opacity={0.9} width="200" height="200" fill="none" strokeWidth={10} stroke="#22BFBF" />
                    </g>

                </g>
            </svg>
        </>
    );
}