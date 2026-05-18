import WindowView from "./WindowView.jsx";
import {useSelector} from "react-redux";
import ImpostConfig from "./ImpostConfig.jsx";
import ConfigList from "./ConfigList.jsx";
import WindowBuilder from "./WindowBuilder.jsx";
import {useEffect, useState} from "react";
import {exportSvgToBase64} from "../action/index.js";
import {Button} from "flowbite-react";
export default function CreateProject(){
    const windowWidth = useSelector((state) => state.windowWidth.value);
    const windowHeight = useSelector((state) => state.windowHeight.value);
    const windowColor = useSelector((state) => state.windowColor.value);
    const profileHeight = useSelector((state) => state.profileHeight.value);
    const impostWidth = useSelector((state) => state.impostWidth.value);
    const impostOpen = useSelector(state => state.impostConfigOpen.value);
    const [image, setImage] = useState(null);



    return <>
        <div className={"w-[300px]"}>
            <img src={image}  alt={"sss"}/>
        </div>

        <div className={"w-1/2 justify-center hidden lg:flex"}>
            <WindowBuilder />
        </div>
        <div className={"w-full overflow-auto"}>
            <div className={"justify-center flex-wrap px-4"}>
                <div className={"p-2 bg-gray-950 justify-between flex w-full mt-6 z-20 relative text-gray-50"}>
                    <div className={"border-r-2 border-gray-500 p-2 cursor-pointer w-full flex justify-center"}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M0 4L0 2C0 1.44772 0.195262 0.976311 0.585786 0.585786C0.976311 0.195262 1.44772 0 2 0L16 0C16.5523 0 17.0237 0.195262 17.4142 0.585786C17.8047 0.976311 18 1.44772 18 2L18 14C18 14.5523 17.8047 15.0237 17.4142 15.4142C17.0237 15.8047 16.5523 16 16 16L2 16C1.44772 16 0.976311 15.8047 0.585786 15.4142C0.195262 15.0237 0 14.5523 0 14L0 4Z" fill="none" strokeWidth="2" stroke="#FFFFFF" strokeLinejoin="round" transform="translate(3 4)" />
                                <path d="M0 0L18 0" fill="none" strokeWidth="2" stroke="#FFFFFF" transform="translate(3 11)" />
                                <path d="M0 0L0 16" fill="none" strokeWidth="2" stroke="#3B82F6" strokeLinejoin="round" transform="translate(12 4)" />
                            </g>
                        </svg>
                    </div>
                    <div className={"border-r-2 border-gray-500 p-2 cursor-pointer w-full flex justify-center"}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z" fill="none" strokeWidth="2" stroke="#FFFFFF" transform="translate(9 9)" />
                                <path d="M18.4 14C18.1277 14.6171 18.2583 15.3378 18.73 15.82C18.73 15.82 18.79 15.88 18.79 15.88C19.2958 16.3855 19.4935 17.1224 19.3085 17.8132C19.1235 18.5039 18.5839 19.0435 17.8932 19.2285C17.2024 19.4135 16.4655 19.2158 15.96 18.71C15.96 18.71 15.9 18.65 15.9 18.65C15.4178 18.1783 14.6971 18.0476 14.08 18.32C13.4755 18.5791 13.0826 19.1724 13.08 19.83C13.08 19.83 13.08 20 13.08 20C13.08 21.1046 12.1846 22 11.08 22C9.97543 22 9.08 21.1046 9.08 20C9.08 20 9.08 19.91 9.08 19.91C9.06415 19.2327 8.63587 18.6339 8 18.4C7.38291 18.1277 6.66218 18.2583 6.18 18.73C6.18 18.73 6.12 18.79 6.12 18.79C5.61453 19.2958 4.87755 19.4935 4.18681 19.3085C3.49606 19.1235 2.95652 18.5839 2.77152 17.8932C2.58652 17.2024 2.78418 16.4655 3.29 15.96C3.29 15.96 3.35 15.9 3.35 15.9C3.82166 15.4178 3.95234 14.6971 3.68 14.08C3.42093 13.4755 2.82764 13.0826 2.17 13.08C2.17 13.08 2 13.08 2 13.08C0.89543 13.08 0 12.1846 0 11.08C1.19209e-07 9.97543 0.895431 9.08 2 9.08C2 9.08 2.09 9.08 2.09 9.08C2.76733 9.06415 3.36613 8.63587 3.6 8C3.87235 7.38291 3.74167 6.66219 3.27 6.18C3.27 6.18 3.21 6.12 3.21 6.12C2.70418 5.61453 2.50653 4.87756 2.69153 4.18681C2.87653 3.49606 3.41606 2.95653 4.10681 2.77153C4.79756 2.58653 5.53453 2.78418 6.04 3.29C6.04 3.29 6.1 3.35 6.1 3.35C6.58219 3.82167 7.30291 3.95235 7.92 3.68C7.92 3.68 8 3.68 8 3.68C8.60447 3.42093 8.99738 2.82764 9 2.17C9 2.17 9 2 9 2C9 0.89543 9.89543 0 11 0C12.1046 0 13 0.895431 13 2C13 2 13 2.09 13 2.09C13.0026 2.74761 13.3955 3.34091 14 3.59999C14.6171 3.87233 15.3378 3.74165 15.82 3.26999C15.82 3.26999 15.88 3.20999 15.88 3.20999C16.3854 2.70416 17.1224 2.50651 17.8132 2.69151C18.5039 2.87651 19.0434 3.41605 19.2284 4.1068C19.4134 4.79754 19.2158 5.53451 18.71 6.03999C18.71 6.03999 18.65 6.09999 18.65 6.09999C18.1783 6.58217 18.0476 7.3029 18.32 7.91999C18.32 7.91999 18.32 8 18.32 8C18.579 8.60447 19.1723 8.99738 19.83 9C19.83 9 20 9 20 9C21.1046 9 22 9.89543 22 11C22 12.1046 21.1046 13 20 13C20 13 19.91 13 19.91 13C19.2524 13.0026 18.6591 13.3955 18.4 14C18.4 14 18.4 14 18.4 14Z" fill="none" strokeWidth="2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 1)" />
                            </g>
                        </svg>
                    </div>
                    <div className={"p-2 cursor-pointer w-full flex justify-center"}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M0 4L0 2C0 1.44772 0.195262 0.976311 0.585786 0.585786C0.976311 0.195262 1.44772 0 2 0L14 0C14.5523 0 15.0237 0.195262 15.4142 0.585786C15.8047 0.976311 16 1.44772 16 2L16 16C16 16.5523 15.8047 17.0237 15.4142 17.4142C15.0237 17.8047 14.5523 18 14 18L2 18C1.44772 18 0.976311 17.8047 0.585786 17.4142C0.195262 17.0237 0 16.5523 0 16L0 4Z" fill="none" strokeWidth="2" stroke="#FFFFFF" strokeLinejoin="round" transform="translate(4 3)" />
                                <path d="M0 0L8 0" fill="none" strokeWidth="2" stroke="#3B82F6" strokeLinecap="round" transform="translate(8 8)" />
                                <path d="M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1Z" fill="#3B82F6" fillRule="evenodd" transform="translate(7 7)" />
                                <path d="M0 0L8 0" fill="none" strokeWidth="2" stroke="#FFFFFF" strokeLinecap="round" transform="translate(8 12)" />
                                <path d="M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1Z" fill="#FFFFFF" fillRule="evenodd" transform="translate(7 11)" />
                                <path d="M0 0L5 0" fill="none" strokeWidth="2" stroke="#FFFFFF" strokeLinecap="round" transform="translate(8 16)" />
                                <path d="M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1Z" fill="#FFFFFF" fillRule="evenodd" transform="translate(7 15)" />
                            </g>
                        </svg>
                    </div>
                    <div className={"p-2 cursor-pointer w-full flex justify-center"}>
                        <Button onClick={()=>{
                            let svg = document.querySelector("#window-project");
                            if(svg){


                                console.log(exportSvgToBase64(svg))
                                setImage(exportSvgToBase64(svg))
                            }

                        }}>
                            Сохранить
                        </Button>
                    </div>
                </div>
                <WindowView  width={windowWidth} height={windowHeight} heightProfile={profileHeight} color={windowColor}/>
                <div className={"w-full justify-center flex lg:hidden"}>
                    <div className={"w-full mt-6 flex justify-center bg-gray-700 shadow-2xl border-2 border-gray-500 shadow-black"}>
                    </div>
                </div>
            </div>
        </div>
        <div className={"w-1/2 justify-center hidden lg:flex"}>
            <div className={"w-full mt-6 flex justify-center bg-gray-700 shadow-2xl border-2 border-gray-500 shadow-black"}>
            </div>
        </div>
        {impostOpen ? <ImpostConfig impostWidth={impostWidth}/> : ""}
        <ConfigList/>

    </>
}