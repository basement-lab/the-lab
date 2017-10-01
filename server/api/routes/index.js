
import express from 'express';

import test from './test.js';

/******************************************************************************/

const router = express.Router();

router.get('/api/test', test);

/******************************************************************************/

export default router;
