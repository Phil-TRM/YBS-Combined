const handleQuetions=(state={},action)=>{
    switch (action.type){
        case "SET_QUA" : state=action.data;
        default : return state;
    }
}
export default handleQuetions;