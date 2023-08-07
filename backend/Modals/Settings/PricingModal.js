const {Schema,model} = require('mongoose');
module.exports = model("prices",Schema({
   price:Number,
   validity:Number,
},{timestamps: true}))