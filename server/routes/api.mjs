import express from 'express';
import { getS3Objects } from '../controller/s3ObjectController.mjs';
import { initializeRehydrateJob, initializeQueryRehydrate }  from '../controller/rehydrateController.mjs';

import validateObjectKeys from '../middleware/validateObjectKeys.mjs';
import validateUrlDateParams from '../middleware/validateUrlDateParams.mjs';
import validateQueries from '../middleware/validateQueries.mjs';
import validateBodyDateParams from '../middleware/validateBodyDateParams.mjs';

const router = express.Router();

router.get('/s3objects', validateUrlDateParams, getS3Objects);

router.post('/s3objects', validateObjectKeys, initializeRehydrateJob);

router.post('/query-ingest', validateBodyDateParams, validateQueries, initializeQueryRehydrate);

export default router;