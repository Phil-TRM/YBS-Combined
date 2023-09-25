import React, { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmailVerificationSVG from '../Components/Icons/email.svg';
import { JSON_HEADER, VerifiyEmail } from '../utils/Const';
import { NotificationManager } from 'react-notifications';

const EmailVerificationSuccessPage = () => {
    const {id}=useParams();
    useLayoutEffect(()=>{
        fetch(VerifiyEmail,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify({id:id})
        }).then(res=>{
            if(res.ok){
                NotificationManager.success("Email Verified")
            }else{
                NotificationManager.error("Email Not Verified")
            }
        })
    },[])
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <img src={EmailVerificationSVG} width={150} className=" max-w-2xl"/>
      </div>
      <h2 className="text-3xl font-bold mb-4">Email Verification Successful!</h2>
      <p className="text-gray-600 mb-8">
        Congratulations! Your email has been successfully verified.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default EmailVerificationSuccessPage;
