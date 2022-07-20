const express = require("express");
const { getS3Objects, rehydrateS3Object } = require("../controller/s3ObjectController")
const { initializeRehydrateJob, initializeQueryRehydrate } = require("../controller/rehydrateController");

const validateUrlDateParams = require("../middleware/validateUrlDateParams");
const validateBodyDateParams = require("../middleware/validateBodyDateParams");
const validateObjectKeys = require("../middleware/validateObjectKeys");
const validateQueries = require("../middleware/validateQueries");

const router = express.Router();

router.get('/s3objects', validateUrlDateParams, getS3Objects);

//will be removed once front end switches to new api
router.post('/s3object/rehydrate', rehydrateS3Object);

router.post('/s3objects', validateObjectKeys, initializeRehydrateJob);

router.post('/query-ingest', validateBodyDateParams, initializeQueryRehydrate);

module.exports = router