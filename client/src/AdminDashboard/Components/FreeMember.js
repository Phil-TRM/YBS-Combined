import React, { useLayoutEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILE_URL,
  JSON_HEADER,
  UserHandler,
  Masterhandler,
} from "../../utils/Const";
import moment from "moment/moment";
import { setMasterData, setPosts } from "../../Redux/Actions";
let STATUS = {
  0: "Pending",
  1: "Confirm",
  2: "Rejected",
};
const FreeMembers = () => {
  const MasterData = useSelector((state) => state.handleMasterData);
  const BasicData = useSelector((state) => state.handleUserBasicData);
  const Dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("all"); // Default filter is 'all'
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order is 'asc'
  const [members, setMembers] = useState(new Array());
  const itemsPerPage = 5;

  useLayoutEffect(() => {
    if (MasterData.allUsers != null) {
      let arr = new Array();
      for (let i = 0; i < MasterData.allUsers.length; i++) {
        const element = MasterData.allUsers[i];
        if (element.userType != 1) {
          arr.push(element);
        }
      }
      setMembers(arr);
    }
  }, [MasterData]);
  // Array of objects representing table rows data
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

  const handleRejectMember = (id) => {
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
            });
          }
        });
      }
    });
  };

  const handleConfirmMember = (id) => {
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
            });
          }
        });
      }
    });
  };
  const handleMakeAdmin = (id) => {
    let dataAdmin = {
      _id: BasicData.uid,
      userType: BasicData.userType,
    };
    let data = {
      _id: id,
      userType: 2,
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
            });
          }
        });
      }
    });
  };

  // Filter members based on search query and current filter
  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.address.city
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (currentFilter === "all" || member.status === currentFilter)
  );

  // Sort members based on createdAt and sortOrder
  const sortedMembers = filteredMembers.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  // Handle filter change
  const handleFilter = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1); // Reset current page when changing the filter
  };

  // Handle sort order change
  const handleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  // Calculate the index of the last and first items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current items to display
  const currentItems = sortedMembers.slice(indexOfFirstItem, indexOfLastItem);

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };

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
      </div>
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="h-16 w-full text-sm leading-none text-gray-800">
            <th className="font-normal text-left pl-4">User</th>
            <th className="font-normal text-left pl-12">Phone No</th>
            <th className="font-normal text-left pl-12">Description</th>
            <th className="font-normal text-left pl-12">Status</th>
            <th className="font-normal text-left pl-12">City</th>
            <th className="font-normal text-left pl-16">Created At</th>
            <th className="px-7  2xl:px-0"></th>
          </tr>
        </thead>
        <tbody className="w-full">
          {currentItems.map((member) => (
            <tr
              key={member._id}
              className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
            >
              <td className="pl-4 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10">
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
                      {member.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {member.mobileNumber}
                </p>
              </td>
              <td className="pl-12">
                <Popover>
                  <PopoverHandler>
                    <p className="cursor-pointer text-sm font-medium leading-none text-gray-800">
                      {" "}
                      {member.aboutUser != null
                        ? member.aboutUser.slice(0, 8)
                        : "N/A"}
                      ...
                    </p>
                  </PopoverHandler>
                  <PopoverContent
                    className="w-72"
                    style={{
                      fontFamily: "sans-serif",
                      lineHeight: "12px",
                      letterSpacing: "2px",
                    }}
                  >
                    {member.aboutUser}
                  </PopoverContent>
                </Popover>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {member.userType == 2 ? "Admin" : STATUS[member.status]}
                </p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {member.address.city}
                </p>
              </td>

              <td className="pl-16">
                <p className="text-sm font-medium leading-none text-gray-800">
                  {formatDate(member.createdAt)}
                </p>
              </td>
              <td className="px-7  2xl:px-0">
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
                    {member.userType != 2 ? (
                      <Tooltip content="Make admin">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleMakeAdmin(member._id)}
                        >
                          <UserIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
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

export default FreeMembers;
