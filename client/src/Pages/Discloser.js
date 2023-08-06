import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'



const Discloser = () => {
    const MasterData = useSelector(state=>state.handleMasterData);
    const [value,setValue]=useState("");
    useLayoutEffect(()=>{
        if(MasterData.homeData!=null){
            setValue(MasterData.homeData.discloser)
        }
    },[MasterData])
    const rawMarkup=()=>{
        var rawMarkup = value
        return { __html: rawMarkup };
    }
    return (
        <div
            id="about"
            className="sm:p-10 md:pt-20 md:px-24 sm:p-10  "
        >
            <section className="about-us container mx-auto">
                <div
                    id="scroll-dialog-description"
                >
                   <div dangerouslySetInnerHTML={rawMarkup()} />
                </div>

            </section>
        </div>
    )
}

export default Discloser
