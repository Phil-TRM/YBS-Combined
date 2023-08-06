import React, { useEffect, useLayoutEffect, useState } from "react";

import img1 from "../Images/Doctors/doctor2.jpeg";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FILE_URL, Masterhandler } from "../utils/Const";
import moment from "moment";


export default function Dashboard() {
  const MasterData = useSelector((state) => state.handleUserPosts);
  const UserData = useSelector((state) => state.handleUserData);
  const RealMasterData= useSelector(state=>state.handleMasterData);
  const [posts, setPosts] = useState(MasterData);
  const [pendingPosts, setPendingPost] = useState(0);
  const [aporovedPost, setAprovedPost] = useState(0);
  const [rejectedPost, setRejectedPost] = useState(0);
  const [linkden, setLinkdenUrl] = useState("");
  const [mail, setMail] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [twiter, settwiter] = useState("");
  const [discord, setdiscord] = useState("");
  const [reddit, setreddit] = useState("");
  const [threds, setThreads] = useState("");
  const [userData, setUserData] = useState(UserData);
  const [socialKeys, setSocialKeys] = useState(new Array());
  const [notifications, setNotifications] = useState(new Array());

  useLayoutEffect(() => {
    setPendingPost(0);
    setAprovedPost(0);
    setRejectedPost(0);
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      if (element.status == 0) {
        setPendingPost(pendingPosts + 1);
      }
      if (element.status == 1) {
        setAprovedPost(aporovedPost + 1);
      }
      if (element.status == 2) {
        setRejectedPost(rejectedPost + 1);
      }
    }
    setUserData(UserData);
    try {
        if (UserData.socialMedia) {
            setSocialKeys(Object.keys(UserData.socialMedia));
            setMail(UserData.socialMedia.mail);
            setLinkdenUrl(UserData.socialMedia.linkden);
            setfacebook(UserData.socialMedia.facebook);
            setinstagram(UserData.socialMedia.instagram);
            settwiter(UserData.socialMedia.twiter);
            setdiscord(UserData.socialMedia.discord);
            setreddit(UserData.socialMedia.reddit);
            setThreads(UserData.socialMedia.threds);
          }
    } catch (error) {
        
    }
   

  }, [MasterData]);

  useEffect(()=>{
    if(RealMasterData.notifications!=null){
      setNotifications(RealMasterData.notifications)
    }

  },[RealMasterData])

  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };
  return (
    <>
      <div className="relative py-3">
        <div className="px-3 md:px-3 mx-auto w-full">
          <div>
            <div className="flex flex-wrap md:gap-y-4">
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Material
                        </h5>
                        <span className=" text-xl">{posts.length}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                          <i className="fas fa-book"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Pending
                        </h5>
                        <span className=" text-xl">{pendingPosts}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]">
                          <i className="fa-solid fa-clock"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Rejected
                        </h5>
                        <span className=" text-xl">{rejectedPost}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Live
                        </h5>
                        <span className=" text-xl">{aporovedPost}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#293770]">
                          <i className="fa-solid fa-book"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 px-1 md:px-5 my-3 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="flex flex-col items-center p-5">
            <div className="h-40 w-40 rounded-full mb-3">
              <img
                className="h-full w-full object-cover rounded-full shadow"
                src={FILE_URL + userData.dp}
              />
            </div>
            <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
              {userData.name}
            </p>
            <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">
              {userData.email}
            </p>
            {socialKeys == undefined || socialKeys == null ? (
              <div
                className="flex justify-start flex-wrap pt-5 gap-4 socials px-3"
                style={{ display: "none" }}
              ></div>
            ) : (
              <div
                className="flex justify-start flex-wrap pt-5 gap-4 socials px-3"
                style={{ display: socialKeys.length > 0 ? "flex" : "none" }}
              >
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("linkden") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={linkden}>
                      <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                    </a>
                  </span>
                </div>
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("mail") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a
                      target="_blank"
                      href={`mailto:${mail}`}
                    >
                      <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                    </a>
                  </span>
                </div>
                <div
                  className=" relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("facebook") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={facebook}>
                      <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                    </a>
                  </span>
                </div>
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("instagram") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={instagram}>
                      <i className="social-links fa-brands fa-instagram text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                    </a>
                  </span>
                </div>
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("discord") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={discord}>
                      <i className="social-links fa-brands fa-discord text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                    </a>
                  </span>
                </div>
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("reddit") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={reddit}>
                      <i className="social-links fa-brands fa-reddit text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                    </a>
                  </span>
                </div>
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("twiter") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={twiter}>
                      <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                    </a>
                  </span>
                </div>
                <div
                  className="relative overflow-hidden block footer-div cursor-pointer"
                  style={{
                    display: socialKeys.includes("threds") ? "flex" : "none",
                  }}
                >
                  <span className="block">
                    <a target="_blank" href={threds}>
                      <img className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" src="https://logowik.com/content/uploads/images/instagram-threads6682.logowik.com.webp"/>
                      <FiTwitter style={{display:"none"}} className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-2">
              Notifications
            </h6>
            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-[#452a72]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                ></path>
              </svg>
              <strong>24%</strong> this month
            </p>
          </div>
          <div className="p-6 pt-0">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-start gap-4 py-3"
              >
                <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] after:h-4/6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="!w-5 !h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="antialiased font-sans text-sm leading-normal text-blue-gray-900 block font-medium">
                    {notification.title}
                  </p>
                  <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
