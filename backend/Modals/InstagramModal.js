const { Schema, model } = require("mongoose");
module.exports = model(
  "instagram",
  Schema(
    {
      uid: String,
      userName:String,
      link: String,
      cateId:String,
      cateName:String,
      status:Number,
    },
    { timestamps: true }
  )
);
