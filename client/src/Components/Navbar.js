

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FILE_URL } from '../utils/Const';
import { setUserBasic, setUserData } from '../Redux/Actions';
import Dashboard from '../DoctorDashboard/Dashboard';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLogin,setLogin]=useState(false)
  const [isUserVerified,setVerified]=useState(false)
  const [isEmailVerified,setEmailVerified]=useState(false)
  const [LOGO,setLogo]=useState("")
  const [refresh,doRefresh]=useState(0)
  const [userTypeInStr,setUserTypeInStr]=useState("doctor")
  const [isDashBoardEnable,setDashboard]=useState(true);

  const UserData = useSelector(state=>state.handleUserData);
  const MasterData = useSelector(state=>state.handleMasterData);
  const LoginStatus =  useSelector(state=>state.handleUserBasicData)

  const Dispatch = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(()=>{

    if(MasterData.homeData!=null){
      setLogo(FILE_URL+MasterData.homeData.websiteLogoUrl)
    }

    switch(LoginStatus.userType){
      case 0 : setUserTypeInStr("patient");
      break
      case 1 : setUserTypeInStr("doctor");
      break
      case 2: {
        setUserTypeInStr("admin");
      }
      break
            default : setDashboard(false);
    }
    setLogin(LoginStatus.isLogin);
    if(UserData!=null){
      if(UserData.status==1){
        setVerified(true);
      }
      setEmailVerified(UserData.isEmailVerified);
    }

    if(isDashBoardEnable){
      setVerified(true);
      setEmailVerified(true)
    }
  },[UserData,MasterData])

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogOut =()=>{
    localStorage.clear();
    Dispatch(setUserData({}))
    Dispatch(setUserBasic({isLogin:false,userType:0}))
    navigate("/")
  }
  return (
    <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
      <nav className="flex justify-center">
        <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
          <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
            <Link
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
              to="/"
            >
              Home
            </Link>
            <Link
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
              to="/about"
            >
              About
            </Link>
            <Link
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
              to={isLogin?"/articles":"/login"}
              style={{display:isUserVerified?"flex":"none"}}
            >
              Material
            </Link>
            {isLogin && 
              <Link
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="https://communities.yourbestself-ie.com/user/auth/login"
                target='_blank'
                style={{display:isUserVerified?"flex":"none"}}
              >
                Communities
              </Link> 
            }
            <Link
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
              to="/pricing"
              style={{display:isEmailVerified?"none":"none"}}
            >
              Pricing
            </Link>
          </div>
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link className="w-28 dark:hidden" to="/">
              <img
                alt="Logo"
                width="132"
                height="52"
                decoding="async"
                data-nimg="1"
                style={{ color: 'transparent' }}
                sizes="(max-width: 640px) 100vw, 200px"
                src={LOGO}
              />
            </Link>
            <button
              className="order-2 ml-2 md:hidden focus:outline-none"
              onClick={handleMenuToggle}
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="order-3 hidden w-full md:flex md:w-auto md:order-none md:justify-end">
            <Link className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " target="" rel="" to={isLogin?"/doctors":"/login"}  style={{display:isUserVerified?"flex":"none"}}>Doctors</Link>
            <Link className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " target="" rel="" to="/contact">Contact</Link>
            <Link className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " target="" rel="" to="/QuestionsPage">Q/A</Link>
            <Link className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " to={`/${userTypeInStr}/dashboard`} style={{display:isDashBoardEnable?"flex":"none"}}>Dashboard</Link>
            <Link className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " to="/login" style={{display:isLogin?"none":"flex"}}>Login</Link>
            <Link className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " to="/register" style={{display:isLogin?"none":"flex"}}>Signup</Link>
            <p className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] " onClick={handleLogOut} style={{display:isLogin&&isEmailVerified?"flex":"none"}}>Logout</p>
          </div>

          <div
          style={{zIndex:"100"}}
            className={`fixed left-0 top-0 h-full w-[100vw] bg-white  transform transition-transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } md:hidden`}
          >
            <div className="flex flex-col h-full justify-start items-center py-8 px-4">
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="/"
                onClick={handleMenuToggle}
              >
                Home
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="/about"
                onClick={handleMenuToggle}
              >
                About
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to={isLogin?"/articles":"/login"}
                onClick={handleMenuToggle}
                style={{display:isUserVerified?"flex":"none"}}
              >
                Material
              </Link>
              {isLogin && 
                <Link
                  className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                  to="https://communities.yourbestself-ie.com/user/auth/login"
                  onClick={handleMenuToggle}
                  target='_blank'
                >
                  Communities
                </Link> 
              }
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="/pricing"
                onClick={handleMenuToggle}
              >
                Pricing
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to={isLogin?"/doctors":"/login"}
                onClick={handleMenuToggle}
                style={{display:isUserVerified?"flex":"none"}}
              >
                Doctors
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="/contact"
                onClick={handleMenuToggle}
              >
                Contact
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to={`/${userTypeInStr}/dashboard`}
                onClick={handleMenuToggle}
                style={{display:isDashBoardEnable?"flex":"none"}}
              >
                Dashboard
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="/login"
                onClick={handleMenuToggle}
                style={{display:isLogin?"none":"flex"}}
              >
                Login
              </Link>
              <Link
                className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72] "
                to="/register"
                onClick={handleMenuToggle}
                style={{display:isLogin?"none":"flex"}}
              >
                Signup
              </Link>
              <p className="my-2 px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#452a72]  " onClick={handleLogOut} style={{display:isLogin?"flex":"none"}}>Logout</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

