var admin = require("firebase-admin");
var serviceAccount = require("./admin.json");
// const config = require('./config');

var app = admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
storageBucket: process.env.BUCKET_URL
});

module.exports = app;