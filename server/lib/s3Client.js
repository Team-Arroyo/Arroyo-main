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

const getBucketObjects = async(bucketName) => {
  try {
    const response = await s3Client.send( new ListObjectsCommand({Bucket: process.env.AWS_BUCKET_NAME}))
    return response;
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

module.exports = { getBucketObjects, getObjectContents }