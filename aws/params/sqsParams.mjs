export const REHYDRATION_QUEUE_PARAMS = {
  QueueName: process.env.REHYDRATION_QUEUE_NAME,
  Attributes: {
    MessageRetentionPeriod: '86400'
  }
};
