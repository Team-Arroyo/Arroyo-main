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

## 1.2 POST /api/s3object/rehydrate -- DEPRECIATED
See Heading 1.3 for the new API route. This section will be removed
once confirmed that front end is using new API described in 1.3

## 1.2.1 Expected Parameters -- DEPRECIATED
```json
{
  "objectKey": "log1.txt"
}
```

## 1.2.2 Example Response -- DEPRECIATED
```json
{
  "message": "Rehydrate on logs1.txt in progress",
}
```

## 1.2.3 Error Response -- DEPRECIATED
If the objectKey is not found within the AWS S3 bucket, the backend
will format and forward an error message in the body with status 500

## 1.2.4 Example Error Response -- DEPRECIATED
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
This the NEW route is used to start the rehydrate process of a batchs of AWS S3 objects. Sends a 200 resposne upon success. Will change as architecture changes.

## 1.3.1 Expected Parameters
```json
{
  "objectKeys": ["kibana-access.log", "nginx-access.log"]
}
```

## 1.3.2 Example Response
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

## 1.3.3 Partial Partial Success Response
If some files fail on reingestion -- the batch status will include an error object associated with the failing file. The response status returns 200
regardless of a partial batch failure.  Will change as architecture and log volume changes.

## 1.3.4 Example Partial Success Response
```json
{
    "batchStatus": [
        {
            "objectKey": "badfile-access.log",
            "status": "fail",
            "error": {
                "name": "NoSuchKey",
                "$fault": "client",
                "$metadata": {
                    "httpStatusCode": 404,
                    "extendedRequestId": "sBO34NTmqgh+8b7OsIwJCryu0ArTnuNn1LTicaBOKJk+OsA/R08jB4AI+aXAVB7lfqbzniCAFCQ=",
                    "attempts": 1,
                    "totalRetryDelay": 0
                },
                "Code": "NoSuchKey",
                "Key": "badfile-access.log",
                "RequestId": "3YKYAPEB7NN26Z69",
                "HostId": "sBO34NTmqgh+8b7OsIwJCryu0ArTnuNn1LTicaBOKJk+OsA/R08jB4AI+aXAVB7lfqbzniCAFCQ=",
                "message": "The specified key does not exist."
            }
        },
        {
            "objectKey": "nginx-access.log",
            "status": "complete"
        }
    ]
}
```

## 1.3.4 User Error
If the req. body is missing an objectKeys field, or the supplied array is empty the API will return status 400 with a JSON object describing the error

## 1.3.5 Ecample User Error Response
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "Missing field objectKeys in req. body",
    "expectedFormat": "{objectKeys: [file1.log, file2.log]}"
}
```


## 1.3.6 Complete Job Failure
If all files fail on reingestion -- during development the batch status will include all error messages associated with each file. The response returns a 400 status. Will change as architecture and log volume changes.

## 1.3.7 Example Complete Failure Response
```json
{
    "batchStatus": [
        {
            "objectKey": "kibana-access.log",
            "status": "fail",
            "error": {
                "name": "NoSuchBucket",
                "$fault": "client",
                "$metadata": {
                    "httpStatusCode": 404,
                    "extendedRequestId": "Guxk3LERKIwXxHjAtP5Lt4Ng36pnVcPyQqleeiug9s2V8h4DKtMRIM5224QcGDUD4ZoKIIRBlX8=",
                    "attempts": 1,
                    "totalRetryDelay": 0
                },
                "Code": "NoSuchBucket",
                "BucketName": "non-existing-bucket",
                "RequestId": "H3TKZHMQBPXS1RW1",
                "HostId": "Guxk3LERKIwXxHjAtP5Lt4Ng36pnVcPyQqleeiug9s2V8h4DKtMRIM5224QcGDUD4ZoKIIRBlX8=",
                "message": "The specified bucket does not exist"
            }
        }
    ]
}
```

