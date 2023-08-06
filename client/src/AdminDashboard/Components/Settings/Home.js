import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILE_HEADER, HandleHome, JSON_HEADER, Masterhandler } from '../../../utils/Const';
import { setMasterData, setPosts } from '../../../Redux/Actions';
import { NotificationManager } from 'react-notifications';

const Home = () => {
    // State variables for inputs and form content
    const MasterData=useSelector(state=>state.handleMasterData);
    const Basic=useSelector(state=>state.handleUserBasicData);
    const Dispatch = useDispatch();
    const [logo, setLogo] = useState('');
    const [heroImage, setHeroImage] = useState('');
    const [firstHeading, setFirstHeading] = useState('');
    const [secondHeading, setSecondHeading] = useState('');
    const [firstParagraph, setFirstParagraph] = useState('');
    const [privacy, setPrivacy] = useState('');
    const [refund, setRefund] = useState('');
    const [discloser, setDiscloser] = useState('');

    useLayoutEffect(()=>{
        if(MasterData.homeData!=null){
            let d =MasterData.homeData;
            setFirstHeading(d.heading)
            setSecondHeading(d.heading2)
            setFirstParagraph(d.para)
            setPrivacy(d.privacypolicy)
            setRefund(d.refundpolicy)
            setDiscloser(d.discloser)
        }
    },[MasterData])

    const handleSubmit=()=>{
        const fd = new FormData();
        fd.append("logo",logo);
        fd.append("hero",heroImage);
        fd.append("heading",firstHeading);
        fd.append("heading2",secondHeading);
        fd.append("para",firstParagraph);
        fd.append("refundpolicy",refund);
        fd.append("privacypolicy",privacy);
        fd.append("discloser",discloser);


        fetch(HandleHome,{
            method:"POST",
            headers:FILE_HEADER,
            body:fd
        }).then(res=>{
            if(res.ok){
                loadMasterData()
            }
        })
    }
    const loadMasterData=()=>{
        let data ={
          _id:Basic.uid,
          userType:Basic.userType
        }
        fetch(Masterhandler,{
          method:"POST",
          headers:JSON_HEADER,
          body:JSON.stringify(data)
        }).then(res=>{
          if(res.ok){
            res.json().then(D=>{
                Dispatch(setPosts(D.posts))
                Dispatch(setMasterData(D));
                NotificationManager.success("Updated")
                console.log("DONE");
            })
           
          }
        })
      }
    return (
        <>
         <p className="mt-3 text-xs leading-[15px] text-red-600 px-7">
                Every field is mandatory.
            </p>
            <div className="pt-6 border-gray-300 mt-2 px-7">
                <div>
                    <p className="text-base font-medium leading-none text-gray-800">
                        Website Logo
                    </p>
                    <input
                        accept="image/*"
                        type="file"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />
                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Change Website Logo
                    </p>
                </div>
            </div>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <div>
                    <p className="text-base font-medium leading-none text-gray-800">
                        Hero Image
                    </p>
                    <input
                        accept="image/*"
                        type="file"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        onChange={(e) => setHeroImage(e.target.files[0])}
                    />
                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Change Hero image
                    </p>
                </div>
            </div>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    First Heading
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={firstHeading}
                        onChange={(e) => setFirstHeading(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Home Page 1st Welcome Heading Content
            </p>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    Second Heading
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={secondHeading}
                        onChange={(e) => setSecondHeading(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Home Page 2nd heading Content
            </p>

            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    1st Paragraph Content
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={firstParagraph}
                        onChange={(e) => setFirstParagraph(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Home Page 1st paragraph Content
            </p>
            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    Privacy Policy
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Privacy Policy Content
            </p>
            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    Refund Policy
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={refund}
                        onChange={(e) => setRefund(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Refund Policy Content
            </p>
            <div className="pt-6 border-gray-300 mt-2 px-7">
                <p className="text-base font-semibold leading-4 text-gray-800">
                Disclosure
                </p>
                <div className="mt-10 border border-gray-300 rounded">
                    <textarea
                        className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
                        placeholder="Start typing here ..."
                        value={discloser}
                        onChange={(e) => setDiscloser(e.target.value)}
                    />
                </div>
            </div>
            <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
                Type Disclosure Content
            </p>
            <hr className="h-[1px] bg-gray-100 my-14"  />
                <div onClick={handleSubmit} className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                  {/* <button onClick={() => navigate("/admin/settings")} className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full ">
                                        Back
                                    </button> */}
                  <button className="bg-[#452a72] rounded hover:bg-transparent border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white hover:text-[#452a72] lg:max-w-[144px] w-full ">
                    Update
                  </button>
                </div>
        </>
    );
};

export default Home;
