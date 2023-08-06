import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import { FILE_URL } from "../utils/Const";
import moment from "moment/moment";

const PAGE_SIZE = 10; // Number of items per page

const Articles = () => {
  const navigate = useNavigate();
  const Data = useSelector((state) => state.handlePosts);
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useLayoutEffect(() => {
    if (Data != null) {
      setData(Data);
      setTotalPages(Math.ceil(Data.length / PAGE_SIZE));
    }
  }, [Data]);

  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get the current page's data based on the currentPage state
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
        <section className="mb-32">
          {/* <h2 className="mb-12 text-3xl font-bold  text-center">
            Read our <u className="text-primary dark:text-primary-400">articles</u>
          </h2> */}
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {data.length > 0
              ? getCurrentPageData().map((item, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/articles/${item.slug}`)}
                  >
                    <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                      <a className="relative block aspect-square">
                        <LazyLoadImage
                          alt="Thumbnail"
                          loading="lazy"
                          decoding="async"
                          className="object-cover transition-all"
                          sizes="(max-width: 768px) 30vw, 33vw"
                          srcSet={FILE_URL + item.image1Url}
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            inset: 0,
                            color: "transparent",
                          }}
                        />
                        {/* <LazyLoadImage
                      key={index}
                      src={FILE_URL+item.image1Url}
                      height="100%"
                      effect='blur'
                      width="100%"
                      className="object-cover transition-all"
                      sizes="(max-width: 768px) 30vw, 33vw"
                      style={{ position: 'absolute',objectFit:"cover" }}
                    /> */}
                      </a>
                    </div>
                    <div className="">
                      <div className="flex gap-3">
                        <a>
                          <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-[#452a72]">
                            {item.categoriesName}
                          </span>
                        </a>
                        {/* <a href="/category/lifestyle">
                                <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-purple-600">{item.category2}</span>
                            </a> */}
                      </div>
                      <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                        <a>
                          <span className="bg-gradient-to-r bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                            {item.title}
                          </span>
                        </a>
                      </h2>
                      <div className="hidden">
                        <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                          <a>{item.description}</a>
                        </p>
                      </div>
                      <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <div className="relative h-5 w-5 flex-shrink-0">
                            <LazyLoadImage
                              alt="Author"
                              effect="blur"
                              width="100%"
                              height="100%"
                              className="rounded-full  w-[20px] object-cover"
                              src={FILE_URL + item.postedByDp}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {item.postedByname}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </section>
      </div>

      <div className="mt-3 flex items-center justify-center">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            onClick={()=>{handlePageChange(currentPage-1)}}
            disabled={currentPage==1?true:false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              ></path>
            </svg>
            <span>Previous</span>
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-gray-200 text-black"
                    : "bg-white text-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button disabled={totalPages==currentPage?true:false} onClick={()=>{handlePageChange(currentPage+1)}} className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Articles;
