const { getAllLogs, queryForLogs } = require("./services/logFetchService");
const { postToLogstash } = require("./services/logstashService");

exports.handler = async (event) => {
    console.log("Records", event.Records);
    const { messageId, body } = event.Records[0];
    console.log("body", typeof body);
    const { Bucket, Key, logstashEndpoint, Expression } = JSON.parse(body);
    
    let response = {};
    console.log("Bucket", Bucket);
    console.log("Key", Key);
    console.log("logstashHost", logstashEndpoint);
    console.log(`Expression: ${Expression}`)
   
    try {
        let logsJson = [];
        
        if(Expression) {
            logsJson = await queryForLogs(Bucket, Key, Expression)
        } else {
            logsJson = await getAllLogs(Bucket, Key);
        }
        
        await postToLogstash(logstashEndpoint, logsJson)
        
        response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
        };
        
    } catch(error) {
        console.log("Failed rehydrate job", error);
        console.log("Reporting back to SQS\n");
        response = {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
    
    return response;
};
