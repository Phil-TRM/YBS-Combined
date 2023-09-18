const { Schema, model } = require("mongoose");
module.exports = model(
  "ntifications",
  Schema(
    {
      uid: String,
      title: String,
      to: String,
    },
    { timestamps: true }
  )
);
