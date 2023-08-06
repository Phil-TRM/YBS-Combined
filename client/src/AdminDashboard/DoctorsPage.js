import React from 'react'
import PaidMembers from "./Components/PaidMembers";

const DoctorsPage = () => {
  return (
    <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">Paid Members</p>
                        <div>
                           
                        </div>
                    </div>
                </div>
                <PaidMembers />
            </div>
  )
}

export default DoctorsPage