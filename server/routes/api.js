const express = require("express");
const { getS3Objects } = require("../controller/s3ObjectController")
const router = express.Router();

router.get('/s3objects', getS3Objects);

module.exports = router