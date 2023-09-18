const { Schema, model } = require("mongoose");
module.exports = model(
  "questionreplies",
  Schema(
    {
      qid: String,
      uid: String,
      answer: String,
      status: Number,
    },
    { timestamps: true }
  )
);
