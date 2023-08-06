import React, { useEffect, useLayoutEffect, useState, useReducer } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FILE_URL } from "../../../utils/Const";

const SinglePageArtSide = ({ post }) => {
  const masterData = useSelector((state) => state.handleMasterData);
  const postsAll = useSelector((state) => state.handlePosts);
  //  const [categories,setCategories]=useState(masterData.categories)
  const [relatedPosts, setRelatedPost] = useState(new Array());

  useLayoutEffect(() => {
    handleData();
  }, [post]);
  const handleData = () => {
    let arrey = new Array();
    for (let i = 0; i < postsAll.length; i++) {
      const element = postsAll[i];
      if(element.status!=1){
        if (element._id != post._id) {
          if (element.categoriesId == post.categoriesId) {
            arrey.push(element);
          }
        }
      }
    
    }
    setRelatedPost(arrey);
  };

  const categories = [
    { name: "Personal Growth", count: 5, url: "/category/personal-growth" },
    { name: "Lifestyle", count: 4, url: "/category/lifestyle" },
    { name: "Travel", count: 3, url: "/category/travel" },
    { name: "Technology", count: 3, url: "/category/technology" },
    { name: "Design", count: 2, url: "/category/design" },
  ];
  return (
    <aside className="sticky top-0 w-full self-start md:w-96">
      <div className="mt-5 font-sans">
        {/* <div>
          <h3 className="text-2xl font-bold dark:text-white">Search Posts</h3>
          <form action="/search" method="GET" className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                name="q"
                id="q"
                className="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div> */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold dark:text-white">Related</h3>
          <div className="grid gap-6 mt-6">
            {relatedPosts.map((item) => (
              <Link to={`/articles/${item.slug}`} key={item._id}>
                <div className="flex gap-5">
                  <div className="relative w-24 h-20 overflow-hidden rounded-md shrink-0">
                    <LazyLoadImage
                      src={FILE_URL + item.image1Url}
                      alt={item.title}
                      effect="blur"
                      className="object-cover w-[100vw]"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      by {item.postedByname}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10" style={{ display: "none" }}>
          <h3 className="text-2xl font-bold dark:text-white">Categories</h3>
          <ul className="grid mt-4">
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  className="flex items-center justify-between py-2"
                  href={category.url}
                >
                  <h4 className="text-gray-800 dark:text-gray-400">
                    {category.name}
                  </h4>
                  <div className="inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-blue-50 text-blue-500 rounded-full shrink-0 dark:bg-gray-800 dark:text-gray-300">
                    {category.count}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SinglePageArtSide;
