const {Schema,model} = require('mongoose');
module.exports = model("contactsettings",Schema({
   heading:String,
   para:String,
   address:String,
   email:String,
   contact:String,
},{timestamps: true}))