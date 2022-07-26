import sseClient from '../backend_clients/sseClient.mjs';

export const establishSseConnection = (req, res) => {
  console.log('Establishing SSE connection...');
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };

  res.writeHead(200, headers);
  res.write('data: hello from server');
  res.write('\n\n');
  
  sseClient.stream = res;
};