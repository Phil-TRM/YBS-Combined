import React, { useState } from 'react'
import img1 from "../../../Images/Doctors/article1.jpeg"
import moment from 'moment/moment';

import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FILE_URL } from '../../../utils/Const';
import { Link } from 'react-router-dom';

const SingleArticleTop = ({post}) => {
  const formatDate=(string)=>{
    return moment(string).format('DD MMM, YYYY');
 }
  return (
    <div className="relative z-0 flex min-h-[calc(100vh-30vh)] items-center">
      <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30">
        <LazyLoadImage
          className="object-cover w-[100vw] h-[100%] absoluteClass top-0 left-0 right-0 bottom-0"
          effect='blur'
          width="100%"
          height="100%"
          src={FILE_URL+post.image2Url}
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-5 py-20 text-center">
        <h1 className="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-5xl lg:leading-tight">
          {post.title}
        </h1>
        <div className="mt-8 flex justify-center space-x-3 text-gray-500 ">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex gap-3">
              <div className="relative h-5 w-5 flex-shrink-0">
                <Link to={`/post-by/${post.postedByID}`}>
                  <LazyLoadImage
                    className="rounded-full w-[100vw] h-[100%] object-cover absolute top-0 left-0 right-0 bottom-0"
                    width="100%"
                    height="100%"
                    src={FILE_URL+post.postedByDp}
                  />
                </Link>
              </div>
              <div className="font-medium text-sm text-white">By {post.postedByname}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-sm text-white">{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleArticleTop