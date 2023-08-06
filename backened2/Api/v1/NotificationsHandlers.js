const express = require("express");
const router = express.Router();
const Notifications = require("../../Modals/NotificationModal");

router.post("/",async(req,res)=>{
    try {
        const not =  new Notifications(req.body);
        not.save().then((data,err)=>{
            if(err){
                res.sendStatus(500);
            }else{
                res.send({
                    message:"Notifications Send"
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.post("/get",async(req,res)=>{
    try {
        const {uid}=req.body;
        const notifications = await Notifications.find({uid:uid}).sort({$natural: -1});

        if(notifications.length>0){
            res.send({
                data:notifications
            })
        }else{
            res.sendStatus(404)
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})



module.exports =router;