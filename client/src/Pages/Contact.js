import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { HandleContact, JSON_HEADER } from '../utils/Const';
import { NotificationManager } from 'react-notifications';

const Contact = () => {
  const MasterData = useSelector(state=>state.handleMasterData);
  const [data,setData]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [text,setText]=useState("")
  useLayoutEffect(()=>{
    if(MasterData.contactData!=null){
      setData(MasterData.contactData);
    }
  },[MasterData])

  const handleFarmSubmit=(e)=>{
    e.preventDefault();
    let data={
      name:name,
      email:email,
      text:text
    }
    fetch(HandleContact,{
      method:"PUT",
      headers:JSON_HEADER,
      body:JSON.stringify(data)
    }).then(res=>{
      if(res.ok){
        NotificationManager.success("Email Send Successfuly.")
        setEmail("")
        setName("")
        setText("")
      }
    })
  }
  return (
    <>
    <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">Contact</h1>
      <div className="text-center">
        <p className="text-lg">We are here to help.</p>
      </div>
      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">{data.heading}</h2>
          <p className="max-w-sm mt-5">{data.para}</p>
          <div className="mt-5">
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{data.address}</span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
              </svg>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
              </svg>
              <a href={`tel:${data.contact}`}>{data.contact}</a>
            </div>
          </div>
        </div>
        <div>
          <form className="my-10" onSubmit={handleFarmSubmit}>
            <input type="checkbox" id="" className="hidden" name="botcheck" style={{ display: 'none' }} />
            <div className="mb-5">
              <input onChange={e=>{setName(e.target.value)}} value={name} type="text" placeholder="Full Name" autoComplete="off" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0" name="name" />
            </div>
            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">Email Address</label>
              <input onChange={e=>{setEmail(e.target.value)}} value={email} id="email_address" type="email" placeholder="Email Address" name="email" autoComplete="off" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0" />
            </div>
            <div className="mb-3">
              <textarea onChange={e=>{setText(e.target.value)}} value={text} name="message" placeholder="Your Message" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"></textarea>
            </div>
            <button type="submit" className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </>
    

  );
}

export default Contact;
