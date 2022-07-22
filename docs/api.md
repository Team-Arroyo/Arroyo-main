# 1. API Documentation

## 1.1 GET /api/s3objects[?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy]
This route is used to fetch object keys (file names) that exist
within an AWS S3 bucket. Sends a 200 response.

### 1.1.1 Expected Parameters
If no query params are supplied, the enpoint will return the first 1000
objects contained in an S3 bucket.

Should a user want to filter S3 objects based on a timeframe they will
need to provide a startDate and endDate query param. It is possible to recieve an empty objectKeys payload should no files match the timeframe.

```
/api/s3objects?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy
```

### 1.1.2 Example Responses
```json
{
  "objectKeys": ["log1.log", "log2.log"]
}

{
  "objectKeys": []
}
```

### 1.1.3 Server Error Responses
During development the API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

### 1.1.4 Example Server Error Response
```json
{"message":"Fetching object from S3 failed, see error message for more details",
 "error":{
  "name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"extendedRequestId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"ls-capstone-deepstor","RequestId":"KDNA5DTMK5A4PJ01","HostId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","message":"The specified bucket does not exist"
  }
}
```
### 1.1.5 User Errors
The API will return a 400 status code and a body describing the error.

### 1.1.6 Example Error -- Incorrect Date Structure
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

### 1.1.7 Example Error -- Missing startDate or endDate in params.
```json
{
    "dateError": {
        "status": 400,
        "description": "Bad Request",
        "message": "Missing date param",
        "expectedFormat": "/api/s3objects?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy"
    }
}
```

## 1.2 POST /api/s3object/rehydrate -- DEPRECIATED
See Heading 1.3 for the new API route. This section will be removed
once confirmed that front end is using new API described in 1.3

### 1.2.1 Expected Parameters -- DEPRECIATED
```json
{
  "objectKey": "log1.txt"
}
```

### 1.2.2 Example Response -- DEPRECIATED
```json
{
  "message": "Rehydrate on logs1.txt in progress",
}
```

### 1.2.3 Error Response -- DEPRECIATED
If the objectKey is not found within the AWS S3 bucket, the backend
will format and forward an error message in the body with status 500

### 1.2.4 Example Error Response -- DEPRECIATED
```json
{
    "message": "Log rehydration failed, see error message for more details",
    "error": {
        "name": "NoSuchKey",
        "$fault": "client",
        "$metadata": {
            "httpStatusCode": 404,
            "extendedRequestId": "ZK1vBmD3JFSkgXASC8fwh7w6NnpbaqREdQF9d4NMOb5DKLTVbaFBRKNHc94ta0N6I18/bRji8tM=",
            "attempts": 1,
            "totalRetryDelay": 0
        },
        "Code": "NoSuchKey",
        "Key": "log.txt",
        "RequestId": "5FTSW3DZF2W8HPMW",
        "HostId": "ZK1vBmD3JFSkgXASC8fwh7w6NnpbaqREdQF9d4NMOb5DKLTVbaFBRKNHc94ta0N6I18/bRji8tM=",
        "message": "The specified key does not exist."
    }
}
```

## 1.3 POST /api/s3objects
This the NEW route is used to start the rehydrate process of a batch of AWS S3 objects. Sends a 202 resposne upon being accepted.

### 1.3.1 Expected Parameters
```json
{
  "objectKeys": ["kibana-access.log", "nginx-access.log"]
}
```

### 1.3.2 Example Response
```json
{
    "batchStatus": [
        {
            "objectKey": "kibana-access.log",
            "status": "complete"
        },
        {
            "objectKey": "nginx-access.log",
            "status": "complete"
        }
    ]
}
```

### 1.3.3 Server Error Responses
During development the API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

### 1.3.4 Example Server Error Response
```json
{"message":"Fetching object from S3 failed, see error message for more details",
 "error":{
  "name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"extendedRequestId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"ls-capstone-deepstor","RequestId":"KDNA5DTMK5A4PJ01","HostId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","message":"The specified bucket does not exist"
  }
}
```

### 1.3.5 User Errors.
The API will return status 400 with a JSON object describing the error.

### 1.3.6 Example Error -- Missing objectKeys.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "Missing field objectKeys in req. body",
    "expectedFormat": "{objectKeys: [file1.log, file2.log]}"
}
```

### 1.3.7 Example Error -- Empty objectKeys
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "objectKeys is empty. No results will be produced.",
    "expectedFormat": "{objectKeys: [file1.log, file2.log]}"
}
```

## 1.4 POST /api/query-ingest
This route is used to search for logs within a specified date range and selectivly pull
only the log lines that match ```key/value``` pairs that are provided. Response returns a 202 to signify the query is in progress.

### 1.4.1 Expected Payload
```json
{
    "startDate": "07-07-2022",
    "endDate": "07-12-2022",
    "queries": [
        {"request_method": "POST"},
        {"remote_addr": "55.555.555.55"}
    ]
}
```

### 1.4.3 Server Error Responses
During development the API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

### 1.4.4 Example Server Error Response
```json
{"message":"Fetching object from S3 failed, see error message for more details",
 "error":{
  "name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"extendedRequestId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"ls-capstone-deepstor","RequestId":"KDNA5DTMK5A4PJ01","HostId":"yHFI2ocjskfT8gs7Vh8aUz1JcBf4Ju4Ugt+ya7VLEbPIwQK8B+LhB/Lsb9VvzBeo9kAaKCs8W+BqMTK6GBRfmA==","message":"The specified bucket does not exist"
  }
}
```

### 1.4.5 User Errors.
The API will return status 400 with a JSON object describing the error.

### 1.4.6 Example Error -- Too many key/value pairs in queries.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "Invalid number of key/value pairs provided.",
    "maxExpectedPairs": 2
}
```

### 1.4.7 Example Error -- Queries array supplied, but empty.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "queries array was provided, but is empty."
}
```

### 1.4.8 Example Error -- Imporper key/value object structure.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "Improper key/value object structure ",
    "exampleFormat": {
        "host_ip": "192.168.1.1"
    }
}
```

### 1.4.9 Example Error -- No files within date range
```json
{
    "message": "No files found to ingest within date range"
}
```


