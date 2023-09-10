import React, { useEffect, useLayoutEffect, useState } from "react";
import Img1 from "../Images/Doctors/doctor1.webp";
import { Link } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { Checkbox, Modal, Typography } from "@mui/material";
import { CLIENT_ID, CheckExits, FILE_URL, Historyhandlers, JSON_HEADER, UserHandler } from "../utils/Const";
import { handleNewCommunityUser } from "../utils/CreateCommunityUserUtil"
import { useDispatch, useSelector } from "react-redux";
import { setUserBasic, setUserData } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [certificate, setCertificate] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [howFind, setHowFind] = useState("");
  const [plan, setPlan] = useState("");
  const [prices, setPrices] = useState(new Array());
  const [isTerms, setTerms] = useState(false);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Loading");

  const [img, setImg] = useState("");
  const MasterData = useSelector((state) => state.handleMasterData);
  const Basic = useSelector((state) => state.handleUserBasicData);

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false);

  useLayoutEffect(() => {
    if (MasterData.signupData != null) {
      setImg(FILE_URL + MasterData.signupData.login);
    }
    if (MasterData.prices != null) {
      setPrices(MasterData.prices);
    } else {
      setPrices(new Array());
    }
  }, [MasterData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!submitEnable){
      NotificationManager.warning("Account already exists please login");
      return
    }
    if (!isTerms) {
      NotificationManager.warning("Please accept terms and condtions");
      return;
    }

    if (plan == null) {
      NotificationManager.warning("Please choase a plan");
      return;
    }
    setShow(true);
  };
  const createOrder = (data, actions) => {

    let desc, price;
    for (let i = 0; i < prices.length; i++) {
      const element = prices[i];
      if(element._id == plan){
        desc=element.validity>30?"Yearly package":"Monthly package";
        price=element.price;
      }
      
    }


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
    NotificationManager.error("An Error occured with your payment")
  };

  useEffect(() => {
    if (success) {
      NotificationManager.success("Payment successful!!")
      handleNewCommunityUser({name, email, password, plan});
      handleUserCreation();
    }
  }, [success]);

  useEffect(()=>{
    let data={
      email:email
    }
    try {
      fetch(CheckExits, {
        method: "POST",
        headers: JSON_HEADER,
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          // NotificationManager.warning("Account already exists please login");
         setSubmitEnable(true)
        }else{
          setSubmitEnable(true)
          throw new Error('Something went wrong');
        }
      }).catch(err=>{

      })
    } catch (error) {
      
    }
    
   
  },[email])
  useEffect(()=>{
    let data={
      mobileNumber:mobile
    }
    if(mobile.length>=10){
      try {
        fetch(CheckExits, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.ok) {
            NotificationManager.warning("Account already exists please login");
            setSubmitEnable(false)
          }else{
            setSubmitEnable(true)
            throw new Error('Something went wrong');
          }
        })
      } catch (error) {
        
      }
     
    }
    
  },[mobile])

  const handleUserCreation = () => {
    console.log('here')
    let data = {
      name: name,
      email: email,
      mobileNumber: mobile,
      password: password,
      address: {
        city: city,
        state: state,
        contry: country,
        zipCode: zipcode,
        streetAddress: streetAddress,
      },
      designantion: designation,
      certificate: certificate,
      userType: 1,
      status: 0,
      isEmailVerified: false,
      howfind:howFind
    };

    fetch(UserHandler, {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        res.json().then((d) => {
          let data = d.data;
          NotificationManager.success("Welcome " + data.name);
          setName("");
          setEmail("");
          setMobile("");
          setPassword("");
          setDesignation("");
          setCountry("");
          setState("");
          setCity("");
          setZipcode("");
          setCertificate("");
          setPlan("");
          setPrices("");
          setStreetAddress("");
          setHowFind("");
          Dispatch(setUserData(data));
          Dispatch(setUserBasic({ uid: data._id, userType: 1, isLogin: true }));
          localStorage.setItem("user", JSON.stringify(data));
          let trans ={
            transId:orderID,
            email:email,
            pid:plan
          }
          fetch(Historyhandlers,{
            method:"PUT",
            headers:JSON_HEADER,
            body:JSON.stringify(trans)
          }).then(res=>{
            if(res.ok){
              navigate("/");
            }
          })
        });
      }
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
  <div className="w-full mx-auto">
      <div className="flex justify-center my-12">
        {/* Row */}
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          {/* Col */}
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
          {/* Col */}
          <div className="w-full xl:w-1/2 p-8">
            <form method="post" action="#" onSubmit={handleSubmit}>
              <h3 className="my-4 text-2xl font-semibold text-[#452a72]">
                Sign Up as a Doctor
              </h3>
              <div>
                <span className="text-gray-600 text-sm">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Sign in
                </Link>
              </div>

              <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5 mb-4 mt-6">
                <div className="md:col-span-5">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="Name"
                  >
                    Name
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                    id="Name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="mobile"
                  >
                    Mobile No
                  </label>
                  <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center  focus:outline-none h-10  mt-1  px-4 w-full bg-gray-50 border border-gray-200"
                    id="mobile"
                    type="number"
                    placeholder="Mobile No"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5 ">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                    id="mobile"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5 ">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="Designantion"
                  >
                    Designation
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                    id="Designantion"
                    type="text"
                    placeholder="Designantion"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5">
                  <label
                    htmlFor="country"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Country
                  </label>
                  <select
                    className="h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country.getAllCountries().map((item, id) => (
                      <option key={id} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {country && (
                  <div className="md:col-span-5">
                    <label
                      htmlFor="state"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      State / province
                    </label>
                    <select
                      className="h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State.getStatesOfCountry(country).map((item, id) => (
                        <option key={id} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {state && (
                  <div className="md:col-span-5">
                    <label
                      htmlFor="state"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      City
                    </label>
                    <select
                      className="h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">City</option>
                      {City.getCitiesOfState(country, state).map((item, id) => (
                        <option key={id} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="md:col-span-5">
                  <label
                    htmlFor="zipcode"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Zipcode
                  </label>
                  <input
                    placeholder="Zip Code"
                    type="number"
                    name="zinCode"
                    required
                    id="zipcode"
                    className=" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5">
                  <label
                    htmlFor="zipcode"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Street address
                  </label>
                  <input
                    placeholder="Street Address"
                    name="zinCode"
                    required
                    id="zipcode"
                    className=" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5">
                  <label
                    htmlFor="zipcode"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    How you found the website?
                  </label>
                  <input
                    placeholder="How you found website?"
                    name="howfind"
                    required
                    id="zipcode"
                    className=" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={howFind}
                    onChange={(e) => setHowFind(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Board Certificate
                  </label>
                  <select
                    className="h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none"
                    required
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="ABPS">ABPS</option>
                    <option value="ASPS">ASPS</option>
                    <option value="AAFPRS">AAFPRS</option>
                    <option value="ASOPRS">ASOPRS</option>
                  </select>
                </div>
                <div className="md:col-span-5">
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
                    {prices.map((price, index) => (
                      <option value={price._id} key={index}>
                        {price.validity > 30 ? "Yearly" : "Monthly"}
                      </option>
                    ))}
                  </select>
                  <div className="form-check flex justify-center items-center mx-auto">
                    <input
                      style={{ width: "15px", height: "15px" }}
                      className="form-check-input me-2 "
                      type="checkbox"
                      value={isTerms}
                      onChange={(e) => setTerms(e.target.checked)}
                      id="form2Example3cg"
                    />
                    <label className="form-check-label" htmlFor="form2Example3g">
                      I agree all statements in{" "}
                      <Link to="/privacyPolicy" className="text-body">
                        <u>Terms of service</u>
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex w-full mt-8 justify-center">
                <button
                  style={{display:!show?"flex":"none"}}
                  className="justify-center w-full bg-[#452a72] hover:bg-transparent text-white hover:text-[#452a72] hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit"
                >
                  Subscribe
                </button>
                <Modal
                onClose={()=>{setShow(false)}}
                open={show}
                className="flex justify-center items-center"
            >
              <div className="bg-white rounded-lg shadow-md p-8 w-1/3 h-1/2 overflow-scroll no-scrollbar">
              <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                    />
              </div>
                
            </Modal>
              </div>
            </form>
            <div className="flex flex-col space-y-5 mt-3">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">
                  or free signup
                </span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <Link
                  to="/register-as-a-user"
                  style={{ textDecoration: "none" }}
                  className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-[#452a72] rounded-md group hover:bg-[#452a72] focus:outline-none"
                >
                  <span className="text-[#452a72] group-hover:text-white">
                    <i className="fas fa-user user-icon "></i>
                  </span>
                  <span className="text-sm font-medium text-[#452a72] group-hover:text-white">
                    Signup as a User
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </PayPalScriptProvider>
  
  );
};

export default Register;
