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
The API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

### 1.1.4 Example Server Error Response
```json
{
    "message": "Fetching object from S3 failed, see error message for more details",
    "error": {
        "name": "InvalidClientTokenId",
        "$fault": "client",
        "$metadata": {
            "httpStatusCode": 403,
            "requestId": "bf3249af-b430-59a4-9dd7-12f5aaf8edb3",
            "attempts": 1,
            "totalRetryDelay": 0
        },
        "Type": "Sender",
        "Code": "InvalidClientTokenId",
        "Detail": "",
        "message": "The security token included in the request is invalid."
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


## 1.2 POST /api/s3objects
This the route is used to start the rehydrate process of a batch of AWS S3 objects. Sends a 202 response upon being accepted with JSON message.

```json
{
    "message": "Rehydrating task in progress..."
}
```

### 1.2.1 Expected Parameters
```json
{
  "objectKeys": ["kibana-access.log", "nginx-access.log"]
}
```

### 1.2.2 Example Response
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

### 1.2.3 Server Error Responses
The API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

### 1.2.4 Example Server Error Response
```json
{
    "message": "Failed to connect to rehydrate queue",
    "error": {
        "name": "InvalidClientTokenId",
        "$fault": "client",
        "$metadata": {
            "httpStatusCode": 403,
            "requestId": "bf3249af-b430-59a4-9dd7-12f5aaf8edb3",
            "attempts": 1,
            "totalRetryDelay": 0
        },
        "Type": "Sender",
        "Code": "InvalidClientTokenId",
        "Detail": "",
        "message": "The security token included in the request is invalid."
    }
}
```

### 1.2.5 User Errors.
The API will return status 400 with a JSON object describing the error.

### 1.2.6 Example Error -- Missing objectKeys.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "Missing field objectKeys in req. body",
    "expectedFormat": "{objectKeys: [file1.log, file2.log]}"
}
```

### 1.2.7 Example Error -- Empty objectKeys
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "objectKeys is empty. No results will be produced.",
    "expectedFormat": "{objectKeys: [file1.log, file2.log]}"
}
```

## 1.3 POST /api/query-ingest
This route is used to search for logs within a specified date range and selectivly pull
only the log lines that match ```key/value``` pairs that are provided. Response returns a 202 with JSON message to signify the query is in progress.

```json
{
    "message": "Rehydrating task in progress..."
}
```

### 1.3.1 Expected Payload
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

### 1.3.3 Server Error Responses
The API will return status 500 errors and a JSON body when there are issues with AWS credeintials/requests.

### 1.3.4 Example Server Error Response
```json
{
    "message": "Failed to connect to rehydrate queue",
    "error": {
        "name": "InvalidClientTokenId",
        "$fault": "client",
        "$metadata": {
            "httpStatusCode": 403,
            "requestId": "cc4225fe-d89a-5f04-92c1-7ea4c608b811",
            "attempts": 1,
            "totalRetryDelay": 0
        },
        "Type": "Sender",
        "Code": "InvalidClientTokenId",
        "Detail": "",
        "message": "The security token included in the request is invalid."
    }
}
```

### 1.3.5 User Errors.
The API will return status 400 with a JSON object describing the error.

### 1.3.6 Example Error -- Too many key/value pairs in queries.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "Invalid number of key/value pairs provided.",
    "maxExpectedPairs": 2
}
```

### 1.3.7 Example Error -- Queries array supplied, but empty.
```json
{
    "status": 400,
    "description": "Bad Request",
    "message": "queries array was provided, but is empty."
}
```

### 1.3.8 Example Error -- Imporper key/value object structure.
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

### 1.3.9 Example Error -- No files within date range
```json
{
    "message": "No files found to ingest within date range"
}
```


