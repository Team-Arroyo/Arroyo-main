const dotenv = require("dotenv")
dotenv.config();

const { S3Client, ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

const getAllBucketObjects = async() => {
  try {
    const response = await s3Client.send( new ListObjectsCommand({Bucket: process.env.AWS_BUCKET_NAME}))
    const objectKeys = response.Contents?.map(({Key}) => Key);
    return objectKeys;
  } catch(err) {
    throw err
  }
}

const getObjectContents = async(Key) => {
  try {
    const data = await s3Client.send(new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key
    }))
    return data
  } catch(err) {
    throw err
  }
}

const getBucketObjectsWithinDates = async(startDate, endDate) => {
  const startMs = Date.parse(startDate);
  const endMs = Date.parse(endDate);

  try {
    const response = await s3Client.send( new ListObjectsCommand({Bucket: process.env.AWS_BUCKET_NAME}))

    const filteredContents = response.Contents.filter(({Key, LastModified }) => {
      const objInputDateMs = Date.parse(new Date(LastModified).toDateString());
      return (startMs <= objInputDateMs) && (objInputDateMs <= endMs)
    })

    const objectKeys = filteredContents.map(({Key}) => Key)
    return objectKeys;
  } catch(err) {
    throw err
  }
}

module.exports = { 
  getAllBucketObjects, 
  getObjectContents,
  getBucketObjectsWithinDates
 }