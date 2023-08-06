const express = require("express");
const router = express.Router();
const path = require("path");
//settingsModals
const About = require("../../Modals/Settings/AboutModal");
const HomeModal = require("../../Modals/Settings/HomeModal");
const SignupModal = require("../../Modals/Settings/SignupModal");
const ContactModal = require("../../Modals/Settings/ContactModal");
const UserContactModal = require("../../Modals/Settings/UserContactModal");
const PricesModal = require("./../../Modals/Settings/PricingModal")

router.post("/about", async(req,res)=>{
    try {
        const file = req.files.hero;
        const fileName = "about-" + file.name;
        const savePath = path.join(
          __dirname,
          "../",
          "../",
          "files",
          "settings",
          fileName
        );
        await file.mv(savePath);

        let data =  req.body;
        data.heroImage = "files/settings/"+path.basename(savePath)

        const creaate =  new About(data);
        creaate.save().then((data,error)=>{
            if(error){
                res.sendStatus(500)
            }else{
                res.send({
                    data:data
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.post("/home",async(req,res)=>{
    try {
        const file = req.files.logo;
        const fileName = "home-" + file.name;
        const savePath = path.join(
          __dirname,
          "../",
          "../",
          "files",
          "settings",
          fileName
        );
        await file.mv(savePath);

        const file2 = req.files.hero;
        const fileName2 = "home-" + file2.name;
        const savePath2 = path.join(
            __dirname,
            "../",
            "../",
            "files",
            "settings",
            fileName2
          );
       
        await file2.mv(savePath2);

        let data =  req.body;
        data.websiteLogoUrl = "files/settings/"+path.basename(savePath)
        data.webSiteHeroUrl = "files/settings/"+path.basename(savePath2)

        const creaate =  new HomeModal(data);
        creaate.save().then((data,error)=>{
            if(error){
                console.log(error);
                res.sendStatus(500)
            }else{
                res.send({
                    data:data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.post("/sign",async(req,res)=>{
    try {
        const file = req.files.pro;
        const file2 = req.files.free;
        const file3 = req.files.login;
        const fileName = "sign-" + file.name;
        const fileName2 = "sign-" + file2.name;
        const fileName3 = "sign-" + file3.name;
        const savePath = path.join(
          __dirname,
          "../",
          "../",
          "files",
          "settings",
          fileName
        );
        const savePath2 = path.join(
            __dirname,
            "../",
            "../",
            "files",
            "settings",
            fileName2
          );
          const savePath3 = path.join(
            __dirname,
            "../",
            "../",
            "files",
            "settings",
            fileName3
          );
        await file.mv(savePath);
        await file2.mv(savePath2);
        await file3.mv(savePath3);

        let data =  req.body;
        data.pro = "files/settings/"+path.basename(savePath)
        data.free = "files/settings/"+path.basename(savePath2)
        data.login = "files/settings/"+path.basename(savePath3)

        const creaate =  new SignupModal(data);
        creaate.save().then((data,error)=>{
            if(error){
                res.sendStatus(500)
            }else{
                res.send({
                    data:data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.post("/contact",(req,res)=>{
    try {
        const creaate =  new ContactModal(req.body);
        creaate.save().then((data,error)=>{
            if(error){
                res.sendStatus(500)
            }else{
                res.send({
                    data:data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.post("/pricing",(req,res)=>{
    try {
        const creaate =  new PricesModal(req.body);
        creaate.save().then((data,error)=>{
            if(error){
                res.sendStatus(500)
            }else{
                res.send({
                    data:data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.put("/contact",(req,res)=>{
    try {
        const creaate =  new UserContactModal(req.body);
        creaate.save().then((data,error)=>{
            if(error){
                res.sendStatus(500)
            }else{
                res.send({
                    data:data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;