const express = require("express");
const { basicResponse } = require("../controller/testController");
const router = express.Router();

router.get('/objects', basicResponse);

module.exports = router