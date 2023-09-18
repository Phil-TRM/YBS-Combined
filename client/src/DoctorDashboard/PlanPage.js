import React, { useEffect, useLayoutEffect, useState } from "react";
import Pricing from "../Pages/Pricing";
import DashboardPricing from "./Component/DashboardPricing";
import { useSelector } from "react-redux";
import {
  CLIENT_ID,
  Historyhandlers,
  JSON_HEADER,
  PlanDetails,
  PlanExpired,
} from "../utils/Const";
import { NotificationManager } from "react-notifications";
import moment from "moment/moment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";

let price,desc;

function PlanPage() {
  const UserData = useSelector((state) => state.handleUserData);
  const MasterData = useSelector((state) => state.handleMasterData);
  const [userData, setUserData] = useState(UserData);
  const [plans, setPlans] = useState(UserData.planDetails);
  const [planMore, setPlanMore] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [status, setStatus] = useState("Expired");
  const [prices, setPrices] = useState(new Array());
  const [plan, setPlan] = useState("");

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [expireDate, setExpireDate] = useState("");
const navigate =  useNavigate();
//   const [desc, setDesc] = useState("");
//   const [price, setPrice] = useState("");

  useLayoutEffect(() => {
    if (UserData != null) {
      setUserData(UserData);
      setPlans(UserData.planDetails);
      getMoreDetails();
      calulatetime();
    }
  }, [UserData]);

  useLayoutEffect(() => {
    if (MasterData.prices != null) {
      setPrices(MasterData?.prices);
    } else {
      setPrices(new Array());
    }
  }, [MasterData]);

  useEffect(() => {
    if (plan != "") {
      for (let i = 0; i < prices.length; i++) {
        const element = prices[i];
        if (element._id == plan) {
          desc =element.validity > 30 ? "Yearly package" : "Monthly package";
        //   setDesc(desc);
        //   setPrice(element.price);
        price=element.price;
        }
      }
    }
  }, [plan]);

  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };

  const getMoreDetails = () => {
    fetch(PlanDetails, {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify({ pid: plans?.planId }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((d) => {
          setPlanMore(d.data);
        });
      } else {
        NotificationManager.error("Some Error while loading plan");
      }
    });
  };
  const calulatetime = () => {
    let date = moment(formatDate(plans?.from), "DD MMM, YYYY").add(
      plans?.validity,
      "days"
    );
    setExpireDate(formatDate(date));
    var start = moment(new Date(), "YYYY-MM-DD");
    var end = moment(date, "YYYY-MM-DD");
    let days = moment.duration(end.diff(start)).asDays();
    setDaysLeft(parseInt(days));
    if (days < 1) {
      fetch(PlanExpired, {
        method: "POST",
        headers: JSON_HEADER,
        body: JSON.stringify({ _id: UserData?._id }),
      });
    }else
    {
      setStatus("Live");
    }
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: desc,
            amount: {
              currency_code: "USD",
              value: price,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    NotificationManager.error("An Error occured with your payment");
  };

  useEffect(() => {
    if (success) {
      NotificationManager.success("Payment successful!!");
      handleUserCreation();
    }
  }, [success]);

  const handleUserCreation = () => {
    let trans = {
      transId: orderID,
      email: userData?.email,
      pid: plan,
    };
    fetch(Historyhandlers, {
      method: "PUT",
      headers: JSON_HEADER,
      body: JSON.stringify(trans),
    }).then((res) => {
      if (res.ok) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
        <div className="w-full bg-gray-200 dark:bg-gray-900 py-2 sm:py-3">
          <div className="container mx-auto px-0 sm:px-3  flex items-start justify-center">
            <div className="w-full">
              {/* Card is full width. Use in 12 col grid for best view. */}
              {/* Card code block start */}
              <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
                <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                  <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">
                    Plan
                  </h1>
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="mt-4 lg:mt-0 mr-0 xl:mr-8 text-sm bg-[#bac3df] text-[#452a72] dark:text-[#452a72] rounded font-medium py-2 w-48 flex justify-center">{`Start Date: ${formatDate(
                      plans?.from
                    )}`}</div>
                    <div className="mt-4 lg:mt-0 mr-0 lg:mr-4 xl:mr-8 text-sm bg-red-100 text-red-500 rounded font-medium py-2 w-48 flex justify-center">{`End Date: ${expireDate}`}</div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                  <div className="w-full lg:w-1/2 pr-0 lg:pr-48">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded">
                        <img
                          className="w-full h-full overflow-hidden object-cover rounded object-center"
                          src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_28.png"
                          alt="logo"
                        />
                      </div>
                      <div className="ml-2">
                        <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">
                          {plans?.planName}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">
                          {" "}
                          {`Paid- ${planMore?.price} $`}{" "}
                        </p>
                      </div>
                    </div>
                    <ul className="flex flex-col mb-6 mt-5 text-gray-600 dark:text-gray-400">
                      <li className="flex items-center mb-1">
                        <img
                          src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                          className="mr-4"
                          alt="check-mark"
                        />
                        <p className=" text-base font-normal">
                          1 Post per day
                        </p>
                      </li>
                      <li className="flex items-center mb-1">
                        <img
                          src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                          className="mr-4"
                          alt="check-mark"
                        />
                        <p className="text-base font-normal">Full accsess</p>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        setShow(true);
                      }}
                      style={{ display: !show ? "flex" : "none" }}
                      className="bg-[#452a72] font-medium transition duration-150 ease-in-out hover:bg-transparent rounded text-white hover:text-[#452a72] px-6 py-2 text-sm border border-[#452a72] ] focus:outline-none"
                    >
                      Upgrade Plan
                    </button>
                    <div
                      style={{ display: show ? "flex" : "none" }}
                      className="flex flex-col"
                    >
                      <label
                        htmlFor="state"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                      >
                        Choose Plan
                      </label>
                      <select
                        className="mb-4 h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                        required
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                      >
                        <option value="0">Choose Plan</option>
                        {prices?.map((price, index) => (
                          <option value={price?._id} key={index}>
                            {price?.validity > 30 ? "Yearly" : "Monthly"}
                          </option>
                        ))}
                      </select>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                  </div>
                  <div className="lg:pl-8 w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center">
                    <div className="mr-12 flex lg:block items-center lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
                      <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">
                        {plans?.validity}
                      </h2>
                      <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                        Total Days
                      </p>
                    </div>
                    <div className="mr-12 flex lg:block lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
                      <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">
                        {daysLeft}
                      </h2>
                      <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                        Expired in
                      </p>
                    </div>
                    <div className="mt-5 flex lg:block lg:mt-0">
                      <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">
                        {status}
                      </h2>
                      <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                        Status
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card code block end */}
            </div>
          </div>
        </div>
        {/* <div className="w-full bg-gray-200 dark:bg-gray-900 py-2 sm:py-3 ">
                <div className="container mx-auto  px-0 sm:px-3  flex items-start justify-center">
                    <div className="w-full">
                      
                        <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">Other Plans</h1>

                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <DashboardPricing />
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div> */}
      </PayPalScriptProvider>
    </>
  );
}
export default PlanPage;
