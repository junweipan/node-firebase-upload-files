const express = require('express');
const { addImage } = require('../controllers/imageController');

const router = express.Router();

router.post('/image', addImage);

module.exports = {
    routes: router
}