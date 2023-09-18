import moment from "moment";
import { NotificationManager } from "react-notifications";

//Paypal Handles
export const CLIENT_ID =
  "AaO5a0toNCGl-_QadRmD9QFEvFkfZ8tN-TGQebmFOzwBOiV-mOYT9u_yraRUQ8QJNrPswkhYlDLhzKIv";
export const APP_SECRET =
  "EF2AWaa62jQRoAwKv1Gt5iZk3qoWAoElScR0bVgBPDxA_rbZLYvGXU_jSrM9oD6o4n6gbVXgcZFdswTW";

// API Handles
export const BaseUrl = "http://localhost:3001";
// export const BaseUrl = "http://api.sanzdesk.co";
export const API_VERSION_URL = BaseUrl + "/api/v1";
export const FILE_URL = BaseUrl + "/api/v1/";

// Headers
export const JSON_HEADER = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const FILE_HEADER = {
  Accept: "application/json",
  //'Content-Type': 'application/x-www-form-urlencoded',
  //'Content-Type': 'multipart/form-data'
};

//Master
export const Masterhandler = API_VERSION_URL + "/master";
export const MasterPreLoad = API_VERSION_URL + "/master/pre";

export const HandleContact = API_VERSION_URL + "/settings/contact";
export const HandleHome = API_VERSION_URL + "/settings/home";
export const HandleAbout = API_VERSION_URL + "/settings/about";
export const HandleSign = API_VERSION_URL + "/settings/sign";
export const HandlePricing = API_VERSION_URL + "/settings/pricing";

//Authentication Api
export const UserHandler = API_VERSION_URL + "/auth";
export const CheckExits = API_VERSION_URL + "/auth/check-exits";
export const LoginUser = API_VERSION_URL + "/auth/login";
export const SetUserDp = API_VERSION_URL + "/auth/dp";
export const ResetPassword = API_VERSION_URL + "/auth/reset-password";
export const VerifiyEmail = API_VERSION_URL + "/auth/verify-email";
export const ChangePassword = API_VERSION_URL + "/auth/change-pasword";
export const PostCreated = API_VERSION_URL + "/auth/post-created";
export const PlanExpired = API_VERSION_URL + "/auth/plan-expired";

//Post
export const POST_HANDLER = API_VERSION_URL + "/post";
export const GET_POST_BY_USER_ID = API_VERSION_URL + "/post/get-by-user";
export const GET_POST_BY_PID = API_VERSION_URL + "/post/get-by-id";
export const HANDLE_CATEGORIES = API_VERSION_URL + "/post/categories";
export const GET_TYPE_CATEGORIES =
  API_VERSION_URL + "/post/categories/get-by-type";

//payments
export const Historyhandlers = API_VERSION_URL + "/plans/history";
export const PlanDetails = API_VERSION_URL + "/plans/details-by-id";
export const HistoryAll = API_VERSION_URL + "/plans/history-all";
export const HistoryAnaltics = API_VERSION_URL + "/plans/historyforanaltics";

//notifications
export const Notification = API_VERSION_URL + "/notification";
export const GetNotification = API_VERSION_URL + "/notification/get";

//notes
export const HANDLE_NOTES = API_VERSION_URL + "/notes";
export const GET_NOTES = API_VERSION_URL + "/notes/get";
export const GET_NOTES_BY_CATE = API_VERSION_URL + "/notes/get-by-categories";
export const GET_NOTES_BY_USER = API_VERSION_URL + "/notes/get-by-user";
export const GET_NOTES_BY_ID = API_VERSION_URL + "/notes/get-by-id";

//instagram
export const HANDLE_INSTAGRAM = API_VERSION_URL + "/instagram";
export const GET_INSTAGRAM = API_VERSION_URL + "/instagram/get";
export const GET_INSTAGRAM_BY_CATE =
  API_VERSION_URL + "/instagram/get-by-categories";
export const GET_INSTAGRAM_BY_USER = API_VERSION_URL + "/instagram/get-by-user";
export const GET_INSTAGRAM_BY_ID = API_VERSION_URL + "/instagram/get-by-id";

//questions answers
export const HANDLE_QUESTIONS = API_VERSION_URL + "/questions";
export const GET_QUESTIONS = API_VERSION_URL + "/questions/get";
export const GET_QUESTIONS_BY_CATE =
  API_VERSION_URL + "/questions/get-by-categories";
export const GET_QUESTIONS_BY_USER = API_VERSION_URL + "/questions/get-by-user";
export const GET_QUESTIONS_BY_ID = API_VERSION_URL + "/questions/get-by-id";
export const HANDLE_QUESTIONS_ANSWERS = API_VERSION_URL + "/questions/answers";


export const FormatDate=(string)=>{
  return moment(string).format('DD MMM, YYYY');
}

export const GetMasterData = (data) => {
  return fetch(Masterhandler, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then(d=>{
    if(d.ok){
      return d.json();
    }else{
      return null
    }
  });
};

export const SendNotfication = (data) => {
  return fetch(Notification, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const GetTypeCategroies = (data) => {
  return fetch(GET_TYPE_CATEGORIES, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const DeleteCategroies = (_id) => {
  return fetch(HANDLE_CATEGORIES, {
    headers: JSON_HEADER,
    method: "DELETE",
    body: JSON.stringify({_id}),
  }).then((res) => {
    if (res.ok) {
      NotificationManager.success("Categroies deleted scuccessfuly.")
      return res.json();
    } else {
      NotificationManager.success("Faild to delete categroies.")
      return null;
    }
  });
};
export const PostCategroies = (data) => {
  return fetch(HANDLE_CATEGORIES, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data)
  }).then((res) => {
    if (res.ok) {
      NotificationManager.success("Categroies added scuccessfuly.")
      return res.json();
    } else {
      NotificationManager.success("Faild to add categroies.")
      return null;
    }
  });
};
export const UpdateCategroies = (data) => {
  return fetch(HANDLE_CATEGORIES, {
    headers: JSON_HEADER,
    method: "PUT",
    body: JSON.stringify(data)
  }).then((res) => {
    if (res.ok) {
      NotificationManager.success("Updated successfull.")
      return res.json();
    } else {
      NotificationManager.success("Failed to Update.")
      return null;
    }
  });
};
//notes
export const PostNotes = (data) => {
  return fetch(HANDLE_NOTES, {
    headers: FILE_HEADER,
    method: "POST",
    body: data,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const UpdateNotes = (data) => {
  return fetch(HANDLE_NOTES, {
    headers: FILE_HEADER,
    method: "PUT",
    body: data,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const DeleteNotes = (_id) => {
  return fetch(HANDLE_NOTES, {
    headers: JSON_HEADER,
    method: "DELETE",
    body: JSON.stringify({ _id }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetNotes = (data) => {
  return fetch(GET_NOTES, {
    headers: JSON_HEADER,
    method: "POST",
    // body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetNotesByCate = (data) => {
  return fetch(GET_NOTES_BY_CATE, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetNotesByUser = (data) => {
  return fetch(GET_NOTES_BY_USER, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetNotesById = (data) => {
  return fetch(GET_NOTES_BY_ID, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
//instagram
export const PostInstagram = (data) => {
  return fetch(HANDLE_INSTAGRAM, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const UpdateInstagram = (data) => {
  return fetch(HANDLE_INSTAGRAM, {
    headers: JSON_HEADER,
    method: "PUT",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const DeleteInstagram = (_id) => {
  return fetch(HANDLE_INSTAGRAM, {
    headers: JSON_HEADER,
    method: "DELETE",
    body: JSON.stringify({ _id }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetInstagram = (data) => {
  return fetch(GET_INSTAGRAM, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetInstagramByCate = (data) => {
  return fetch(GET_INSTAGRAM_BY_CATE, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetInstagramByUser = (data) => {
  return fetch(GET_INSTAGRAM_BY_USER, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetInstagramById = (data) => {
  return fetch(GET_INSTAGRAM_BY_ID, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
//Questions
export const PostQuestions = (data) => {
  return fetch(HANDLE_QUESTIONS, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const UpdateQuestions = (data) => {
  return fetch(HANDLE_QUESTIONS, {
    headers: JSON_HEADER,
    method: "PUT",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const DeleteQuestions = (_id) => {
  return fetch(HANDLE_QUESTIONS, {
    headers: JSON_HEADER,
    method: "DELETE",
    body: JSON.stringify({ _id }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetQuestions = (data) => {
  return fetch(GET_QUESTIONS, {
    headers: JSON_HEADER,
    method: "POST",
  
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetQuestionsByCate = (data) => {
  return fetch(GET_QUESTIONS_BY_CATE, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetQuestionsByUser = (data) => {
  return fetch(GET_QUESTIONS_BY_USER, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const GetQuestionsById = (data) => {
  return fetch(GET_QUESTIONS_BY_ID, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const PostAnswers = (data) => {
  return fetch(HANDLE_QUESTIONS_ANSWERS, {
    headers: JSON_HEADER,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const UpdateAnswers = (data) => {
  return fetch(HANDLE_QUESTIONS_ANSWERS, {
    headers: JSON_HEADER,
    method: "PUT",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
export const DeleteAnswers = (_id) => {
  return fetch(HANDLE_QUESTIONS_ANSWERS, {
    headers: JSON_HEADER,
    method: "DELETE",
    body: JSON.stringify({ _id }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });
};
