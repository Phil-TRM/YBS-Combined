const {Schema,model} = require('mongoose');
module.exports = model("signupsettings",Schema({
   pro:String,
   free:String,
   login:String,
},{timestamps: true}))