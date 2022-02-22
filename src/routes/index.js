import express from 'express';

import userRouter from './user.routes';
import moduleRouter from './module.routes';
import orgnaizationRouter from './orgnaization.routes';

const router = express.Router();


/***
 * Routers (route handlers).
 */
router.use('/user', userRouter);

router.use('/module', moduleRouter);

router.use('/orgnaization', orgnaizationRouter)


module.exports = router;
