import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILE_HEADER, HandleContact,HandleSign,JSON_HEADER,Masterhandler } from '../../../utils/Const';
import { setMasterData, setPosts } from '../../../Redux/Actions';
import { NotificationManager } from 'react-notifications';

const Auth = () => {
  // State variables for images
  const MasterData=useSelector(state=>state.handleMasterData);
  const Basic=useSelector(state=>state.handleUserBasicData);
  const Dispatch = useDispatch();
  const [authProSignUpImage, setAuthProSignUpImage] = useState('');
  const [authFreeSignUpImage, setAuthFreeSignUpImage] = useState('');
  const [authLoginImage, setAuthLoginImage] = useState('');

  const handleSubmit=()=>{
        const fd = new FormData();
        fd.append("pro",authProSignUpImage)
        fd.append("free",authFreeSignUpImage)
        fd.append("login",authLoginImage)
        fetch(HandleSign,{
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
      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Pro SignUp Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          
            onChange={(e) => setAuthProSignUpImage(e.target.files[0])}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Pro Signup image
          </p>
        </div>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Free Signup Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            
            onChange={(e) => setAuthFreeSignUpImage(e.target.files[0])}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Free Signup image
          </p>
        </div>
      </div>

      <div className="pt-6 border-gray-300 mt-2 px-7">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            Login Image
          </p>
          <input
            accept="image/*"
            type="file"
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
          
            onChange={(e) => setAuthLoginImage(e.target.files[0])}
          />
          <p className="mt-3 text-xs leading-[15px] text-gray-600">
            Change Login image
          </p>
        </div>
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

export default Auth;
