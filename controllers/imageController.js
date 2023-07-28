"use strict";

const dotenv = require("dotenv");
const app = require("../firebase");
const bucket = app.storage().bucket();

dotenv.config();

async function uploadImage(file) {
  try {
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }
    const fileName = `${Date.now()}` + file.originalname;
    var buffer = new Uint8Array(file.buffer);
    const url = await bucket
      .file(fileName)
      .getSignedUrl({ action: "read", expires: "03-01-2500" });
    await bucket.file(fileName).save(buffer, { resumable: true });
    return url;
  } catch (error) {
    return error.message;
  }
}

const addImage = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
    const urls = await Promise.all(files.map(uploadImage));
    res.json({ urls });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addImage,
};
