const {Schema,model} = require('mongoose');
module.exports = model("homesettings",Schema({
   websiteLogoUrl:String,
   webSiteHeroUrl:String,
   heading:String,
   heading2:String,
   para:String,
   refundpolicy:String,
   discloser:String,
   privacypolicy:String,
},{timestamps: true}))