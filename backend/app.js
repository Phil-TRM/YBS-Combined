const mongose = require("mongoose");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require('cors');
const io = require("socket.io")(server);
require("dotenv/config");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const path = require("path");
const api = require("./Api/index");
server.listen(3001);

global.io = io;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({
    origin: process.env.CLINT_URL
}));
app.get("/test", (req, res) => {
  res.send({
    Message: "Looks Good",
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  upload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
  })
);
app.use(process.env.API_VERSION + "files", express.static("./files"));
app.use("/api", api);
app.get("/api/v1/undefined",(req,res)=>{
  res.sendFile(path.join( __dirname, './', 'files', 'placeholder.png'))
})
// connect to db
const connect = mongose.connect(process.env.CONNECT_TO_DB, {
  dbName: "doctorblogs",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(() => {
  console.log("Conected to db");
});
