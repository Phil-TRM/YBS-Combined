const { Schema, model } = require("mongoose");
module.exports = model(
  "questions",
  Schema(
    {
      uid: String,
      question: String,
      cateId:String,
      cateName:String,
      isAnsweringEnabled:Boolean,
      status:Number,
    },
    { timestamps: true }
  )
);
