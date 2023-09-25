import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleContact,
  HandlePricing,
  JSON_HEADER,
  Masterhandler,
} from "../../../utils/Const";
import { setMasterData, setPosts } from "../../../Redux/Actions";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router";

const Pricing = () => {
  // State variables for inputs and form content
  const MasterData = useSelector((state) => state.handleMasterData);
  const Basic = useSelector((state) => state.handleUserBasicData);
  const Dispatch = useDispatch();
  const [pricingFirstHeading, setPricingFirstHeading] = useState("");
  const [pricingFirstParagraph, setPricingFirstParagraph] = useState("");
  const navigate =  useNavigate();

  useLayoutEffect(()=>{
    if(MasterData.prices!=null){
      for (let i = 0; i < MasterData.prices.length; i++) {
        const element = MasterData.prices[i];
        if(element.validity>30){
          setPricingFirstParagraph(element.price);
        }else{
          setPricingFirstHeading(element.price)
        }
        
      }
    }
  },[MasterData])

  const handleSubmit = () => {
    let Monthly={
      price:pricingFirstHeading,
      validity:30,
    }
    let Yearly={
      price:pricingFirstParagraph,
      validity:360,
    }

    fetch(HandlePricing,{
      method:"POST",
      headers:JSON_HEADER,
      body:JSON.stringify(Yearly)
    }).then(res=>{
      if(res.ok){
        fetch(HandlePricing,{
          method:"POST",
          headers:JSON_HEADER,
          body:JSON.stringify(Monthly)
        }).then(res=>{
          if(res.ok){
            NotificationManager.success("Plans Updated");
            loadMasterData();
          }
        })
      }
    })

  };
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
          console.log("DONE");
      })
      }
    })
  }
  return (
    <>
      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Monthly Price
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <input
            className="resize-none w-full h-[60px] px-2 py-2 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            type="number"
            value={pricingFirstHeading}
            onChange={(e) => setPricingFirstHeading(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Set monthly price
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Yearly Price
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <input
            className="resize-none w-full h-[60px] px-2 py-2 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            type="number"
            value={pricingFirstParagraph}
            onChange={(e) => setPricingFirstParagraph(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Set Yearly price
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

export default Pricing;
