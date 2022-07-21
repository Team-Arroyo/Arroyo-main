import express from 'express';
import { getS3Objects, rehydrateS3Object } from '../controller/s3ObjectController.mjs';
import initializeRehydrateJob from '../controller/rehydrateController.mjs';

import validateDateParams from '../middleware/validateDateParams.mjs';
import validateObjectKeys from '../middleware/validateObjectKeys.mjs';

const router = express.Router();

router.get('/s3objects', validateDateParams, getS3Objects);

//will be removed once front end switches to new api
router.post('/s3object/rehydrate', rehydrateS3Object);

router.post('/s3objects', validateObjectKeys, initializeRehydrateJob);

// module.exports = router
export default router;