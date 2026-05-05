export default function WindowView({width = 1500, height = 1500, heightProfile = 60}){


    return <>
        <svg className={"justify-items-center"} width="500" height="500" viewBox={`${-width / 2} ${-width / 2} ${width * 2} ${height * 2}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect width={heightProfile} height={height + heightProfile} fill="#FFFFFF" fillRule="evenodd" x={0} y={0} />


                <rect width={width + heightProfile} height={heightProfile} fill="#FFFFFF" fillRule="evenodd" x={0} y={0} />
            </g>
            <g>
                <rect width={heightProfile} height={height + heightProfile} fill="#FFFFFF" fillRule="evenodd" x={width} y={0} />
              {/*  <rect width={5} height={height + heightProfile} fill="#000" fillRule="evenodd" x={width + heightProfile + 20} y={0} />*/}
            </g>
            <g>
                <rect width={width + heightProfile} height={heightProfile} fill="#FFFFFF" fillRule="evenodd" x={0} y={height} />
               {/* <rect width={width + heightProfile} height={5} fill="#000" fillRule="evenodd" x={0} y={height + heightProfile + 20} />*/}

            </g>
        </svg>
    </>
}