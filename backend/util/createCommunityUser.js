const axios = require('axios')
const COMMUNITY_SITE_BASE_URL = "https://communities.yourbestself-ie.com/api/v1";

const JSON_HEADER = {
    "Content-Type": "application/json",
    'Accept':'application/json',
   
}

const createCommunityUser = async (data) => {
    console.log("data", data);
    return () => {}
    // uncomment when create is fully flushed out
    // return axios.post(COMMUNITY_SITE_BASE_URL+"/user", {
    //     headers: JSON_HEADER,
    //     body: JSON.stringify(data),
    // });
}

module.exports = createCommunityUser
