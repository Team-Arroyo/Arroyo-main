const  { getAllBucketObjects, getObjectContents, getBucketObjectsWithinDates, queryObjectContents } = require("../lib/s3Client");
const { streamToString } = require("../utils/streamToString");
const queryStreamToString = require("../utils/queryStreamToString");
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

const rehydrateFullS3Object = async(objectKey) => {
  return new Promise(async(resolve, reject) => {
    try {
      console.log("normal_ingest", objectKey);
      const data = await getObjectContents(objectKey)
      const rawLogString = await streamToString(data.Body);
      const logsJson = logStringToJson(rawLogString);
      console.log("result length", logsJson.length);
      await postToLogstash(logsJson);
      resolve({objectKey, status: 'complete'})
    } catch(err) {
      reject({objectKey, status: 'fail', error: err})
    }
  })
}

const rehydrateQueriedS3Object = async(objectKey, sqlExpression) => {
  return new Promise(async(resolve, reject) => {
    try {
      console.log("query_ingest", objectKey);
      const data = await queryObjectContents(objectKey, sqlExpression);
      const rawLogString = await queryStreamToString(data.Payload);
      const logsJson = logStringToJson(rawLogString);
      console.log("result length", logsJson.length);
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
  rehydrateFullS3Object,
  rehydrateQueriedS3Object
}