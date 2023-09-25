import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import PostTable from "./Component/PostTable";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import moment from "moment";

function PostPage() {
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.handleUserData);

  const [isExpired, setExpired] = useState(false);
  const [isPost, setPostAvilable] = useState(false);
  useLayoutEffect(() => {
    if (UserData != null) {
        if(UserData.isPlanExpired!=null){
            setExpired(UserData.isPlanExpired);
        }else{
            setExpired(true);
        }
        if(UserData.postDate!=null){
            handleEligbility(UserData.postDate);
        }else{
            setPostAvilable(true)
        }
    }
  }, [UserData]);

  const handleEligbility = (date) => {
    const today = moment().startOf("day");
    const selectedDate = moment(date).startOf("day");

    setPostAvilable(selectedDate.isBefore(today) && !selectedDate.isSame(today, "day"))
  };

  const handleNewPost=()=>{

    if(isExpired){
        NotificationManager.error("Package Expired");
        return
    }
    if(!isPost){
        NotificationManager.error("No post available for today");
        return
    }
    navigate("create")
  }

  return (
    <>
      <div className="w-full px-0 md:px-6 py-2">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Post
            </p>
            <div>
              <button
                onClick={handleNewPost}
                className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-[#452a72] hover:bg-transparent border border-[#452a72] hover:text-[#452a72] focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none">
                  Create New Post
                </p>
              </button>
            </div>
          </div>
        </div>
        <PostTable />
      </div>
    </>
  );
}

export default PostPage;
