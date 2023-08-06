const { Schema, model } = require("mongoose");
module.exports = model(
  "auths",
  Schema(
    {
      name: String,
      email: String,
      dp: String,
      dob: String,
      gender: String,
      mobileNumber: Number,
      password: String,
      address: {
        streetAddress: String,
        city: String,
        state: String,
        contry: String,
        zipCode: Number,
      },
      aboutUser: String,
      designantion: String,
      certificate: String,
      planDetails: {
        from: String,
        validity: Number,
        planName: String,
        planId: String,
      },
      userType: Number,
      socialMedia: {
        mail: String,
        facebook: String,
        linkden: String,
        instagram: String,
        twiter: String,
        discord: String,
        reddit: String,
        threds: String,
      },
      status: Number,
      isEmailVerified: Boolean,
      postDate:String,
      isPlanExpired:Boolean,
      onlineClink:String,
      howfind:String
    },
    { timestamps: true }
  )
);
