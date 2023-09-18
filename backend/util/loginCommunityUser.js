const axios = require('axios')
const COMMUNITY_SITE_BASE_URL = "https://communities.yourbestself-ie.com/api/v1"; 

const JSON_HEADER = {
    "Content-Type": "application/json",
    'Accept':'application/json',
}

const loginCommunityUser = async (data) => {
   
    return () => {};
    // uncomment when community login is fully flushed out
    // return axios.post(COMMUNITY_SITE_BASE_URL+"/auth/login", {
    //     headers: JSON_HEADER,
    //     body: JSON.stringify(data),
    // });
}

module.exports = loginCommunityUser