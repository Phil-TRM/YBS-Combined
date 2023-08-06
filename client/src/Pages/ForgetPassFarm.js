import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { JSON_HEADER, ResetPassword } from '../utils/Const';
import { NotificationManager } from 'react-notifications';


const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {id}=useParams();
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(password!=confirmPassword){
        NotificationManager.error("Password Not Matched");
        return
    }
        

    let data = {
        token:id,
        password:password
    }
    fetch(ResetPassword,{
        method:"PUT",
        headers:JSON_HEADER,
        body:JSON.stringify(data)
    }).then(res=>{
        if(res.ok){
            res.json().then(res=>{
                let d =  res.message;
                NotificationManager.info(d)
                Navigate("/login")
            })
        }
    })
   
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-gray-100 text-gray-900 rounded-md py-2 px-3 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full bg-gray-100 text-gray-900 rounded-md py-2 px-3 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
