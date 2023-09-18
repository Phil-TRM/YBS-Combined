
//Paypal Handles
export const CLIENT_ID= "AaO5a0toNCGl-_QadRmD9QFEvFkfZ8tN-TGQebmFOzwBOiV-mOYT9u_yraRUQ8QJNrPswkhYlDLhzKIv"
export const APP_SECRET="EF2AWaa62jQRoAwKv1Gt5iZk3qoWAoElScR0bVgBPDxA_rbZLYvGXU_jSrM9oD6o4n6gbVXgcZFdswTW"

// API Handles
export const BaseUrl = "http://localhost:3001";
// export const BaseUrl = "http://api.sanzdesk.co";
export const API_VERSION_URL=BaseUrl+"/api/v1";
export const FILE_URL=BaseUrl+"/api/v1/";

// Headers
export const JSON_HEADER = {
    "Content-Type": "application/json",
    'Accept':'application/json',
   
}
export const FILE_HEADER = {
    'Accept':'application/json',
    //'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'multipart/form-data'
}

//Master
export const Masterhandler = API_VERSION_URL+"/master";
export const MasterPreLoad = API_VERSION_URL+"/master/pre";

export const HandleContact = API_VERSION_URL+"/settings/contact";
export const HandleHome = API_VERSION_URL+"/settings/home";
export const HandleAbout = API_VERSION_URL+"/settings/about";
export const HandleSign = API_VERSION_URL+"/settings/sign";
export const HandlePricing = API_VERSION_URL+"/settings/pricing";

//Authentication Api
export const UserHandler = API_VERSION_URL+"/auth";
export const CreateCommunityUser = API_VERSION_URL+"/auth/community-user";
export const CheckExits = API_VERSION_URL+"/auth/check-exits";
export const LoginUser = API_VERSION_URL+"/auth/login";
export const LoginCommunityUser = API_VERSION_URL + "/auth/community-login";
export const SetUserDp = API_VERSION_URL+"/auth/dp";
export const ResetPassword = API_VERSION_URL+"/auth/reset-password";
export const VerifiyEmail = API_VERSION_URL+"/auth/verify-email";
export const ChangePassword = API_VERSION_URL+"/auth/change-pasword";
export const PostCreated = API_VERSION_URL+"/auth/post-created";
export const PlanExpired = API_VERSION_URL+"/auth/plan-expired";

//Post
export const POST_HANDLER = API_VERSION_URL+"/post";
export const GET_POST_BY_USER_ID = API_VERSION_URL+"/post/get-by-user";
export const GET_POST_BY_PID = API_VERSION_URL+"/post/get-by-id";
export const HANDLE_CATEGORIES = API_VERSION_URL+"/post/categories";

//payments
export const Historyhandlers = API_VERSION_URL+"/plans/history";
export const PlanDetails = API_VERSION_URL+"/plans/details-by-id";
export const HistoryAll = API_VERSION_URL+"/plans/history-all";
export const HistoryAnaltics = API_VERSION_URL+"/plans/historyforanaltics";

//notifications
export const Notification = API_VERSION_URL+"/notification";
export const GetNotification = API_VERSION_URL+"/notification/get";

export const SendNotfication=(data)=>{
   return fetch(Notification,{
        headers:JSON_HEADER,
        method:"POST",
        body:JSON.stringify(data)
    })
}

