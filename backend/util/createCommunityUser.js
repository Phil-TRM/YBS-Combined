const axios = require('axios')
const COMMUNITY_SITE_BASE_URL = ""; // update to community site domain

const JSON_HEADER = {
    "Content-Type": "application/json",
    'Accept':'application/json',
   
}

const createCommunityUser = async (data) => {
    console.log("data", data);
    return () => {}
    // uncomment when community site domain is updated
    // return axios.post(COMMUNITY_SITE_BASE_URL+"/user", {
    //     headers: JSON_HEADER,
    //     body: JSON.stringify(data),
    // });
}

module.exports = createCommunityUser
