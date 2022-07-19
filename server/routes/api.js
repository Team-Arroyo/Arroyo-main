const express = require("express");
const { getS3Objects, rehydrateS3Object } = require("../controller/s3ObjectController")
const initializeRehydrateJob = require("../controller/rehydrateController");

const validateDateParams = require("../middleware/validateDateParams");
const validateObjectKeys = require("../middleware/validateObjectKeys");
const validateQueries = require("../middleware/validateQueries");

const router = express.Router();

router.get('/s3objects', validateDateParams, getS3Objects);

//will be removed once front end switches to new api
router.post('/s3object/rehydrate', rehydrateS3Object)

router.post('/s3objects', validateObjectKeys, validateQueries, initializeRehydrateJob)

module.exports = router