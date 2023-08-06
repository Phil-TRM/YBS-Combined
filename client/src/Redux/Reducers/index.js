import handleMasterData from "./MasterHandler";
import { combineReducers }from "redux";
import handleUserData from "./UserData";
import handleUserBasicData from "./UserbasicData";
import handleUserPosts from "./UserPost";
import handlePosts from "./Posts";



const rootReducer=combineReducers({
    handleMasterData,
    handleUserData,
    handleUserBasicData,
    handleUserPosts,
    handlePosts
})

export default rootReducer;