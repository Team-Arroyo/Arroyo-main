const  { getAllBucketObjects, getObjectContents, getBucketObjectsWithinDates } = require("../lib/s3Client");
const { streamToString } = require("../utils/streamToString");
const { logStringToJson } = require("../utils/logStringToJson");
const { postToLogstash } = require("../services/logstashService");

const getS3Objects = async(req, res, next) => {
  const dateError = req.dateError;
  const startDate = req.startDate;
  const endDate = req.endDate;
  if(dateError) {
    res.status(400).send({dateError})
  }

  try {
    let objectKeys;

    switch(!!startDate && !!endDate) {
      case true:
        console.log("date supplied");
        objectKeys = await getBucketObjectsWithinDates(startDate, endDate);
        break;
      case false:
        console.log("No date supplied");
        objectKeys = await getAllBucketObjects();
        break;
    }

    res.send({objectKeys});
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({
      message: "Fetching object from S3 failed, see error message for more details", 
      error
    });
  }
}

const rehydrateS3Object = async(req, res, next) => {
  try {
    const { objectKey } = req.body;
    const data = await getObjectContents(objectKey);
    const rawLogString = await streamToString(data.Body);
    const logsJson = logStringToJson(rawLogString);
    await postToLogstash(logsJson);
    res.status(202).json({
      message: `Rehydrate on ${objectKey} in progress`,
    })
  } catch(error) {
    console.log("Error: ", error);
    res.status(500).send({
      message: "Log rehydration failed, see error message for more details", 
      error
    });
  }
}

module.exports = {
  getS3Objects,
  rehydrateS3Object
}