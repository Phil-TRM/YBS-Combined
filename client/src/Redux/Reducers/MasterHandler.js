const handleMasterData=(state={},action)=>{
    switch (action.type){
        case "SET_MASTER" : state=action.data;
        default : return state;
    }
}
export default handleMasterData;