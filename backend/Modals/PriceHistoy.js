const { Schema, model } = require("mongoose");
module.exports = model(
  "pricehistories",
  Schema(
    {
      pid: String,
      email: String,
      transId:String,
      price: Number,
      validity: String,
    },
    { timestamps: true }
  )
);
