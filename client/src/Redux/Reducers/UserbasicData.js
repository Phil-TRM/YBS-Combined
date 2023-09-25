const handleUserBasicData=(state={},action)=>{
    switch (action.type){
        case "SET_BASIC" : state=action.data;
        default : return state;
    }
}
export default handleUserBasicData;