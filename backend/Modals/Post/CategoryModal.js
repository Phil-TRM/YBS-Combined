const {Schema,model} = require('mongoose');
module.exports = model("categories",Schema({
   name:String,
   pid:String,
   pname:String,
   cateType:String,
},{timestamps: true}))