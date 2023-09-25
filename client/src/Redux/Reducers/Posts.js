const handlePosts=(state={},action)=>{
    switch (action.type){
        case "SET_POSTS" : state=action.data;
        default : return state;
    }
}
export default handlePosts;