import React, { useLayoutEffect, useState } from "react";
import img1 from "../Images/Doctors/doctor2.jpeg";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import EditPassword from "./Component/EditPassword";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FILE_URL } from "../utils/Const";
import { createSearchParams } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.handleUserData);
  const [open2, setOpen2] = useState(false);
  const [userData, setUserData] = useState(UserData);

  const [linkden, setLinkdenUrl] = useState("");
  const [mail, setMail] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [twiter, settwiter] = useState("");
  const [discord, setdiscord] = useState("");
  const [reddit, setreddit] = useState("");
  const [threds, setThreads] = useState("");
  const [socialKeys, setSocialKeys] = useState(new Array());

  useLayoutEffect(() => {
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
    } catch (error) {}
  }, [UserData]);

  return (
    <>
      <EditPassword open={open2} setOpen={setOpen2} />

      <div className="px-1 lg:px-6 py-5">
        <div className="bg-white dark:bg-gray-800 shadow rounded xl:flex lg:flex w-full px-3">
          <div className="xl:w-2/5 lg:w-2/5 bg-gray-100 dark:bg-gray-800 py-8 border-gray-300 dark:border-gray-200 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full mb-3">
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
              <div className="flex mb-6 gap-2">
                <button
                  onClick={() => navigate("edit")}
                  className="bg-white font-medium transition duration-150 ease-in-out hover:bg-gray-200 rounded text-[#452a72] px-6 py-2 text-sm border border-[#452a72] dark:border-gray-200 focus:outline-none"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setOpen2(true)}
                  className="bg-[#452a72] font-medium transition duration-150 ease-in-out hover:bg-transparent rounded text-white hover:text-[#452a72] px-6 py-2 text-sm border border-[#452a72] ] focus:outline-none"
                >
                  Edit Password
                </button>
              </div>
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
                      <a target="_blank" href={`mailto:${mail}`}>
                        <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                      </a>
                    </span>
                  </div>
                  <div
                    className=" relative overflow-hidden block footer-div cursor-pointer"
                    style={{
                      display: socialKeys.includes("facebook")
                        ? "flex"
                        : "none",
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
                      display: socialKeys.includes("instagram")
                        ? "flex"
                        : "none",
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
          <div className="xl:w-3/5 lg:w-3/5 px-6 py-8">
            <div className="flex flex-wrap justify-between">
              <div className="w-2/5 mb-8">
                <div className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    Birthday
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {userData.dob}
                  </p>
                </div>
              </div>
              <div className="w-2/5 mb-8">
                <div className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    Gender
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                  {userData.gender}
                  </p>
                </div>
              </div>
              <div className="w-2/5 mb-8">
                <div className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    Designation
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                  {userData.designantion}
                  </p>
                </div>
              </div>
              <div className="w-2/5 mb-8">
                <div className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    Certificate
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                  {userData.certificate}
                  </p>
                </div>
              </div>
              <div className="w-2/5 mb-8">
                <div className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    Location
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {`${userData.address.city}, ${userData.address.state}, ${userData.address.contry}, ${userData.address.zipCode}`}
                  </p>
                </div>
              </div>
              <div className="w-2/5 mb-8">
                <div className="border-b pb-3">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                  {userData.mobileNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card code block end */}
    </>
  );
}
export default ProfilePage;
