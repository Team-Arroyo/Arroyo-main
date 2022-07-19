To be able to run this, you would need to create a .env file with the following variables:
```
AWS_REGION='your aws region'
USER_LOGS_S3_BUCKET_NAME='bucket name from which to fetch logs'
LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME='bucket name that would contain lambda deployment package'
REHYDRATION_LAMBDA_NAME='lambda function name'
REHYDRATION_QUEUE_NAME='sqs name'
LAMBDA_EXECUTION_ROLE_ARN='arn for the lambda execution role'
```