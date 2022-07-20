To be able to run this, you would need to create a `.env` file with the following variables:
```
AWS_REGION='your aws region'
LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME='bucket name that would contain lambda deployment package'
REHYDRATION_LAMBDA_NAME='lambda function name'
REHYDRATION_QUEUE_NAME='sqs name'
```


`LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME` should reference the name of an already existing bucket where you'd like to upload the deployment package to.

`REHYDRATION_QUEUE_NAME` and `REHYDRATION_QUEUE_NAME` should be given unique names.

You should also have your aws credentials set-up (accessible via `.env` file, via config file or whatever other method you typically use).

to run:
- `cd aws`

- `npm install`

- `node index.mjs`

Once you ran the script once, and if you decide to run it again make sure to either:
1. set new names for both `SQS` and `Lambda` (in `.env`)
or
2. delete both resources (from the aws dashbord) and wait 1 minute before running the script
