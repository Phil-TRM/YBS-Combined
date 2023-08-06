import React, { useLayoutEffect, useState } from "react";
import img1 from "../../Images/Doctors/doctor2.jpeg"
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { FILE_URL, Historyhandlers, JSON_HEADER, UserHandler } from "../../utils/Const";
import moment from "moment";

function PaidSingleUser() {
    const navigate = useNavigate()
    const {id} =  useParams();
    const [open2, setOpen2] = useState(false)
    const [userData, setUserData] = useState("")
    const [address, setAdreess] = useState("")
    const [plan, setPlan] = useState("")
    const [linkden, setLinkdenUrl] = useState("");
    const [mail, setMail] = useState("");
    const [facebook, setfacebook] = useState("");
    const [instagram, setinstagram] = useState("");
    const [twiter, settwiter] = useState("");
    const [discord, setdiscord] = useState("");
    const [reddit, setreddit] = useState("");
    const [threds, setThreads] = useState("");
    const [totalPaid, setTotalPaid] = useState(0);
    const [socialKeys, setSocialKeys] = useState(new Array());
    const [plansHistory, setPlansHistory] = useState(new Array());

    useLayoutEffect(()=>{
        getProfile();
        getPlansHistory();
    })
    const getProfile=()=>{
        fetch(UserHandler,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify({_id:id})
        }).then(res=>{
            if(res.ok){
                res.json().then(d=>{
                    setUserData(d.data);
                    if(d.data.address!=null){
                        setAdreess(d.data.address)
                    }
                    if(d.data.planDetails!=null){
                        setPlan(d.data.planDetails)
                    }
                    if (d.data.socialMedia) {
                        setSocialKeys(Object.keys(d.data.socialMedia));
                        setMail(d.data.socialMedia.mail);
                        setLinkdenUrl(d.data.socialMedia.linkden);
                        setfacebook(d.data.socialMedia.facebook);
                        setinstagram(d.data.socialMedia.instagram);
                        settwiter(d.data.socialMedia.twiter);
                        setdiscord(d.data.socialMedia.discord);
                        setreddit(d.data.socialMedia.reddit);
                        setThreads(d.data.socialMedia.threds);
                      }
                })
            }
        })
    }
    const getPlansHistory=()=>{
        fetch(Historyhandlers,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify({email:userData.email})
        }).then(res=>{
            if(res.ok){
                res.json().then(d=>{
                    if(d.data.length>0){
                        setPlansHistory(d.data)
                    }
                    let tmp = 0;
                    for (let i = 0; i < d.data.length; i++) {
                        const element = d.data[i];
                        tmp=tmp+element.price;
                    }
                    setTotalPaid(tmp)
                })
            }
        })
    }
    const formatDate = (string) => {
        return moment(string).format("DD MMM, YYYY");
      };
    return (
        <>


            <div className="px-1 lg:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow rounded xl:flex lg:flex w-full px-3">
                    <div className="xl:w-2/5 lg:w-2/5 bg-gray-100 dark:bg-gray-800 py-8 border-gray-300 dark:border-gray-200 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className=" w-24 rounded-full mb-3">
                                <img className="h-full w-full object-cover rounded-full shadow" src={FILE_URL+userData.dp} />
                            </div>
                            <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">{userData.name}</p>
                            <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">{userData.email}</p>

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
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Birthday</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{userData.dob}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Gender</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{userData.gender}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Designation</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{userData.designantion}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Certificate</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{userData.certificate}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Current Plan</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{plan.planName}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Total paid</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{totalPaid}$</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Location</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{`${address.city}, ${address.state}, ${address.contry}, ${address.zipCode}`}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Phone Number</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{userData.mobileNumber}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="px-1 lg:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow rounded w-full ">
                    <div className="border rounded-lg border pb-6 border-gray-200 ">
                        <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
                            <p className="text-sm lg:text-xl font-semibold leading-tight text-[#452a72]">All Bought Plans</p>

                        </div>
                        <div className="px-6 pt-6 overflow-x-auto ">
                            <table className="w-full whitespace-nowrap">
                                <tbody  className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-6 gap-8">
                                    <>
                                    {plansHistory.map((plan)=>{
                                        return(
                                            <tr key={plan._id} className="flex items-center">
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 rounded-sm p-2.5">
                                                        <img src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" alt="" />
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center text-sm leading-none">
                                                            <p className="font-semibold text-gray-800">{plan.validity>30?"Yearly":"Monthly"}</p>
                                                            <p className="text-[#452a72] ml-3">{`(${plan.transId})`}</p>
                                                        </div>
                                                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">{formatDate(plan.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <div>
                                                    <p className="text-sm font-semibold leading-none text-right text-gray-800">${plan.price}</p>

                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                       
                                        
                                    </>







                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>






        </>
    );
}


export default PaidSingleUser;
