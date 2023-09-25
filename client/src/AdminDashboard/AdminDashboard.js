import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HistoryAll, HistoryAnaltics, JSON_HEADER } from "../utils/Const";
import moment from "moment";

export default function AdminDashboard() {
  const MasterData = useSelector((state) => state.handleMasterData);

  const [DoctorsCount, setDocCount] = useState(0);
  const [UsersCount, setUserCount] = useState(0);
  const [PostsCount, setPostCount] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [pendingBlogs, setPendingBlogs] = useState(0);
  const [totalSale, setTotalsale] = useState(0);
  const [plans, setPlans] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useLayoutEffect(() => {
    try {
      if (MasterData.forAdminpPost != null && MasterData.allUsers != null) {
        setPostCount(MasterData.forAdminpPost.length);
        for (let i = 0; i < MasterData.allUsers.length; i++) {
          const element = MasterData.allUsers[i];
          if (element.userType == 0) {
            setUserCount(UsersCount + 1);
            if (element.status == 0) {
              pendingUsers(pendingUsers + 1);
            }
          }
          if (element.userType == 1) {
            setDocCount(DoctorsCount + 1);
          }
        }
        for (let i = 0; i < MasterData.forAdminpPost.length; i++) {
          const element = MasterData.forAdminpPost[i];
          if (element.status == 0) {
            setPendingBlogs(pendingBlogs + 1);
          }
        }
      }
    } catch (error) {}
  }, [MasterData]);

  useLayoutEffect(() => {
    fetch(HistoryAll, {
      method: "POST",
      headers: JSON_HEADER,
    }).then((d) => {
      if (d.ok) {
        d.json().then((dd) => {
          let data = dd.data;
          let users = 0;
          let sales = 0;
          let TotalSale=0;
          let notification = 4;
          let notificationArrey = [];
          let plansArrey = [];
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (i < notification) {
              let notData = {
                id: element._id,
                text: `$${element.price}, ${element.currentPlan} sale`,
                time: formatDate(element.createdAt),
              };
              notificationArrey.push(notData);
            }
            if(element.validity>30){
              users = users+1;
              sales=element.price+sales;
            }
            TotalSale=element.price+TotalSale
          }

          let month ={
            id: 1,
            name: "Monthly Plan",
            members: (data.length-users),
            sale: `$${(TotalSale-sales)}`,
            average: parseInt(((data.length-users)*100)/DoctorsCount)+"%",
          }
          let yearly ={
            id: 2,
            name: "Yearly Plan",
            members: users,
            sale: sales,
            average: (users*100)/DoctorsCount,
          }
          plansArrey.push(month);
          plansArrey.push(yearly);

          setPlans(plansArrey);
          setNotifications(notificationArrey);
        });
      }
    });
  });
  useEffect(()=>{
    fetch(HistoryAnaltics,{
      method: "POST",
      headers: JSON_HEADER,
    }).then((d) => {
      if (d.ok) {
        d.json().then((dd) => {
          let data = dd.data;
          let TotalSale=0;
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            TotalSale=element.price+TotalSale
          }
          setTotalsale(TotalSale);
        });
      }
    });
  },[])

  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };

  return (
    <>
      <div className="relative py-3">
        <div className="px-3 md:px-3 mx-auto w-full">
          <div>
            <div className="flex flex-wrap md:gap-y-4">
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Doctors
                        </h5>
                        <span className=" text-xl">{DoctorsCount}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                          <i className="far fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-4">
                      <span className="text-emerald-500 mr-2">
                        <i className="fas fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="whitespace-nowrap">
                        Since last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Users
                        </h5>
                        <span className=" text-xl">{UsersCount}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                          <i className="fas fa-users"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-4">
                      <span className="text-red-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 3.48%
                      </span>
                      <span className="whitespace-nowrap">Since last week</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Meterial
                        </h5>
                        <span className=" text-xl">{PostsCount}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]">
                          <i className="fa-solid fa-book"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-4">
                      <span className="text-red-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 3.48%
                      </span>
                      <span className="whitespace-nowrap">Since last week</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          SALES
                        </h5>
                        <span className=" text-xl">{totalSale}$</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                          <i className="fas fa-chart-pie"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-4">
                      <span className="text-orange-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 1.10%
                      </span>
                      <span className="whitespace-nowrap">
                        Since last Month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Pending Users
                        </h5>
                        <span className=" text-xl">{pendingUsers}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500">
                          <i className="fas fa-users"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-4">
                      <span className="text-orange-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 1.10%
                      </span>
                      <span className="whitespace-nowrap">
                        Since last Month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase  text-xs">
                          Pending blog
                        </h5>
                        <span className=" text-xl">{pendingBlogs}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#293770]">
                          <i className="fa-solid fa-book"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-500 mt-4">
                      <span className="text-orange-500 mr-2">
                        <i className="fas fa-arrow-down"></i> 1.10%
                      </span>
                      <span className="whitespace-nowrap">
                        Since last Month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 px-1 md:px-3 my-3 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
            <div>
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                Plans
              </h6>
              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-[#452a72]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4 text-[#452a72]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
                <strong>3000 sale</strong> total
              </p>
            </div>
            <button
              aria-expanded="false"
              aria-haspopup="menu"
              id=":r5:"
              className="relative middle none font-sans font-medium text-center uppercase n-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currenColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">
                      plans
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">
                      members
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">
                      sale
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">
                      Average
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={index}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <img
                          src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                          alt="Material XD Version"
                          className="inline-block relative object-cover object-center w-9 h-9 rounded-md"
                        />
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                          {plan.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-xs font-medium text-[#452a72]">
                        {plan.members}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-xs font-medium text-[#452a72]">
                        {plan.sale}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="w-10/12">
                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-[#452a72]">
                          {plan.average}
                        </p>
                        <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div
                            className="flex justify-center items-center h-full bg-gradient-to-tr from-[#7963a7] to-[#452a72] text-white"
                            style={{ width: plan.average }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-2">
              Notifications
            </h6>
            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-[#452a72]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                ></path>
              </svg>
              <strong>24%</strong> this month
            </p>
          </div>
          <div className="p-6 pt-0">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 py-3"
              >
                <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] after:h-4/6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="!w-5 !h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="antialiased font-sans text-sm leading-normal text-blue-gray-900 block font-medium">
                    {notification.text}
                  </p>
                  <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
