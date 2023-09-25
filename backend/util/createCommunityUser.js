const axios = require('axios')
const COMMUNITY_SITE_BASE_URL = "https://communities.yourbestself-ie.com/api/v1";
//const COMMUNITY_SITE_BASE_URL = "http://localhost/humhub/api/v1";

const JSON_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    //'Authorization':'Bearer 555K39SraU5vpwpxMOhW7Ng1bKd4PAoyGY_6Z64uqNY9WQvTNfDsxJWLVH9f0XIiuD1riq_N3F1jhIAnqy2ny4' //local
    'Authorization': 'Bearer YFLDucNdLftF-9xoIH4gTl_60pfQ_5bMTcM2EHJubotEQubitUHN3kgEQYeg9vIvHbMvxZKRapKbIVTgqgak21' //Prod
    //Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjF9.Mn6cszhST9AsM3xZPfEW8xazB5opirFVkUFOmJf-iso" //Prod JWT???
}

//console.log('starting createCommunityUser call')
const createCommunityUser = async (data) => {
    //data.password.newPassword = 'password'
    console.log("data", JSON.stringify(data));
    //return () => {}
    // uncomment when create is fully flushed out
    //return axios.post(COMMUNITY_SITE_BASE_URL+'/user', {
    //     headers: JSON_HEADER,
    //     body: JSON.stringify(data),
    //}).then(response => response.data);
    // console.log(response.status);
    // console.log(response.headers);
    // console.log(response.config);
//}

//Trying with code from Postman

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://communities.yourbestself-ie.com/api/v1/user',
    headers: { 
      'Content-Type': 'application/json',  
      'Accept': 'application/json',  
      'Authorization': 'Bearer YFLDucNdLftF-9xoIH4gTl_60pfQ_5bMTcM2EHJubotEQubitUHN3kgEQYeg9vIvHbMvxZKRapKbIVTgqgak21'
    },
    //body: JSON.stringify(data)
    data : JSON.stringify(data)
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

  module.exports = createCommunityUser