const {Schema,model} = require('mongoose');
module.exports = model("contacts",Schema({
   name:String,
   email:String,
   text:String
},{timestamps: true}))