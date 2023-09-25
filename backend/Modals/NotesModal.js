const { Schema, model } = require("mongoose");
module.exports = model(
  "notes",
  Schema(
    {
      uid: String,
      userName:String,
      title: String,
      para: String,
      cateId:String,
      cateName:String,
      imgUrl:String,
      status:Number,
    },
    { timestamps: true }
  )
);
