import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { FILE_URL } from '../../../utils/Const';
import { Link } from 'react-router-dom';


function SinglePageArticleMain({post}) {
    const formatDate=(string)=>{
        return moment(string).format('DD MMM, YYYY');
     }
    const rawMarkup=()=>{
        var rawMarkup = post.description
        return { __html: rawMarkup };
    }
    return (
        <article className="flex-1">
            <div className="prose prose-lg mx-auto my-3 dark:prose-invert prose-a:text-blue-500">
            <div dangerouslySetInnerHTML={rawMarkup()} />
            </div>
            <div className="mb-7 mt-7 flex justify-center">
                <Link className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500" to={`/post-by/${post.postedByID}`}>
                    ← View all posts
                </Link>
            </div>
            <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap">
                    <div className="flex items-center space-x-2">
                        <Link to={`/post-by/${post.postedByID}`}>
                        <img className="w-12 h-12 rounded-full" src={FILE_URL+post.postedByDp} alt="Author Avatar" />
                        </Link>
                        <div>
                            <p className="font-semibold">{post.postedByname}</p>
                            <p className="text-sm text-gray-600">Published on {formatDate(post.createdAt)}</p>
                            <a target='_black' href={post.onlineClink} className="text-sm text-gray-600 cursor-pointer hover:text-blue-900">Online consultation</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0" style={{display:"none"}}>
                        <a className="flex items-center space-x-1 text-gray-600" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 16.243l-4.472 2.236a1 1 0 0 1-1.341-1.075l.894-5.215-3.578-3.48a1 1 0 0 1 .555-1.705l5.235-.76L9 1.466A1 1 0 0 1 10 2v14.243zM15.883 7.317a1 1 0 0 1-.37 1.372l-4.715 2.926 1.225 5.212a1 1 0 0 1-1.551 1.083L10 16.069l-4.412 2.46a1 1 0 0 1-1.55-1.084l1.225-5.212-4.716-2.926a1 1 0 0 1-.37-1.372l3.364-3.262-1.63-5.083A1 1 0 0 1 4.92.38L10 2.801l5.081-2.422a1 1 0 0 1 1.372.37l-1.63 5.083 3.363 3.262z" clipRule="evenodd" />
                            </svg>
                            <span>42</span>
                        </a>
                        <a className="flex items-center space-x-1 text-gray-600" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 1a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-1.464-7.95a.5.5 0 1 1 .928-.372l.004.06c.106.37.225.745.36 1.119a5.5 5.5 0 1 1-7.278-7.278c.374.135.75.254 1.12.36l.059.004a.5.5 0 0 1-.372.928A4.5 4.5 0 0 0 5.5 10a.5.5 0 0 1-.5.5H4a6 6 0 1 1 9.95-4.363.5.5 0 1 1 .929.37A7 7 0 1 0 9.536 18.95z" clipRule="evenodd" />
                            </svg>
                            <span>18</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}


export default SinglePageArticleMain