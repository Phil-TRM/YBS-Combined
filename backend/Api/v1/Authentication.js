const express = require("express");
const router = express.Router();
const Authentication = require("../../Modals/AuthModal");
const bcrypt = require("bcryptjs");
const path = require("path");
const SendMail = require("../../util/sendEmail");
const ResetToken = require("./../../Modals/ResetPaswordModal");
const { log } = require("console");
const createCommunityUser = require("../../util/createCommunityUser");
const loginCommunityUser = require("../../util/loginCommunityUser");

router.post("/", async (req, res) => {
  try {
    const { email, mobileNumber, password, _id } = req.body;

    if (_id != null) {
      const byID = await Authentication.findById({ _id: _id });
      if (byID != null) {
        res.send({
          message: "User Found",
          isNeedLogin:true,
          data: byID,
        });
        return;
      }
    }

    const byName = await Authentication.findOne({ mobileNumber: mobileNumber });
    if (byName != null) {
      res.send({
        message: "User Found",
        isNeedLogin:true,
        data: byName,
      });
      return;
    }
    const byEmail = await Authentication.findOne({ email: email });
    if (byEmail != null) {
      res.send({
        message: "User Found",
        isNeedLogin:true,
        data: byEmail,
      });
      return;
    }

    let data = req.body;
    data.status = 0;
    bcrypt.genSalt().then((salt) => {
      bcrypt.hash(password, salt).then(async (hash) => {
        data.password = hash;
        const user = new Authentication(data);
        user.save().then(async (data, err) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.send({
              isNeedLogin:false,
              data: data,
            });
            const resetPasswordUrl = `${process.env.CLINT_URL}/email-verify/${data._id}`;
            const message = `We are delighted to inform you that your account has been created at Your Best SELF-IE! \n\n Plese verify your email by clicking this link \n\n ${resetPasswordUrl}`;
            await SendMail({
              email: data.email,
              subject: "Account created succesfully for Your Best SELF-IE",
              message
            });
          }
        });
      });
    });
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/community-user", async (req, res) => {
  try {
    const { email, mobileNumber, password, _id } = req.body;

    if (_id != null) {
      const byID = await Authentication.findById({ _id: _id });
      if (byID != null) {
        res.send({
          message: "User Found",
          isNeedLogin:true,
          data: byID,
        });
        return;
      }
    }

    const byName = await Authentication.findOne({ mobileNumber: mobileNumber });
    if (byName != null) {
      res.send({
        message: "User Found",
        isNeedLogin:true,
        data: byName,
      });
      return;
    }
    const byEmail = await Authentication.findOne({ email: email });
    if (byEmail != null) {
      res.send({
        message: "User Found",
        isNeedLogin:true,
        data: byEmail,
      });
      return;
    }

    let data = req.body;
    //data.status = 0; 
    //bcrypt.genSalt().then((salt) => {
    //  bcrypt.hash(password.newPassword, salt).then(async (hash) => {
    //    req.body.password.newPassword = hash;
        createCommunityUser(req.body).then(res => res)
    //  });
    //});
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/check-exits",async(req,res)=>{
  try {
    const { email, mobileNumber } = req.body;

    const byName = await Authentication.findOne({ mobileNumber: mobileNumber });
    if (byName != null) {
      res.send({
       
        isNeedLogin:true,
        
      });
      return;
    }
    const byEmail = await Authentication.findOne({ email: email });
    if (byEmail != null) {
      res.send({
       
        isNeedLogin:true,
        
      });
      return;
    }
    res.sendStatus(404)
  } catch (error) {
    res.sendStatus(500);
  }
})
router.put("/", async (req, res) => {
  try {
    const { _id ,emailType} = req.body;
    const updateData = await Authentication.updateOne(
      { _id: _id },
      { $set: req.body, $currentDate: { lastUpdate: true } }
    );
    const user = await Authentication.findOne({ _id: _id });
    if (updateData.acknowledged) {
      res.send({
        massage: "Updated",
        data: user,
      });
      if(emailType=="Confirm"){
        await SendMail({
          email: user.email,
          subject: "Account accepted by admin",
          message:
            "We are delighted to inform you that your Accepted by admin",
        });
      }
      if(emailType=="Confirm"){
        await SendMail({
          email: user.email,
          subject: "Account accepted by admin",
          message:
            "We are delighted to inform you that your Accepted by admin",
        });
      }
      if(emailType=="Admin"){
        await SendMail({
          email: user.email,
          subject: "Admin update.",
          message:
            "We are delighted to inform you that your are now admin of Your Best SELF-IE",
        });
      }
      if(emailType=="Reject"){
        await SendMail({
          email: user.email,
          subject: "Admin update.",
          message:
            "We are sorry to inform you that your account not accepted for Your Best SELF-ie",
        });
      }
    } else {
      res.status(401).send({
        massage: "Not Found",
        data: updateData,
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    const updateData = await Authentication.deleteOne({ _id: _id });
    if (updateData.acknowledged) {
      res.send({
        massage: "Deleted",
      });
    } else {
      res.status(401).send({
        massage: "Not Found",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/dp", async (req, res) => {
  try {
    const { uid } = req.body;
    console.log(req.files);
    const file = req.files.dp;
    const fileName = "dp-" + uid + path.extname(file.name);
    const savePath = path.join(
      __dirname,
      "../",
      "../",
      "files",
      "dp",
      fileName
    );
    await file.mv(savePath);
    const user = await Authentication.findOne({ _id: uid });
    user.dp = "files/dp/" + path.basename(savePath) + "?" + Date.now();
    const updated = await user.updateOne(user);
    if (updated.acknowledged) {
      res.send({
        message: "Update Success",
        data: user,
      });
    } else {
      res.status(401).send({
        error: "Not Updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await Authentication.findOne({ email: email });
    if (data != null) {
      bcrypt
        .compare(password, data.password)
        .then(async (value) => {
          if (value) {
            if (data != null) {
              data.password = undefined;
              res.send({ data: data });
              //await SendMail({
              //  email: data.email,
              //  subject: "Login Confirmation for Your Best SELF-IE",
              //  message:
              //    "We are delighted to inform you that your login to Your Best SELF-IE was successful! Welcome back to our platform.",
              //});
            } else {
              res.status(401).send({ message: "Not Found" });
            }
          } else {
            res.status(401).send({ message: "Not Found" });
          }
        })
        .catch((er) => {
          console.log(er);
          res.status(401).send({ message: "Not Found" });
        });
    } else {
      res.status(401).send({ message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Some Error" });
  }
});
router.post("/community-login", async (req, res) => {
  try {
    loginCommunityUser(req.body).then(res => res);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An Error occured while retrieving authentication details from the community site." });
  }
});
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Authentication.findOne({ email: email });

    if (user != null) {
      const resetModal = new ResetToken(req.body);
      resetModal.save().then(async (data, err) => {
        if (err) {
          res.sendStatus(500);
        } else {
          const resetPasswordUrl = `${process.env.CLINT_URL}/password/reset/${data._id}`;
          const message = `Your Password reset Password token is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then,please ignore it`;
          res.send({
            message: "Link for reseting password sent to your email.",
          });
          await SendMail({
            email: email,
            subject: `Password Recovery for Your Best SELF-IE`,
            message,
          });
        }
      });
    } else {
      res.sendStatus(404).send({
        message: "User not found with this email.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Some Error" });
  }
});
router.put("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const tokendata = await ResetToken.findOne({_id:token});
    if(tokendata!=null){
      const s = await ResetToken.deleteOne({_id:token});
      const udata = await Authentication.findOne({ email: tokendata.email });
      let data = udata;
      bcrypt.genSalt().then((salt) => {
        bcrypt.hash(password, salt).then(async (hash) => {
          data.password = hash;
          const user = await Authentication.updateOne(
            { _id: data._id },
            { $set: data, $currentDate: { lastUpdate: true } }
          );
          if (user.acknowledged) {
            res.send({
              message:"Password Changed Succefully"
            });
            await SendMail({
              email: data.email,
              subject: "Password changed succesfully for Your Best SELF-IE",
              message:
                "We are delighted to inform you that your login password changed for Your Best SELF-IE was successful!",
            });
          } else {
            res.sendStatus(500);
          }
        });
      });
    }else{
      res.sendStatus(404).send({
        message:"Error token expired"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Some Error" });
  }
});
router.post("/verify-email", async (req, res) => {
  try {
    const {id } = req.body;

    const update =  await Authentication.updateOne({_id:id},{$set:{isEmailVerified:true,$currentDate: { lastUpdate: true }}})
    const data =  await Authentication.findOne({_id:id});
    if(update.acknowledged){
      res.send({
        message: "Email Verified",
      });
      await SendMail({
        email: data.email,
        subject: "Email verified succesfully for Your Best SELF-IE",
        message:
          "We are delighted to inform you that your email varification for Your Best SELF-IE was successful!",
      });
    }else{
      res.sendStatus(500);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/change-pasword", async (req, res) => {
  try {
    const {id,oldpassword,newpassword } = req.body;

    const byID = await Authentication.findById({ _id: id });
    if (byID != null) {
      let data = byID;
     
      bcrypt
      .compare(oldpassword, data.password)
      .then(async (value) => {
        if (value) {
          bcrypt.genSalt().then((salt) => {
            bcrypt.hash(newpassword, salt).then(async (hash) => {
              data.password = hash;
              const update = await Authentication.updateOne({_id:id},{$set:data, $currentDate: { lastUpdate: true }})
              if(update.acknowledged){
                res.send({
                  message:"Password updated successfully"
                })
                await SendMail({
                  email: data.email,
                  subject: "Password Changed",
                  message:
                    "We are delighted to inform you that your password for Your Best SELF-IE was successfuly changed!",
                });
              }
            });
          });
        } else {
          res.status(401).send({ message: "Currunt password not matched." });
        }
      })
      .catch((er) => {
        console.log(er);
        res.status(401).send({ message: "Currunt password not matched."});
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post("/post-created", async (req, res) => {
  try {
    const { _id } = req.body;
    const updateData = await Authentication.updateOne(
      { _id: _id },
      { $set:{postDate:getDate(), $currentDate: { lastUpdate: true }} }
    );
    if (updateData.acknowledged) {
      res.send({
        massage: "Updated",
      });
    } else {
      res.status(401).send({
        massage: "Not Found",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/plan-expired", async (req, res) => {
  try {
    const { _id } = req.body;
    const updateData = await Authentication.updateOne(
      { _id: _id },
      { $set:{isPlanExpired:true, $currentDate: { lastUpdate: true }} }
    );
    if (updateData.acknowledged) {
      res.send({
        massage: "Updated",
      });
    } else {
      res.status(401).send({
        massage: "Not Found",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

// get users list
router.post("/get-users", async (req, res) => {
  try {
    const users = await Authentication.find();
    if (users != null && users.length > 0) {
      res.send({
        data: users,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});



function getDate(){
  let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

let dates =  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
return dates;


}

module.exports = router;
