import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'react-notifications/lib/notifications.css';
import 'react-quill/dist/quill.snow.css';
import {NotificationContainer} from 'react-notifications';
import Loader from './Components/Loader';
import NotFound from './Components/404Page';
import EditProfile from './DoctorDashboard/Component/EditProfile';
import Profile from './AdminDashboard/Profile';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Posts from './AdminDashboard/Posts';
import Settings from './AdminDashboard/Settings';
import AdminEditProfile from './AdminDashboard/Components/EditProfile';
import Category from './AdminDashboard/Category';
import Users from './AdminDashboard/Users';
import PaidSingleUser from './AdminDashboard/Components/PaidSingleUser';
import SinglePost from './AdminDashboard/Components/SinglePost';
import UpdatePost from './DoctorDashboard/UpdatePost';
import DoctorsPage from './AdminDashboard/DoctorsPage';
import PaymentPage from './AdminDashboard/PaymentPage';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_VERSION_URL, JSON_HEADER, Masterhandler, MasterPreLoad, PlanExpired, UserHandler } from './utils/Const';
import { setMasterData, setPosts, setUserBasic, setUserData, setUserPosts } from './Redux/Actions';
import ResetPasswordForm from './Pages/ForgetPassFarm';
import ForgotPassword from './Pages/ForgotPassword';
import EmailVerificationSuccessPage from './Pages/VerfiyEmail';
import moment from 'moment';
import RefundPolicy from './Pages/RefundPolicy';
import Discloser from './Pages/Discloser';

const Home = lazy(() => import('../src/Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Articles = lazy(() => import('./Pages/Articles'));
const Doctors = lazy(() => import('./Pages/Doctors'));
const Login = lazy(() => import('./Pages/Login'));
const SingleMember = lazy(() => import('./Components/Members/SingleMember'));
const SinglePageArticles = lazy(() => import('./Components/Articles/SinglePageArticles/SinglePageArticls'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const Register = lazy(() => import('./Pages/Register'));
const FreeRegister = lazy(() => import('./Pages/FreeRegister'));
const Dashboard = lazy(() => import('./DoctorDashboard/Dashboard'));
const Layout2 = lazy(() => import('./Layout/Layout2'));
const Layout = lazy(() => import('./Layout/Layout'));
const PostPage = lazy(() => import('./DoctorDashboard/PostPage'));
const Profilepage = lazy(() => import('./DoctorDashboard/Profilepage'));
const CreatePost = lazy(() => import('./DoctorDashboard/CreatePost'));
const PlanPage = lazy(() => import('./DoctorDashboard/PlanPage'));

let userID,userType;
const App = () => {
  const Dispatch =  useDispatch();
  const udata = useSelector(state=>state.handleUserData);
  const [UserData,setUserDataState] = useState(udata)
  const [plans, setPlans] = useState("");

 
  useLayoutEffect(()=>{
    if(localStorage.getItem("user")!=null){
      let data = JSON.parse(localStorage.getItem("user"))
      userID = data._id;
      userType=data.userType;
      handleLoginUser();
      Dispatch(setUserData(data));
      Dispatch(setUserBasic({uid:userID,userType:userType,isLogin:true}))
    }else{
      userType=0;
      handlePreLoad();
    }
  },[])
  useEffect(()=>{
    if(localStorage.getItem("user")!=null){
      let data = JSON.parse(localStorage.getItem("user"))
      userID = data._id;
      userType=data.userType;
      Dispatch(setUserBasic({uid:userID,userType:userType,isLogin:true}))
      setUserDataState(udata);
      loadMasterData()
    }else{
      userType=0;
    }
  },[udata])



  const handleLoginUser=()=>{
    let data = {
      _id:userID
    }
    fetch(UserHandler,{
      method:"POST",
      headers:JSON_HEADER,
      body:JSON.stringify(data)
    }).then(res=>{
      if(res.ok){
        res.json().then(d=>{
          let data = d.data;
          localStorage.setItem("user",JSON.stringify(data));
          Dispatch(setUserData(data))
          calulatetime(data)
          setUserDataState(data)
          loadMasterData();
        })
      }
    })
  }
  const loadMasterData=()=>{
    let data ={
      _id:userID,
      userType:userType
    }
    fetch(Masterhandler,{
      method:"POST",
      headers:JSON_HEADER,
      body:JSON.stringify(data)
    }).then(res=>{
      if(res.ok){
        res.json().then(D=>{
          if(userType==0){
            Dispatch(setPosts(D.posts))
            Dispatch(setMasterData(D));
          }
          if(userType==1){
            Dispatch(setUserPosts(D.postByMe))
            Dispatch(setPosts(D.posts))
            Dispatch(setMasterData(D));
          }
          if(userType==2){
            Dispatch(setPosts(D.posts))
            Dispatch(setMasterData(D));
          }
       
        })
      }
    })
  }
  const  handlePreLoad=()=>{
    fetch(MasterPreLoad,{
      method:"POST",
      headers:JSON_HEADER,
    }).then(res=>{
      if(res.ok){
        res.json().then(D=>{
          Dispatch(setMasterData(D));
        })
      }
    })
  };

  const calulatetime = (UserData) => {
    if(UserData.planDetails!=null){
      let date = moment(formatDate(UserData.planDetails.from), "DD MMM, YYYY").add(
        UserData.planDetails.validity,
        "days"
      );
      var start = moment(new Date(), "YYYY-MM-DD");
      var end = moment(date, "YYYY-MM-DD");
      let days = moment.duration(end.diff(start)).asDays();
     
      if (days < 1) {
        fetch(PlanExpired, {
          method: "POST",
          headers: JSON_HEADER,
          body: JSON.stringify({ _id: UserData._id }),
        });
      }
    }
   
  };
  const formatDate = (string) => {
    return moment(string).format("DD MMM, YYYY");
  };
  return (
    <Router>
      <Suspense  fallback={<Loader />}>
      <NotificationContainer/>
        <Routes>
          <Route exact path="/*" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="articles" element={<Articles />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register-as-a-user" element={<FreeRegister />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="articles/:slug" element={<SinglePageArticles />} />
            <Route path="post-by/:id" element={<SingleMember />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="disclosure" element={<Discloser />} />
            <Route path="password" element={<ForgotPassword />} />
            <Route path="password/reset/:id" element={<ResetPasswordForm />} />
            <Route path="email-verify/:id" element={<EmailVerificationSuccessPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>




          {
            UserData &&  UserData.userType!=0 &&UserData.userType == 2 ?
              <Route exact path={`/admin/*`} element={<Layout2 />}>
                <Route exact path="dashboard" element={<AdminDashboard />} />
                <Route exact path="profile" element={<Profile />} />
                <Route exact path="doctors" element={<DoctorsPage />} />
                <Route exact path="users" element={<Users />} />
                <Route exact path="doctors/:id" element={<PaidSingleUser />} />
                <Route exact path='profile/edit' element={<AdminEditProfile />} />
                <Route exact path="setting" element={<Settings />} />
                <Route exact path="posts" element={<Posts />} />
                <Route exact path="payments" element={<PaymentPage />} />
                <Route exact path="payments/:id/doctor" element={<PaidSingleUser />} />
                <Route exact path="posts/:id" element={<SinglePost />} />
                <Route exact path="category" element={<Category />} />
              </Route>
              :
              <Route exact path={`/doctor/*`} element={<Layout2/>}>
                <Route exact path='dashboard' element={<Dashboard />} />
                <Route exact path='posts' element={<PostPage />} />
                <Route exact path='posts/edit' element={<UpdatePost />} />
                <Route exact path='profile' element={<Profilepage />} />
                <Route exact path='posts/create' element={<CreatePost />} />
                <Route exact path='plan' element={<PlanPage />} />
                <Route exact path='profile/edit' element={<EditProfile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
          }

        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
