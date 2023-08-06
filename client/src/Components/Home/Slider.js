import react, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FILE_URL } from "../../utils/Const";
const Slider = () => {
    const MasterData = useSelector(state=>state.handleMasterData)
    const Userdata=useSelector(state=>state.handleUserData)
    const Basic=useSelector(state=>state.handleUserBasicData)
    const [isLogin,setLogin]=useState(Basic.isLogin);
    const [name,setName]=useState("");
    const [head1,setHead1]=useState("");
    const [head2,setHead2]=useState("");
    const [para,setPara]=useState("");
    const [hero,setHero]=useState("");

    useEffect(()=>{
        setLogin(Basic.isLogin);
        setName(Userdata.name);
    },[Basic])

    useLayoutEffect(()=>{
        if(MasterData.homeData!=null){
            let data =  MasterData.homeData;
            setHead1(data.heading);
            setHead2(data.heading2);
            setPara(data.para);
            setHero(data.webSiteHeroUrl);
        }
    },[MasterData])

    return (
        <div>
            <section>
                <div className="w-full relative pb-10 px-6 xl:px-0">
                    
                    <img className="absolute w-full inset-0 h-full object-cover object-center" src="https://cdn.tuk.dev/assets/templates/weCare/hero2-bg.png" alt="we care family" />
                    <div className="pt-10 lg:flex items-center relative z-10 container mx-auto">
                        <div className="w-full lg:w-1/2 h-full lg:pr-10 xl:pr-0">
                            <img tabIndex="0" role="img" aria-label="people smiling" className="mx-auto" src={FILE_URL+hero} alt="people smiling" />
                        </div>
                        <div role="contentinfo" className="w-full lg:w-1/2 h-full">
                            <p tabIndex="0" className="text-[#452a72] uppercase text-2xl mb-4">{head1} <span className="" style={{display:isLogin?"inline-block":"none",textDecoration:"underline", marginLeft: "8px"}}>{name}</span></p>
                            <h1 tabIndex="0" className="text-[#452a72] text-4xl lg:text-6xl font-black mb-8">{head2}</h1>
                            <p tabIndex="0" className="text-gray-800 font-regular mb-8">{para}</p>
                          
                        </div>
                    </div>
                </div>
            </section>

            <style>
                {`
            /* Top menu */
            .top-100 {
                animation: slideDown 0.5s ease-in-out;
            }
            @keyframes slideDown {
                0% {
                    top: -50%;
                }
                100% {
                    top: 0;
                }
            }
            * {
                outline: none !important;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
            }`}
            </style>
        </div>
    );
};
export default Slider;
