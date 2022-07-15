const express = require("express");
const { getS3Objects, rehydrateS3Object } = require("../controller/s3ObjectController")
const validateDateParams = require("../middleware/validateDateParams");

const router = express.Router();

router.get('/s3objects', validateDateParams, getS3Objects);
router.post('/s3object/rehydrate', rehydrateS3Object)

module.exports = router