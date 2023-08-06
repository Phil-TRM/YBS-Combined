import React, { useLayoutEffect, useState } from "react";
import img1 from "../Images/Doctors/doctor2.jpeg"
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import EditPassword from "../DoctorDashboard/Component/EditPassword";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FILE_URL } from "../utils/Const";

function Profile() {
    const navigate = useNavigate()
    const [open2, setOpen2] = useState(false);

    const UserData = useSelector((state) => state.handleUserData);
    const [useData,setUserData]=useState(UserData);

    useLayoutEffect(()=>{
        if(UserData!=null){
            setUserData(UserData);
        }
    },[UserData])

    return (
        <>
            <EditPassword open={open2} setOpen={setOpen2} />

            <div className="px-1 lg:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow rounded xl:flex lg:flex w-full px-3">
                    <div className="xl:w-2/5 lg:w-2/5 bg-gray-100 dark:bg-gray-800 py-8 border-gray-300 dark:border-gray-200 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="h-24 w-24 rounded-full mb-3">
                                <img className="h-full w-full object-cover rounded-full shadow" src={FILE_URL+useData.dp} />
                            </div>
                            <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">{useData.name}</p>
                            <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">{useData.email}</p>
                            <div className="flex mb-6 gap-2">

                                <button onClick={() => navigate('edit')} className="bg-white font-medium transition duration-150 ease-in-out hover:bg-gray-200 rounded text-[#452a72] px-6 py-2 text-sm border border-[#452a72] dark:border-gray-200 focus:outline-none">Edit Profile</button>
                                <button onClick={() => setOpen2(true)} className="bg-[#452a72] font-medium transition duration-150 ease-in-out hover:bg-transparent rounded text-white hover:text-[#452a72] px-6 py-2 text-sm border border-[#452a72] ] focus:outline-none">Edit Password</button>
                            </div>
                           
                        </div>
                    </div>
                    <div className="xl:w-3/5 lg:w-3/5 px-6 py-8">
                        <div className="flex flex-wrap justify-between">
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Birthday</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{useData.dob}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Gender</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{useData.gender}</p>
                                </div>
                            </div>
                            
                            
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Location</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{`${useData.address.city}, ${useData.address.state}, ${useData.address.contry}, ${useData.address.zipCode}`}</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Phone Number</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{useData.mobileNumber}</p>
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
export default Profile;
