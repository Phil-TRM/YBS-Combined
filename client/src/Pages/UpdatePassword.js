import React, { useState } from 'react';
import Img1 from '../Images/Doctors/article1.jpeg';
import { Link } from 'react-router-dom';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange= (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
      <div className="relative hidden xl:block xl:w-1/2 h-full">
        <img
          className="absolute h-auto w-full object-cover"
          src={Img1}
          alt="my zomato"
        />
      </div>
      <div className="w-full xl:w-1/2 p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-[#452a72]">
           Update Password 
          </h1>
         
         
          <div className="mb-3 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={handlePasswordChange}
            />
            

          </div>
         
          <div className="mb-3 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="cPassword"
            >
              Confirm Password
            </label>
            <input
              className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
              id="cPassword"
              type="password"
              placeholder="Your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            

          </div>

          <div className="flex w-full mt-8">
            <button
              className="w-full bg-[#452a72] hover:bg-transparent hover:text-[#452a72] hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
