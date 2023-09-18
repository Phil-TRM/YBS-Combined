import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { uploadBankDetails, uploadUpiDetails } from '../slices/Scholarship'
import { useDispatch } from 'react-redux'

const ScholarshipUser = () => {

  const dispatch = useDispatch()
  const [bank, setBank] = useState({
    bankName: "",
    accountNo: "",
    ifscCode: ""

  })
  const {bankName,accountNo,ifscCode} = bank
  const [upi, setUpi] = useState({
    upiId: "",
    upiName: ""
  })
  const {upiId,upiName} = upi
  const handleChange = (e) => {
    const { name, value } = e.target
    setBank({ ...bank, [name]: value })
  }
  const handleChange2 = (e) => {
    const { name, value } = e.target
    setUpi({ ...upi, [name]: value })
  }
  const handleBankSubmit = (e) => {
    e.preventDefault()
    dispatch(uploadBankDetails({bankName,accountNo,ifscCode}))
  }
  const handleUpiSubmit = (e) => {
    e.preventDefault()
    dispatch(uploadUpiDetails({upiId,upiName}))
    
  }
  return (
    <>
      <section className="max-w-4xl p-0 mx-auto  rounded-md dark:bg-gray-800">
      <h4 className='text-[#1976d2] mb-3'>Bank Details (For Scholarship)</h4>
        <form onSubmit={handleBankSubmit} className='block sm:flex gap-2 sm:flex-wrap'>
          <div className="grid grid-cols-1 gap-6 m-0 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <input id="name" required placeholder='Bank Name' onChange={handleChange} value={bank.bankName} name="bankName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <input id="accountNo" required placeholder='Account No' onChange={handleChange} value={bank.accountNo} name="accountNo" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <input id="ifscCode" required placeholder='IfSC Code' onChange={handleChange} value={bank.ifscCode} name="ifscCode" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
          </div>
          <div className="flex justify-end p-2">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-red focus:outline-none focus:bg-gray-600">Save</button>
          </div>
        </form>
      </section>
      <p className='text-center fs-5 mx-5 my-2 text-[#1976d2]'>Or</p>
      <section className="max-w-4xl p-0 mx-auto rounded-md dark:bg-gray-800 ">
        <form onSubmit={handleUpiSubmit} className='block sm:flex gap-2 sm:flex-wrap'>
          <div className="grid grid-cols-1 gap-6 m-0 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <input id="upiId" placeholder='Upi Id' onChange={handleChange2} value={upi.upiId} name="upiId" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <input id="upiName" placeholder='Name' onChange={handleChange2} value={upi.upiName} name="upiName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
          </div>
          <div className="flex justify-end p-2">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-red focus:outline-none focus:bg-gray-600">Save</button>
          </div>
        </form>
      </section>
      <Divider/>

    
    </>

  )
}

export default ScholarshipUser

