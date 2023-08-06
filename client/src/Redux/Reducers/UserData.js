const handleUserData=(state={},action)=>{
    switch (action.type){
        case "SET_USERDATA" : state=action.data;
        default : return state;
    }
}
export default handleUserData;