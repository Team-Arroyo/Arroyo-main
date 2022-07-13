const  { getBucketObjects, getObjectContents } = require("../lib/s3Client");
const { streamToString } = require("../utils/streamToString");
const { logStringToJson } = require("../utils/logStringToJson");
const { postToLogstash } = require("../services/logstashService");

const getS3Objects = async(req, res, next) => {
  try {
    const  response  = await getBucketObjects()
    const objectKeys = response.Contents?.map(({Key}) => Key);
    res.send({objectKeys})
  } catch (err) {
    console.log("Error", err.$metadata);
    res.status(err.$metadata.httpStatusCode).send({
      fault: err.$fault, 
      status: err.$metadata.httpStatusCode,
      type: err.name,
      message: err.message,
    })
;  }
}

const rehydrateS3Object = async(req, res, next) => {
  try {
    const { objectKey } = req.body
    const data = await getObjectContents(objectKey)
    const rawLogString = await streamToString(data.Body);
    const logsJson = logStringToJson(rawLogString);
    await postToLogstash(logsJson)
    res.status(202).json({
      message: `Rehydrate on ${objectKey} in progress`,
    })
  } catch(err) {
    console.log("Error", err)
    res.status(err.$metadata.httpStatusCode).send({
      fault: err.$fault, 
      status: err.$metadata.httpStatusCode,
      type: err.name,
      message: err.message,
    })
  }
}

module.exports = {
  getS3Objects,
  rehydrateS3Object
}