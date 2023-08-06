import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FILE_URL, JSON_HEADER, LoginUser, ResetPassword } from '../utils/Const';
import { useDispatch,useSelector } from 'react-redux';
import { setUserBasic, setUserData } from '../Redux/Actions';
import { NotificationManager } from 'react-notifications';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const MasterData = useSelector(state=>state.handleMasterData);

  useLayoutEffect(()=>{
    if(MasterData.signupData!=null){
      setImg(FILE_URL+MasterData.signupData.login)
    }
  },[MasterData])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let data={
      email:email
    }
    fetch(ResetPassword,{
      method:"POST",
      headers:JSON_HEADER,
      body:JSON.stringify(data)
    }).then(res=>{
      if(res.ok){
        res.json().then(d=>{
          let message =  d.message;
          NotificationManager.info(message)
        })
      }
    })
  };

  return (
    <div className="mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
      <div className="relative hidden xl:block xl:w-1/2 h-full">
        <img
          className="absolute h-auto w-full object-cover"
          src={img}
          alt="my zomato"
        />
      </div>
      <div className="w-full xl:w-1/2 p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-[#452a72]">
           Forgot Password 
          </h1>
          <div>
            <span className="text-gray-600 text-sm">Don't have an account?</span>
            <Link to="/register" className="text-gray-700 text-sm font-semibold">
              Sign up
            </Link>
          </div>
          <div className="mb-6 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="email"
              type="text"
              placeholder="Your email address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex w-full mt-8">
            <button
              className="w-full bg-[#452a72] hover:bg-transparent hover:text-[#452a72] hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
