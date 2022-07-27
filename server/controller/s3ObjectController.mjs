import getBucketObjectsWithinDates from '../aws/s3/getBucketObjectsWithinDates.mjs';
import getAllBucketObjectKeys from '../aws/s3/getAllBucketObjectKeys.mjs';


export const getS3Objects = async(req, res) => {
  const dateError = req.dateError;
  const startDate = req.startDate;
  const endDate = req.endDate;

  if(dateError) {
    res.status(400).send({dateError});
    return;
  }

  try {
    let objectKeys;

    if(!!startDate && !!endDate) {
      console.log('date supplied');
      objectKeys = await getBucketObjectsWithinDates({ startDate, endDate });
    } else {
      console.log('No date supplied');
      objectKeys = await getAllBucketObjectKeys({ Bucket: process.env.AWS_BUCKET_NAME });
    }

    res.send({objectKeys});
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).send({
      message: 'Fetching object from S3 failed, see error message for more details', 
      error
    });
  }
};

