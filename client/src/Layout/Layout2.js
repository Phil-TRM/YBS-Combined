import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../DoctorDashboard/Sidebar'

const DoctorLayout = () => {
   
    return (
        <>
            <Sidebar Outlet={Outlet}/>
        </>

    )
}

export default DoctorLayout