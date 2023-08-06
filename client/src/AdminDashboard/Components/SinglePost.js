import React from 'react'
import SingleArticleTop from '../../Components/Articles/SinglePageArticles/SingleArticleTop'
import SinglePageArticleMain from '../../Components/Articles/SinglePageArticles/SinglePageArticleMain'
import img1 from "../../Images/Doctors/article1.jpeg"

import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

const data = {
    img: img1,
    mainHeading: "This Bread Pudding Will Give You All the Fall Feels",
    createdAt: "june 18, 2023",
    createdBy: "Joshua Wood",
    creatorImg: "https://stablo-template.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=32&q=75",
    description: "This is full blog description that doctor write it is possible user add image too in description."
}


const SinglePageArticles = () => {
    return (
        <>
            <div className=" relative z-0 flex min-h-[calc(100vh-30vh)] items-center ">
                <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30">
                    <LazyLoadImage
                        className="object-cover w-[100vw] h-[100%] absoluteClass top-0 left-0 right-0 bottom-0"
                        effect='blur'
                        width="100%"
                        height="100%"
                        src={data.img}
                    />
                </div>
                <div className=" mx-auto max-w-screen-lg px-5 py-20 text-center">
                    <h1 className="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-5xl lg:leading-tight">
                        {data.mainHeading}
                    </h1>
                    <div className="mt-8 flex justify-center space-x-3 text-gray-500 ">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="flex gap-3">
                                <div className="relative h-5 w-5 flex-shrink-0">
                                    <a >
                                        <LazyLoadImage
                                            className="rounded-full w-[100vw] h-[100%] object-cover absolute top-0 left-0 right-0 bottom-0"
                                            width="100%"
                                            height="100%"
                                            src={data.creatorImg}
                                        />
                                    </a>
                                </div>
                                <div className="font-medium text-sm text-white">{data.createdBy}</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="font-medium text-sm text-white">{data.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
                <article className="flex-1">
                    <div className="prose prose-lg mx-auto my-3 dark:prose-invert prose-a:text-blue-500">
                        {data.description}

                    </div>


                </article>
            </div>
        </>

    )
}

export default SinglePageArticles