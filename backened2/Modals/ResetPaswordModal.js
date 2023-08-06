const {Schema,model} = require('mongoose');
module.exports = model("resetpasswordtokens",Schema({
   email:String,
},{timestamps: true, expireAfterSeconds: 300 }))