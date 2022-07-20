const axios = require("axios");
const { S3Client, SelectObjectContentCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client();
  
  const convertDataToJson = async (generator) => {
        const chunks = [];
        for await (const value of generator) {
            if (value.Records) {
              chunks.push(value.Records.Payload);
            }
        }  
        const payload = Buffer.concat(chunks).toString('utf8');
        const rawLogs = payload.split("\n")
      //Splitting leaves an empty string as final element -- pop it off ''
        rawLogs.pop()
        return rawLogs.map(text => JSON.parse(text))
    }

exports.handler = async (event) => {
  console.log(event.Records[0])
  const { Bucket, Key } = JSON.parse(event.Records[0].body);

  const params = {
    Bucket,
    Key,
    ExpressionType: 'SQL',
    Expression: `SELECT * FROM s3object s LIMIT 5`,
    InputSerialization: {
      JSON: {
        Type: 'LINES'
      }
    },
    OutputSerialization: {
      JSON: {
        RecordDelimiter: '\n'
      }
    }
  }

    let payload;
    try {
        console.log("entering function");
        const data = await s3Client.send(new SelectObjectContentCommand(params))
        const logs = await convertDataToJson(data.Payload)
        payload = logs
    } catch(err) {
        console.log(err)
        payload = err
    }
    console.log('payload: ', payload);

    const postResponse = await axios.post('https://requestbin.io/1dvd1rq1', JSON.stringify(payload));
    console.log('Posted to webhook. Response: ', postResponse);
};
