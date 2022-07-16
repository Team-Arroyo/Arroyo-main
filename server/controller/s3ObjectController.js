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
    return;
  }

  try {
    let objectKeys;

    if(!!startDate && !!endDate) {
        console.log("date supplied");
        objectKeys = await getBucketObjectsWithinDates(startDate, endDate);
    } else {
        console.log("No date supplied");
        objectKeys = await getAllBucketObjects();
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

const rehydrateS3Objects = async(objectKey) => {
  return new Promise(async(resolve, reject) => {
    try {
      const data = await getObjectContents(objectKey);
      const rawLogString = await streamToString(data.Body);
      const logsJson = logStringToJson(rawLogString);
      await postToLogstash(logsJson);
      resolve({objectKey, status: 'complete'})
    } catch(err) {
      reject({objectKey, status: 'fail', error: err})
    }
  })
}

module.exports = {
  getS3Objects,
  rehydrateS3Object,
  rehydrateS3Objects
}