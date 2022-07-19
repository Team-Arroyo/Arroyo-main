To be able to run this, you would need to create a `.env` file with the following variables:
```
AWS_REGION='your aws region'
USER_LOGS_S3_BUCKET_NAME='bucket name from which to fetch logs'
LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME='bucket name that would contain lambda deployment package'
REHYDRATION_LAMBDA_NAME='lambda function name'
REHYDRATION_QUEUE_NAME='sqs name'
LAMBDA_EXECUTION_ROLE_ARN='arn for the lambda execution role'
```


`LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME` should reference the name of an already existing bucket where you'd like to upload the deployment package to.

`REHYDRATION_QUEUE_NAME` and `REHYDRATION_QUEUE_NAME` should be given unique names.

`LAMBDA_EXECUTION_ROLE_ARN` should reference `arn` of a lambda execution role, see more [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html#permissions-executionrole-console). In addition to this, lambda role should have permission plicy to access SQS and S3 (during development you can grant `all` for SQS and `all` for S3 - it must be changed to be more granular once we start preparing for production).

You should also have your aws credentials set-up (accessible via `.env` file, via config file or whatever other method you typically use).

to run:
- `cd aws`

- `npm install`

- `node index.mjs`

Once you ran the script once, and if you decide to run it again make sure to either:
1. set new names for both `SQS` and `Lambda` (in `.env`)
or
2. delete both resources (from the aws dashbord) and wait 1 minute before running the script
