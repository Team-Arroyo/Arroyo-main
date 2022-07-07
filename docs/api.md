# 1. API Documentation

## 1.1 GET /api/s3objects
This route is used to fetch all object keys (file names) that exist
within an AWS S3 bucket.

## 1.1.1 Expected Parameters
None

## 1.1.2 Example Response
```json
{
  "objectKeys": ["log1.txt", "log2.txt"]
}
```