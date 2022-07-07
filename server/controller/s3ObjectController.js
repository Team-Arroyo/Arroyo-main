const  { getBucketObjects, getObjectContents } = require("../lib/s3Client");
const { streamToString } = require("../utils/streamToString");

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
    const bodyContents = await streamToString(data.Body);
    const logs = (bodyContents.split("\n"));
    res.status(202).json({
      message: `Rehydrate on ${objectKey} in progress`,
      sampleLog: logs[0]
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