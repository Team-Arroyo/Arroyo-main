import express from 'express';
import { getS3Objects, rehydrateS3Object } from '../controller/s3ObjectController.mjs';
import { initializeRehydrateJob, initializeQueryRehydrate }  from '../controller/rehydrateController.mjs';

import validateObjectKeys from '../middleware/validateObjectKeys.mjs';
import validateUrlDateParams from '../middleware/validateUrlDateParams.mjs';
import validateQueries from '../middleware/validateQueries.mjs';
import validateBodyDateParams from '../middleware/validateBodyDateParams.mjs';

const router = express.Router();

router.get('/s3objects', validateUrlDateParams, getS3Objects);

//will be removed once front end switches to new api
router.post('/s3object/rehydrate', rehydrateS3Object);

router.post('/s3objects', validateObjectKeys, initializeRehydrateJob);

router.post('/query-ingest', validateBodyDateParams, validateQueries, initializeQueryRehydrate);

// module.exports = router
export default router;