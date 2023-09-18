const {Schema,model} = require('mongoose');
module.exports = model("posts",Schema({
   title:String,
   categoriesName:String,
   categoriesId:String,
   image1Url:String,
   image2Url:String,
   description:String,
   postedByID:String,
   postedByname:String,
   postedByDp:String,
   status:Number,
   slug:String,
   onlineClink:String

},{timestamps: true}))