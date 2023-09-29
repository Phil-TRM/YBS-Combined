const express = require("express");
const router = express.Router();
const Authentication = require("../../Modals/AuthModal");
const InstagramModal = require("../../Modals/InstagramModal");
const Categories = require("../../Modals/Post/CategoryModal");
const path = require("path");

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    data.status = 0;

    const createPost = new InstagramModal(data);
    createPost.save().then(async (data, err) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send({
          data: data,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;
    let data = req.body;

    const updatePost = await InstagramModal.updateOne(
      { _id: _id },
      { $set: data, $currentDate: { lastUpdate: true } }
    );
    if (updatePost.acknowledged) {
      res.send({
        massage: "Updated",
        data: updatePost,
      });
    } else {
      res.status(404).send({
        massage: "Not Found",
        data: updatePost,
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    const deletePost = await InstagramModal.deleteOne({ _id: _id });
    if (deletePost.acknowledged) {
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

router.post("/get", async (req, res) => {
  try {
    const notesmmodal = await InstagramModal.find().sort({ x: 1 });
    if (notesmmodal != null && notesmmodal.length > 0) {
      let data = new Array();
      for (let i = 0; i < notesmmodal.length; i++) {
        const element = notesmmodal[i];
        const catedata = await Categories.findOne({ _id: element.cateId });
        const userdata = await Authentication.findOne({ _id: element.uid });
        element.cateName = catedata.name;
        element.userName = userdata.name;
        data.push(element);
      }
      res.send({
        data: data,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post("/get-by-categories", async (req, res) => {
  try {
    const { cateId } = req.body;
    const notesmmodal = await InstagramModal.find({ cateId: cateId }).sort({
      x: -1,
    });
    if (notesmmodal != null && notesmmodal.length > 0) {
      let data = new Array();
      for (let i = 0; i < notesmmodal.length; i++) {
        const element = notesmmodal[i];
        const catedata = await Categories.findOne({ _id: element.cateId });
        const userdata = await Authentication.findOne({ _id: element.uid });
        element.cateName = catedata.name;
        element.userName = userdata.name;
        data.push(element);
      }
      res.send({
        data: data,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    req.sendStatus(500);
  }
});
router.post("/get-by-user", async (req, res) => {
  try {
    const { uid } = req.body;
    const notesmmodal = await InstagramModal.find({ uid: uid }).sort({
      x: -1,
    });
    if (notesmmodal != null && notesmmodal.length > 0) {
      let data = new Array();
      for (let i = 0; i < notesmmodal.length; i++) {
        const element = notesmmodal[i];
        const catedata = await Categories.findOne({ _id: element.cateId });
        const userdata = await Authentication.findOne({ _id: element.uid });
        element.cateName = catedata.name;
        element.userName = userdata.name;
        data.push(element);
      }
      res.send({
        data: data,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    req.sendStatus(500);
  }
});
router.post("/get-by-id", async (req, res) => {
  try {
    const { _id } = req.body;
    const notesmmodal = await InstagramModal.findById({ _id: _id });
    if (notesmmodal != null) {
      let element = notesmmodal;
      const catedata = await Categories.findOne({ _id: element.cateId, });
      const userdata = await Authentication.findOne({ _id: element.uid });
      element.cateName = catedata.name;
      element.userName = userdata.name
      res.send({
        data: element,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    req.sendStatus(500);
  }
});


module.exports = router;
