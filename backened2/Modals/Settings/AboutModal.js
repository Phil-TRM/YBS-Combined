const {Schema,model} = require('mongoose');
module.exports = model("aboutsettings",Schema({
   heroImage:String,
   heading:String,
   heading2:String,
   heading3:String,
   heading4:String,
   heading5:String,
   heading6:String,
   heading7:String,
   para:String,
   para2:String,
   para3:String,
   para4:String,
   para5:String,
   para6:String,
   para7:String,
},{timestamps: true}))