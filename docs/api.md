# 1. API Documentation

## 1.1 GET /api/s3objects[?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy]
This route is used to fetch object keys (file names) that exist
within an AWS S3 bucket. Sends a 200 response.

## 1.1.1 Expected Parameters
If no query params are supplied, the enpoint will return the first 1000
objects contained in an S3 bucket.

Should a user want to filter S3 objects based on a timeframe they will
need to provide a startDate and endDate query param. It is possible to recieve an empty objectKeys payload should no files match the timeframe.

```
/api/s3objects?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy
```

## 1.1.2 Example Responses
```json
{
  "objectKeys": ["log1.log", "log2.log"]
}

{
  "objectKeys": []
}
```

## 1.1.3 Error Responses
During development the API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

It will return status 400 errors and a JSON body if the query params supplied do not meet expected configuration.


## 1.1.4 Example Server Error Response
```json
{"message":"Fetching object from S3 failed, see error message for more details","error":{
  "name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"extendedRequestId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"ls-capstone-deepstor","RequestId":"KDNA5DTMK5A4PJ01","HostId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","message":"The specified bucket does not exist"
  }
}
```

## 1.1.5 Sample User Error Response
```json
{
    "dateError": {
        "status": 400,
        "description": "Bad Request",
        "message": "Malformed date parameter",
        "expectedFormat": "mm-dd-yyyy"
    }
}
```

## 1.2 POST /api/s3object/rehydrate
This route is used to start the rehydrate process of an AWS S3 object. Sends a 202 resposne

## 1.2.1 Expected Parameters
```json
{
  "objectKey": "log1.txt"
}
```

## 1.2.2 Example Response
```json
{
  "message": "Rehydrate on logs1.txt in progress",
  "sampleLog": "31.11.188.151 - - [07/Jul/2022:12:55:34 -0500] \"GET /totam/exercitationem/quidem.css HTTP/1.0\" 200 5004 \"https://www.foster.org/search/\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5341 (KHTML, like Gecko) Chrome/13.0.821.0 Safari/5341\""
}
```

## 1.2.3 Error Response
If the objectKey is not found within the AWS S3 bucket, the backnd
will format and forward a brief AWS error message in the body with relevant information

## 1.2.4 Example Error Response
```json
{
    "fault": "client",
    "status": 404,
    "type": "NoSuchKey",
    "message": "The specified key does not exist."
}
```

