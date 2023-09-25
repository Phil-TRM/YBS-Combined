import { NotificationManager } from "react-notifications";
import { JSON_HEADER, LoginCommunityUser } from "./Const";

const checkCommunityLoginStatus = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return;
    
    const communityUser = localStorage.getItem("communityUser");
    if (!communityUser) {
        const data = {
            username: userData.email,
            password: userData.password
        }
        fetch(LoginCommunityUser,{
            method:"POST",
            headers:JSON_HEADER,
            body:JSON.stringify(data)
        }).then(res=>{
            if(res.ok){
                res.json().then(data=>{
                    let d = data.data;
                    localStorage.setItem("communityUser",JSON.stringify(d));
                })
            }else{
                NotificationManager.error("Some error with credentials please retry")
            }
        }).catch((err) => {
            console.log(`error:${err}`)
        })
    }
}

export default checkCommunityLoginStatus;