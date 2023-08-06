import React, { useLayoutEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import { FILE_URL } from "../utils/Const";

const PAGE_SIZE = 10; // Number of items per page

const Doctors = () => {
  const navigate = useNavigate();
  const MasterData = useSelector((state) => state.handleMasterData);
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useLayoutEffect(() => {
    if (MasterData.doctors != null) {
      setData(MasterData.doctors);
      setTotalPages(Math.ceil(MasterData.doctors.length / PAGE_SIZE));
    }
  }, [MasterData]);

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
        <div className="container my-24 mx-auto md:px-6">
          <section className="mb-32 text-center">
            {/* <h2 className="mb-12 text-3xl font-bold">
          Meet the <u className="text-primary dark:text-primary-400">team</u>
        </h2> */}

            <div className="grid gap-x-6 gap-y-5 md:gap-y-12 md:grid-cols-3 lg:gap-x-12">
              {data.length > 0
                ? getCurrentPageData().map((member, index) => {
                    return (
                      <div
                        key={index}
                        className="mb-6 lg:mb-0"
                        onClick={() => navigate(`/post-by/${member._id}`)}
                      >
                        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div
                            className="relative overflow-hidden bg-cover bg-no-repeat"
                            style={{ paddingBottom: "100%" }}
                          >
                            <LazyLoadImage
                              src={FILE_URL + member.dp}
                              effect="blur"
                              className="absolute  object-cover rounded-lg"
                              width="100%"
                              height="50%"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="mb-2 text-xl font-semibold">
                              {member.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {member.designantion}
                            </p>
                            <div className="flex justify-center mt-4 space-x-4">
                              {member.socialMedia != null ? (
                                <div
                                  className="flex justify-end pt-5 gap-4 socials"
                                  style={{
                                    display:
                                      member.socialMedia != null
                                        ? "flex"
                                        : "none",
                                  }}
                                >
                                  <div
                                    className="relative overflow-hidden block footer-div cursor-pointer"
                                    style={{
                                      display:
                                        member.socialMedia.linkden != null
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <span className="block">
                                      <a
                                        target="_blank"
                                        href={
                                          member.socialMedia.linkden != null
                                            ? member.socialMedia.linkden
                                            : ""
                                        }
                                      >
                                        <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                                      </a>
                                    </span>
                                  </div>
                                  <div
                                    className="relative overflow-hidden block footer-div cursor-pointer"
                                    style={{
                                      display:
                                        member.socialMedia.mail != null
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <span className="block">
                                      <a
                                        target="_blank"
                                        href={
                                          member.socialMedia.mail != null
                                            ? `mailto:${member.socialMedia.mail}`
                                            : ""
                                        }
                                      >
                                        <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                      </a>
                                    </span>
                                  </div>
                                  <div
                                    className="relative overflow-hidden block footer-div cursor-pointer"
                                    style={{
                                      display:
                                        member.socialMedia.facebook != null
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <span className="block">
                                      <a
                                        target="_blank"
                                        href={
                                          member.socialMedia.facebook != null
                                            ? member.socialMedia.facebook
                                            : ""
                                        }
                                      >
                                        <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                      </a>
                                    </span>
                                  </div>
                                  <div
                                    className="relative overflow-hidden block footer-div cursor-pointer"
                                    style={{
                                      display:
                                        member.socialMedia.twiter != null
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <span className="block">
                                      <a
                                        target="_blank"
                                        href={
                                          member.socialMedia.twiter != null
                                            ? member.socialMedia.twiter
                                            : ""
                                        }
                                      >
                                        <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                                      </a>
                                    </span>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </section>
        </div>
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

export default Doctors;
