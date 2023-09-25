const express = require("express");
const app = express();
const Auth = require("./Authentication");
const Post = require("./Post");
const Master = require("./Master")
const Settings = require("./Settings")
const PlansHandler = require("./PlansHandler")
const Notifications = require("./NotificationsHandlers")

app.use("/auth",Auth);
app.use("/post",Post);
app.use("/master",Master);
app.use("/settings",Settings);
app.use("/plans",PlansHandler);
app.use("/notification",Notifications)

module.exports = app