import { NotificationManager } from "react-notifications";
import { CreateCommunityUser, JSON_HEADER } from "./Const";

const formatUserData = (data) => {
    const {name, email, password, plan} = data;
    const accountType = (plan)? "Doctor" : "HumHub"; // not sure what the non-docot account type should be 
    const firstName = name.split(' ').slice(0, -1).join(' ');
    const lastName = name.split(' ').slice(-1).join(' ');
    return  data = {
      account: {
        username: email, //do we have username data
        email,
        tagsField : [
            accountType
        ],
        language: "",
        authclient: "local"
      },
      profile: {
        firstName,
        lastName,
      },
      password: {
        newPassword: password,
        mustChangePassword: false
      }
    };
}

export const handleNewCommunityUser = (data) => {
    fetch(CreateCommunityUser, {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify(formatUserData(data)),
    }).then((res) => {
      if (res.ok) {
        res.json()
        .then(res => res)
        .catch((err) => {
          NotificationManager.error("An Error creating your account with the community site.")
        })
      }
    });
  };
