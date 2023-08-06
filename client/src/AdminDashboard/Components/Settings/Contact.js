import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HandleContact,JSON_HEADER,Masterhandler } from '../../../utils/Const';
import { setMasterData, setPosts } from '../../../Redux/Actions';
import { NotificationManager } from 'react-notifications';
const Contact = () => {
  // State variables for inputs and form content
  const MasterData=useSelector(state=>state.handleMasterData);
  const Basic=useSelector(state=>state.handleUserBasicData);
  const Dispatch = useDispatch();
  const [contactFirstHeading, setContactFirstHeading] = useState('');
  const [contactFirstParagraph, setContactFirstParagraph] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useLayoutEffect(()=>{
    if(MasterData.contactData!=null){
      setContactFirstHeading(MasterData.contactData.heading);
      setContactFirstParagraph(MasterData.contactData.para);
      setContactAddress(MasterData.contactData.address);
      setContactEmail(MasterData.contactData.email);
      setContactPhone(MasterData.contactData.contact);
    }
  },[MasterData])

  const handleSubmit=()=>{
        let data ={
          heading:contactFirstHeading,
          para:contactFirstParagraph,
          address:contactAddress,
          email:contactEmail,
          contact:contactPhone
        }
        fetch(HandleContact,{
          method:"POST",
          headers:JSON_HEADER,
          body:JSON.stringify(data)
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
      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          First Heading
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[80px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={contactFirstHeading}
            onChange={(e) => setContactFirstHeading(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type Contact Page 1st heading Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-semibold leading-4 text-gray-800">
          1st Paragraph Content
        </p>
        <div className="mt-10 border border-gray-300 rounded">
          <textarea
            className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600"
            placeholder="Start typing here ..."
            value={contactFirstParagraph}
            onChange={(e) => setContactFirstParagraph(e.target.value)}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-[15px] text-gray-600 px-7">
        Type Contact Page 1st paragraph Content
      </p>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-medium leading-none text-gray-800">
          Address
        </p>
        <input
          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          value={contactAddress}
          onChange={(e) => setContactAddress(e.target.value)}
        />
        <p className="mt-3 text-xs leading-3 text-gray-600">
          Update Your Address
        </p>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-medium leading-none text-gray-800">
          Email
        </p>
        <input
          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <p className="mt-3 text-xs leading-3 text-gray-600">
          Update Your Email
        </p>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <p className="text-base font-medium leading-none text-gray-800">
          Contact No
        </p>
        <input
          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <p className="mt-3 text-xs leading-3 text-gray-600">
          Update Your Phone No
        </p>
      </div>
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

export default Contact;
