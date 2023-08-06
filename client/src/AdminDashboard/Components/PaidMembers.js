import React, { useLayoutEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

import { TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILE_URL,
  JSON_HEADER,
  UserHandler,
  Masterhandler,
  SendNotfication,
} from "../../utils/Const";
import moment from "moment/moment";
import { setMasterData, setPosts } from "../../Redux/Actions";

const UserTable = () => {
  const MasterData = useSelector((state) => state.handleMasterData);
  const BasicData = useSelector((state) => state.handleUserBasicData);
  const Dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState(new Array());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const itemsPerPage = 5;

  useLayoutEffect(() => {
    if (MasterData.allUsers != null) {
      let arr = new Array();
      for (let i = 0; i < MasterData.allUsers.length; i++) {
        const element = MasterData.allUsers[i];
        if (element.userType == 1) {
          arr.push(element);
        }
      }
      setMembers(arr);
    }
  }, [MasterData]);

  const handleMakeAdmin = (id) => {
    let notData={
      uid:id,
      title:"You apointed as admin."
    }
    let dataAdmin = {
      _id: BasicData.uid,
      userType: BasicData.userType,
    };
    let data = {
      _id: id,
      userType: 2,
      emailType: "Admin",
    };
    fetch(UserHandler, {
      method: "PUT",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        fetch(Masterhandler, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify(dataAdmin),
        }).then((res) => {
          if (res.ok) {
            res.json().then((D) => {
              Dispatch(setPosts(D.posts));
              Dispatch(setMasterData(D));
              SendNotfication(notData);
            });
          }
        });
      }
    });
  };
  const handleRejectMember = (id) => {
    let notdata={
      title:"You are rejected as doctor",
      uid:id
    }
    let dataAdmin = {
      _id: BasicData.uid,
      userType: BasicData.userType,
    };
    let data = {
      _id: id,
      status: 2,
      emailType: "Reject",
    };
    fetch(UserHandler, {
      method: "PUT",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        fetch(Masterhandler, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify(dataAdmin),
        }).then((res) => {
          if (res.ok) {
            res.json().then((D) => {
              Dispatch(setPosts(D.posts));
              Dispatch(setMasterData(D));
              SendNotfication(notdata)
            });
          }
        });
      }
    });
  };
  const handleConfirmMember = (id) => {
    let notData={
      title:"Your profile is accepted as doctor",
      uid:id
    }
    let dataAdmin = {
      _id: BasicData.uid,
      userType: BasicData.userType,
    };
    let data = {
      _id: id,
      status: 1,
      emailType: "Confirm",
    };
    fetch(UserHandler, {
      method: "PUT",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        fetch(Masterhandler, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify(dataAdmin),
        }).then((res) => {
          if (res.ok) {
            res.json().then((D) => {
              Dispatch(setPosts(D.posts));
              Dispatch(setMasterData(D));
              SendNotfication(notData)
            });
          }
        });
      }
    });
  };

  const handleDltMember = (id) => {
    let dataAdmin = {
      _id: BasicData.uid,
      userType: BasicData.userType,
    };
    let data = {
      _id: id,
    };
    fetch(UserHandler, {
      method: "DELETE",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        fetch(Masterhandler, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify(dataAdmin),
        }).then((res) => {
          if (res.ok) {
            res.json().then((D) => {
              Dispatch(setPosts(D.posts));
              Dispatch(setMasterData(D));
            });
          }
        });
      }
    });
  };
  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };
  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    //|| member.planDetails.planName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort members based on created at in ascending or descending order
  const sortedMembers = filteredMembers.sort((a, b) => {
    const dateA = new Date(a.createdAt.split("/").reverse().join("-"));
    const dateB = new Date(b.createdAt.split("/").reverse().join("-"));

    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  // Paginate the sorted members based on the current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedMembers = sortedMembers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sort order change
  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Members..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
        />
        <button
          className="ml-2 px-4 py-2 text-sm font-medium bg-[#452a72] text-white rounded-md focus:outline-none"
          onClick={handleSortOrder}
        >
          {sortOrder === "asc" ? "Latest" : "Oldest"}
        </button>
      </div>
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="h-16 w-full text-sm leading-none text-gray-800">
            <th className="font-normal text-left pl-4">User</th>
            <th className="font-normal text-left pl-12">Contact</th>
            <th className="font-normal text-left pl-12">Certificate</th>
            <th className="font-normal text-left pl-12">Current Plan</th>
            <th className="font-normal text-left pl-16">Created At</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {paginatedMembers.map((member) => (
            <tr
              key={member._id}
              className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
            >
              <td className="pl-4 cursor-pointer">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10"
                    onClick={() => navigate(`${member._id}`)}
                  >
                    <LazyLoadImage
                      effect="blur"
                      width="100%"
                      height="100%"
                      className="w-full h-full"
                      src={FILE_URL + member.dp}
                    />
                  </div>
                  <div className="pl-4">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs leading-3 text-gray-600 pt-2">
                      {member.designation}
                    </p>
                  </div>
                </div>
              </td>
              <td className="pl-12">
                <p className="font-medium">{member.email}</p>
                <p className="text-xs leading-3 text-gray-600 pt-2">
                  {member.mobileNumber}
                </p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {member.certificate}
                </p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {/* {member.planDetails.planName} */}
                </p>
              </td>

              <td className="pl-16">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {formatDate(member.createdAt)}
                </p>
              </td>
              <td className="px-7 2xl:px-0">
                {member.status === 0 ? (
                  <>
                    <Tooltip content="Reject member">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleRejectMember(member._id)}
                      >
                        <ClearIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Confirm member">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleConfirmMember(member._id)}
                      >
                        <DoneIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : member.status === 1 ? (
                  <>
                    <Tooltip content="Delete member">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleDltMember(member._id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Make admin">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleMakeAdmin(member._id)}
                      >
                        <UserIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  </>
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

export default UserTable;
