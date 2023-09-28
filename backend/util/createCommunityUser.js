const axios = require('axios')
const COMMUNITY_SITE_BASE_URL = "https://communities.yourbestself-ie.com/api/v1";

const JSON_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer YFLDucNdLftF-9xoIH4gTl_60pfQ_5bMTcM2EHJubotEQubitUHN3kgEQYeg9vIvHbMvxZKRapKbIVTgqgak21' //Prod
}

const createCommunityUser = async (data) => {
    axios.post(`${COMMUNITY_SITE_BASE_URL}/user`, data, {
      headers: JSON_HEADER,
    }).then(
      res => console.log("Response",res)
    ).catch(err => console.log("Error", err.response.data));
}

  module.exports = createCommunityUser