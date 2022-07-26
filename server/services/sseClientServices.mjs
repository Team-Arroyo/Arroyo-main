import sseClient from '../backend_clients/sseClient.mjs';

const formatStatusesToJson = (statusStrings) => {
  return statusStrings.map(statStr => JSON.parse(statStr));
};

const sendEventStreamData = (payload) => {
  const sseFormattedStreamData = `data: ${JSON.stringify(payload)}\n\n`;
  sseClient.stream?.write(sseFormattedStreamData);
};

export const reportStatuses = ({eventType, statusStrings}) => {
  // console.log('Reporting statuses', statusStrings);
  const failedFiles = formatStatusesToJson(statusStrings).filter(({ status }) => status === 'complete');
  console.log('failedFiles', failedFiles);
  sendEventStreamData({
    eventType,
    failedFiles
  });
};