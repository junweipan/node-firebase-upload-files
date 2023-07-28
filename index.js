"use strict";
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const config = require("./config");


const imageRoutes = require("./routes/image-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer({ dest: "uploads/" });
app.use("/api", upload.array("images"), imageRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
