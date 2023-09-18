const handleInsta=(state={},action)=>{
    switch (action.type){
        case "SET_INSTA" : state=action.data;
        default : return state;
    }
}
export default handleInsta;