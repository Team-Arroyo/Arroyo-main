const  { getBucketObjects, getObjectContents } = require("../lib/s3Client");


const getS3Objects = async (req, res, next) => {
  try {
    const  response  = await getBucketObjects()
    const objKeys = response.Contents?.map(({Key}) => Key);
    res.send({objKeys})
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

module.exports = {
  getS3Objects
}