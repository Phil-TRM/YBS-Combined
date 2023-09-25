import handleMasterData from "./MasterHandler";
import { combineReducers }from "redux";
import handleUserData from "./UserData";
import handleUserBasicData from "./UserbasicData";
import handleUserPosts from "./UserPost";
import handlePosts from "./Posts";
import Notes from "./Notes";
import QandA from "./Quetions";
import Insta from "./Insta";



const rootReducer=combineReducers({
    handleMasterData,
    handleUserData,
    handleUserBasicData,
    handleUserPosts,
    handlePosts,
    Notes,
    QandA,
    Insta
})

export default rootReducer;