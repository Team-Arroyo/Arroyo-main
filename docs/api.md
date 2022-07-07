# 1. API Documentation

## 1.1 GET /api/s3objects
This route is used to fetch all object keys (file names) that exist
within an AWS S3 bucket. Sends a 200 response.

## 1.1.1 Expected Parameters
None

## 1.1.2 Example Response
```json
{
  "objectKeys": ["log1.txt", "log2.txt"]
}
```

## 1.1.3 Error Response
If AWS credentials are incorrect the API will format and forward
a brief AWS error message in the body with relevant information


## 1.1.4 Example Error Response
```json
{
    "fault": "client",
    "status": 403,
    "type": "SignatureDoesNotMatch",
    "message": "The request signature we calculated does not match the signature you provided. Check your key and signing method."
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
  "message": "Rehydrate on logs2.txt in progress",
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

