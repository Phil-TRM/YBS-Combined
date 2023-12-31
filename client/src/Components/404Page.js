import React from "react";
import { useNavigate } from "react-router";
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-white h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="bg-white border rounded-md flex items-center justify-center mx-4 md:w-2/3 ">
                    <div className="flex flex-col items-center py-16 ">
                        <LazyLoadImage
                            src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png"
                            effect='blur'
                            className="px-4 hidden md:block"
                        />
                        <LazyLoadImage
                            src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png"
                            effect='blur'
                            className="md:hidden"
                        />
                        <h1 className="px-4 pt-8 pb-4 text-center text-5xl font-bold leading-10 text-gray-800">OOPS! </h1>
                        <p className="px-4 pb-10 text-base leading-none text-center text-gray-600">No signal here! we cannot find the page you are looking for </p>
                        <button onClick={() => navigate("/")} className="mx-4 h-10 w-44 border rounded-md text-white text-base bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
