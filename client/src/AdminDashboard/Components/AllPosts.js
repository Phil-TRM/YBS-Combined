import React, { useLayoutEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TrashIcon } from "@heroicons/react/24/solid";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FILE_URL,
  JSON_HEADER,
  UserHandler,
  Masterhandler,
  POST_HANDLER,
  SendNotfication,
} from "../../utils/Const";
import moment from "moment/moment";
import { setMasterData, setPosts } from "../../Redux/Actions";

const STATUS={
    0:"Pending",
    1:"Confirmed",
    2:"Rejected"
}

const AllPosts = () => {
  const MasterData = useSelector((state) => state.handleMasterData);
  const BasicData = useSelector((state) => state.handleUserBasicData);
  const Dispatch = useDispatch();
  const [show, setShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [currentFilter, setCurrentFilter] = useState("all"); // 'all', 'pending', 'confirm', 'rejected'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [posts, setposts] = useState(new Array);

useLayoutEffect(()=>{
    if(MasterData.forAdminpPost!=null){
       setposts(MasterData.forAdminpPost);
    }
},[MasterData])

  const handleDltPost = (id,title,uid) => {
    let notData = {
      title:"Your Post deleted title:"+title,
      uid:uid
    }
    let dataAdmin ={
        _id:BasicData.uid,
        userType:BasicData.userType
      }
      let data ={
        _id:id,
      }
      fetch(POST_HANDLER,{
        method:"DELETE",
        headers:JSON_HEADER,
        body:JSON.stringify(data)
      }).then(res=>{
        if(res.ok){
          fetch(Masterhandler,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify(dataAdmin)
          }).then(res=>{
            if(res.ok){
              res.json().then(D=>{
                Dispatch(setPosts(D.posts))
                Dispatch(setMasterData(D));
                SendNotfication(notData);
              })
            }
          })
        }
      })
  };
  const handleRejectPost = (id,title,uid) => {
    let notData = {
      title:"Your Post rejected title:"+title,
      uid:uid
    }
    let dataAdmin ={
        _id:BasicData.uid,
        userType:BasicData.userType
      }
      let data ={
        _id:id,
        status:2
      }
      fetch(POST_HANDLER,{
        method:"PUT",
        headers:JSON_HEADER,
        body:JSON.stringify(data)
      }).then(res=>{
        if(res.ok){
          fetch(Masterhandler,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify(dataAdmin)
          }).then(res=>{
            if(res.ok){
              res.json().then(D=>{
                Dispatch(setPosts(D.posts))
                Dispatch(setMasterData(D));
                SendNotfication(notData)
              })
            }
          })
        }
      })
  };
  const handleConfirmPost = (id,title,uid) => {
    let notData = {
      title:"Your Post confirmed title:"+title,
      uid:uid
    }
    let dataAdmin ={
        _id:BasicData.uid,
        userType:BasicData.userType
      }
      let data ={
        _id:id,
        status:1
      }
      fetch(POST_HANDLER,{
        method:"PUT",
        headers:JSON_HEADER,
        body:JSON.stringify(data)
      }).then(res=>{
        if(res.ok){
          fetch(Masterhandler,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify(dataAdmin)
          }).then(res=>{
            if(res.ok){
              res.json().then(D=>{
                Dispatch(setPosts(D.posts))
                Dispatch(setMasterData(D));
                SendNotfication(notData)
              })
            }
          })
        }
      })
  };


  // Filter and sort posts based on search query, sort order, and current filter
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.createdAt.localeCompare(b.createdAt);
    } else {
      return b.createdAt.localeCompare(a.createdAt);
    }
  });

  let displayedPosts = sortedPosts;
  if (currentFilter !== "all") {
    displayedPosts = sortedPosts.filter(
      (post) => post.status === currentFilter
    );
  }

  // Pagination
  const totalPages = Math.ceil(displayedPosts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPosts = displayedPosts.slice(startIndex, endIndex);

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };
  const formatDate=(string)=>{
    return moment(string).format('DD MMM, YYYY');
 }
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
      <div
        style={{ rowGap: "20px" }}
        className="flex justify-center md:justify-between items-center flex-wrap mb-4"
      >
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              currentFilter === "all"
                ? "bg-[#452a72] text-white"
                : "text-[#452a72]"
            } rounded-l-md focus:outline-none`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              currentFilter === "pending"
                ? "bg-[#452a72] text-white"
                : "text-[#452a72]"
            } focus:outline-none`}
            onClick={() => handleFilter(0)}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              currentFilter === "confirm"
                ? "bg-[#452a72] text-white"
                : "text-[#452a72]"
            } focus:outline-none`}
            onClick={() => handleFilter(1)}
          >
            Confirm
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              currentFilter === "rejected"
                ? "bg-[#452a72] text-white"
                : "text-[#452a72]"
            } rounded-r-md focus:outline-none`}
            onClick={() => handleFilter(2)}
          >
            Rejected
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
          />
          <button
            className="ml-2 px-4 py-2 text-sm font-medium bg-[#452a72] text-white rounded-md focus:outline-none"
            onClick={handleSortOrder}
          >
            {sortOrder === "asc" ? "Latest" : "Oldest"}
          </button>
        </div>
      </div>

      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="h-16 w-full text-sm leading-none text-gray-800">
            <th className="font-normal text-left pl-4">Posts</th>
            <th className="font-normal text-left pl-12">User</th>
            <th className="font-normal text-left pl-12">Status</th>
            <th className="font-normal text-left pl-12">Created At</th>
            <th className="font-normal text-left pl-12">Updated At</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {currentPosts.map((post) => (
            <tr
              key={post._id}
              className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
            >
              <td className="pl-4 cursor-pointer">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 cursor-pointer"
                    onClick={() => navigate(`${post._id}`)}
                  >
                    <LazyLoadImage
                      effect="blur"
                      width="100%"
                      height="100%"
                      className="w-full h-full"
                      src={FILE_URL+post.image2Url}
                    />
                  </div>
                  <div className="pl-4">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs leading-3 text-gray-600 pt-2">
                      Category
                    </p>
                  </div>
                </div>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {post.postedByname}
                </p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {STATUS[post.status]}
                </p>
              </td>

              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {formatDate(post.createdAt)}
                </p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {formatDate(post.updatedAt)}
                </p>
              </td>

              <td className="px-7 2xl:px-0">
                {post.status === 0 ? (
                  <>
                    <Tooltip content="reject Post">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleRejectPost(post._id,post.title,post.postedByID)}
                      >
                        <ClearIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Confirm Post">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleConfirmPost(post._id,post.title,post.postedByID)}
                      >
                        <DoneIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : post.status === 1 ? (
                  <Tooltip content="delete Post">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => handleDltPost(post._id,post.title,post.postedByID)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-5">
        <div className="flex">
          <p className="text-[#452a72]">Total Pages -</p>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${
                currentPage === index + 1
                  ? "bg-[#452a72] text-white"
                  : "text-[#452a72]"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
