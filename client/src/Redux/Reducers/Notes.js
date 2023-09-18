const handleNotes=(state={},action)=>{
    switch (action.type){
        case "SET_NOTES" : state=action.data;
        default : return state;
    }
}
export default handleNotes;