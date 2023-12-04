import React from "react";
import { useRef } from "react";

const Sliderauto=({children,width,isflex})=>{
    const contentBoxRef = useRef()

    const scrollRight = ()=>{
      contentBoxRef.current.scrollLeft += width;
    }
    const scrollLeft = ()=>{
      contentBoxRef.current.scrollLeft -= width;
    }

    return(<>
    <div className="flex my-4">
        <button className='text-white text-xl hidden md:block' onClick={scrollLeft}>
            scroll left
        </button>
        <div className={`${isflex}  md:flex overflow-scroll scrollbar-none transition-all gap-3`} ref={contentBoxRef}>

            {children}

        </div>
        <div className='text-white text-xl hidden md:block'>
            scroll right
        </div>  

    </div>
    </>)
}

export default Sliderauto;