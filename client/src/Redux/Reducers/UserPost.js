const handleUserPosts=(state={},action)=>{
    switch (action.type){
        case "SET_USER_POST" : state=action.data;
        default : return state;
    }
}
export default handleUserPosts;