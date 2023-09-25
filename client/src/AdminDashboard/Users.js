import React, { useState } from "react";
import { useNavigate } from 'react-router'
import AddCat from "./Components/AddCat";
import PaidMembers from "./Components/PaidMembers";
import FreeMembers from "./Components/FreeMember";

function Users() {
    const navigate = useNavigate()

    return (
        <>
            
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">Free Members</p>
                        <div>
                           
                        </div>
                    </div>
                </div>
                <FreeMembers />
            </div>
        </>
    );
}

export default Users;
