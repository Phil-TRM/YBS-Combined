const express = require("express");
const router = express.Router();
const Authentication = require("../../Modals/AuthModal");
const Posts = require("../../Modals/Post/PostModal");
const Categories = require("../../Modals/Post/CategoryModal");

//settingsModals
const About = require("../../Modals/Settings/AboutModal");
const HomeModal = require("../../Modals/Settings/HomeModal");
const SignupModal = require("../../Modals/Settings/SignupModal");
const ContactModal = require("../../Modals/Settings/ContactModal");
const PriceModal =require("../../Modals/Settings/PricingModal")
const NotificationModal =require("../../Modals/NotificationModal")

router.post("/", async (req, res) => {
  try {
    const { _id, userType } = req.body;

    const posts = await Posts.find().sort({ x: 1 });
    const doctors = await Authentication.find({ userType: 1 }).sort({$natural: -1});
    const allusers = await Authentication.find().sort({$natural: -1});

    //settings
    const homeData = await HomeModal.find().sort({$natural: -1}).limit(1);
    const aboutData = await About.find().sort({$natural: -1}).limit(1);
    const contactData = await ContactModal.find().sort({$natural: -1}).limit(1);
    const signupData = await SignupModal.find().sort({$natural: -1}).limit(1);
    const priceData = await PriceModal.find().sort({$natural: -1}).limit(2);
    const notifications = await NotificationModal.find({uid:_id}).sort({$natural: -1}).limit(50);

    let dataPost = new Array();
    let forAdminPosts = new Array();
    if (posts != null && posts.length > 0) {
      for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        const catedata = await Categories.findOne({
          _id: element.categoriesId,
        });
        const userdata = await Authentication.findOne({
          _id: element.postedByID,
        });
        if (element.status == 1) {
          element.categoriesName = catedata.name;
          (element.postedByname = userdata.name),
            (element.postedByDp = userdata.dp);
            element.onlineClink=userdata.onlineClink
          dataPost.push(element);
          forAdminPosts.push(element);
        } else {
          element.categoriesName = catedata.name;
          (element.postedByname = userdata.name),
            (element.postedByDp = userdata.dp);
            element.onlineClink=userdata.onlineClink
          forAdminPosts.push(element);
        }
      }
    }
    let cateData =new Array();
    const cateDataRaw = await Categories.find().sort({ x: 1 });
    
    for (let i = 0; i < cateDataRaw.length; i++) {
      const element = cateDataRaw[i];
      if(element.pid!=null){
        const cat = await Categories.findOne({_id:element.pid});
        element.pname=cat.name;
      }else{
        element.pname="N/A";
      }
      cateData.push(element);
      
    }

    if (userType == 0) {
      res.send({
        posts: dataPost,
        doctors: doctors,
        prices: priceData,
        homeData:homeData[0],
        aboutData:aboutData[0],
        contactData:contactData[0],
        signupData:signupData[0]
      });
    }
    if (userType == 1) {
      const postsByMe = await Posts.find({ postedByID: _id }).sort({ x: 1 });
      res.send({
        posts: dataPost,
        doctors: doctors,
        postByMe: postsByMe,
        categroies: cateData,
        prices: priceData,
        homeData:homeData[0],
        aboutData:aboutData[0],
        contactData:contactData[0],
        signupData:signupData[0],
        notifications

      });
    }
    if (userType == 2) {
      res.send({
        prices:priceData,
        posts: dataPost,
        doctors: doctors,
        allUsers: allusers,
        forAdminpPost:forAdminPosts,
        categroies: cateData,
        homeData:homeData[0],
        aboutData:aboutData[0],
        contactData:contactData[0],
        signupData:signupData[0]
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post("/pre", async (req, res) => {
  try {
    //settings
    const homeData = await HomeModal.find().sort({$natural: -1}).limit(1);
    const aboutData = await About.find().sort({$natural: -1}).limit(1);
    const contactData = await ContactModal.find().sort({$natural: -1}).limit(1);
    const signupData = await SignupModal.find().sort({$natural: -1}).limit(1);
    const priceData = await PriceModal.find().sort({$natural: -1}).limit(2);

    res.send({
      homeData:homeData[0],
      aboutData:aboutData[0],
      contactData:contactData[0],
      signupData:signupData[0],
      prices:priceData
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
