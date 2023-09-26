import { NotificationManager } from "react-notifications";
import { CreateCommunityUser, JSON_HEADER } from "./Const";

const formatUserData = (data) => {
    const {name, email, password, userType} = data;
    //const accountType = (plan)? "Doctors" : "Humhub"; // not sure what the non-docot account type should be //userType=0 for Users, userType=1 for Doctors
    let accountType = 'Users';
    const firstname = name.split(' ').slice(0, -1).join(' ');
    const lastname = name.split(' ').slice(-1).join(' ');
    
    if (userType == 1) {
      accountType = "Doctors"
    };
    
    return  data = {
      account: {
        username: email, //do we have username data //username is just a string, so we can use name
        email,
        status: 1,
        tagsField : [
            accountType //default to Users Group. Only create an account in Doctors group if userType=1
        ],
        authclient: "local",
      },
      profile: {
        firstname, //name fields are all lowercase....
        lastname,
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
