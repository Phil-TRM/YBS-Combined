import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Img1 from '../Images/Doctors/article1.jpeg';
import { Link } from 'react-router-dom';
import { FILE_URL, JSON_HEADER, LoginUser } from '../utils/Const';
import { useDispatch,useSelector } from 'react-redux';
import { setUserBasic, setUserData } from '../Redux/Actions';
import { NotificationManager } from 'react-notifications';



const Login = () => {
  const Dispatch = useDispatch();
  const Navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data =  {
      email:email,
      password:password
    }
  
    fetch(LoginUser,{
      method:"POST",
      headers:JSON_HEADER,
      body:JSON.stringify(data)
    }).then(res=>{
      if(res.ok){
        res.json().then(data=>{
          let d = data.data;
          localStorage.setItem("user",JSON.stringify(d));
          Dispatch(setUserData(d));
          Dispatch(setUserBasic({uid:d._id,userType:d.userType,isLogin:true}))
          Navigate("/")
        }
        )
      }else{
        NotificationManager.error("Some error with credentials please retry")
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
            Sign in to your account
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
          <div className="mb-3 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className='flex justify-between'>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded   focus:outline-none "
                />
                <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
              </div>
              <Link
                className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                to="/password"
              >
                Forgot Password?
              </Link>
            </div>

          </div>

          <div className="flex w-full mt-8">
            <button
              className="w-full bg-[#452a72] hover:bg-transparent hover:text-[#452a72] hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
