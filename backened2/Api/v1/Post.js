const express = require("express");
const router = express.Router();
const Authentication = require("../../Modals/AuthModal");
const Posts = require("../../Modals/Post/PostModal");
const Categories = require("../../Modals/Post/CategoryModal");
const path = require("path");

router.post("/", async (req, res) => {
  try {
    const { slug } = req.body;
    let data = req.body;
    data.status=0;
    console.log(req.files);
    const file = req.files.image1;
    if (file != null) {
      const fileName = "post-" + slug + "1" + path.extname(file.name);
      const savePath = path.join(
        __dirname,
        "../",
        "../",
        "files",
        "posts",
        fileName
      );
      await file.mv(savePath);
      data.image1Url =
        "files/posts/" + path.basename(savePath) + "?" + Date.now();
    }

    const file2 = req.files.image2;
    if (file2 != null) {
      const fileName2 = "post-" + slug + "2" + path.extname(file2.name);
      const savePath2 = path.join(
        __dirname,
        "../",
        "../",
        "files",
        "posts",
        fileName2
      );
      await file2.mv(savePath2);
      data.image2Url =
        "files/posts/" + path.basename(savePath2) + "?" + Date.now();
    }

    const createPost = new Posts(data);
    createPost.save().then(async(data, err) => {
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
    const { slug,_id } = req.body;
    let data = req.body;
    let file,file2;


    try {
      file = req.files.image1;
     
    } catch (error) {
      
    }
    try {
      file2 = req.files.image2;
    } catch (error) {
      
    }

    
    if (file != null) {
      const fileName = "post-" + slug + "1" + path.extname(file.name);
      const savePath = path.join(
        __dirname,
        "../",
        "../",
        "files",
        "posts",
        fileName
      );
      await file.mv(savePath);
      data.image1Url =
        "files/posts/" + path.basename(savePath) + "?" + Date.now();
    }

    
    if (file2 != null) {
      const fileName2 = "post-" + slug + "2" + path.extname(file2.name);
      const savePath2 = path.join(
        __dirname,
        "../",
        "../",
        "files",
        "posts",
        fileName2
      );
      await file2.mv(savePath2);
      data.image2Url =
        "files/posts/" + path.basename(savePath2) + "?" + Date.now();
    }

    const updatePost = await Posts.updateOne(
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
    const deletePost = await Posts.deleteOne({ _id: _id });
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

router.post("/get", async(req, res) => {
  try {
    const posts = await Posts.find().sort({ x: 1 });
    if (posts != null && posts.length > 0) {
        let data = new Array();
        for (let i = 0; i < posts.length; i++) {
          const element = posts[i];
          const catedata = await Categories.findOne({ _id: element.categoriesId });
          const userdata = await Authentication.findOne({ _id: element.postedByID });
          element.categoriesName = catedata.name;
          (element.postedByname = userdata.name),
            (element.postedByDp = userdata.dp);
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
router.post("/get-by-categories", async(req, res) => {
  try {
    const { cid } = req.body;
    const posts = await Posts.find({ categoriesId: cid }).sort({ x: -1 });
    if (posts != null && posts.length > 0) {
        let data = new Array();
        for (let i = 0; i < posts.length; i++) {
          const element = posts[i];
          const catedata = await Categories.findOne({ _id: element.categoriesId });
          const userdata = await Authentication.findOne({ _id: element.postedByID });
          element.categoriesName = catedata.name;
          (element.postedByname = userdata.name),
            (element.postedByDp = userdata.dp);
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
router.post("/get-by-user", async(req, res) => {
  try {
    const { uid } = req.body;
    const posts = await Posts.find({ postedByID: uid }).sort({ x: -1 });
    if (posts != null && posts.length > 0) {
      let data = new Array();
      for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        const catedata = await Categories.findOne({ _id: element.categoriesId });
        const userdata = await Authentication.findOne({ _id: element.postedByID });
        element.categoriesName = catedata.name;
        (element.postedByname = userdata.name),
          (element.postedByDp = userdata.dp);
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
router.post("/get-by-slug",async (req, res) => {
  try {
    const { slug } = req.body;
    const posts = await Posts.findOne({ slug: slug });
    if (posts != null) {
      let element = posts;
      const catedata = await Categories.findOne({ _id: element.categoriesId });
      const userdata = await Authentication.findOne({ _id: element.postedByID });
      element.categoriesName = catedata.name;
      element.postedByname = userdata.name,
      element.postedByDp = userdata.dp;
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
router.post("/get-by-id",async (req, res) => {
  try {
    const { _id } = req.body;
    const posts = await Posts.findById({ _id: _id });
    if (posts != null) {
      let element = posts;
      const catedata = await Categories.findOne({ _id: element.categoriesId });
      const userdata = await Authentication.findOne({ _id: element.postedByID });
      element.categoriesName = catedata.name;
      element.postedByname = userdata.name,
      element.postedByDp = userdata.dp;
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

// Categories
router.post("/categories/get", async (req, res) => {
  try {
    const categories = await Categories.find().sort({ x: -1 });
    if (categories != null && categories.length > 0) {
      res.send({
        data: categories,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/categories", async (req, res) => {
  try {
    const createCate = new Categories(req.body);
    createCate.save().then((data, err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({
          data: data,
        });
      }
    });
  } catch (error) {
    res.sendStatus(500);
  }
});
router.put("/categories", async (req, res) => {
  try {
    const { _id } = req.body;
    const updateData = await Categories.updateOne(
      { _id: _id },
      { $set: req.body, $currentDate: { lastUpdate: true } }
    );
    if (updateData.acknowledged) {
      res.send({
        massage: "Updated",
        data: updateData,
      });
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
router.delete("/categories", async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteCate = await Categories.deleteOne({ _id: _id });
    if (deleteCate.acknowledged) {
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

module.exports = router;
