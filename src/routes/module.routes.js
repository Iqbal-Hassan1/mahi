import { modulecontroller } from '../controllers';
import express from 'express';
import auth from '../utils/middlewares/auth'

const moduleRouter = express.Router();

moduleRouter.post('/create-module', auth.auth, (...args) => modulecontroller.create(...args));

moduleRouter.post('/create-industry', auth.auth, (...args) => modulecontroller.addIndustry(...args));

moduleRouter.get('/get-all-industry', auth.auth, (...args) => modulecontroller.getAllIndustry(...args));

moduleRouter.get('/get-all-modules', auth.auth, (...args) => modulecontroller.getAllModules(...args));

moduleRouter.post('/filter-modules', auth.auth, (...args) => modulecontroller.filterModules(...args));

moduleRouter.get('/get-module/:id', auth.auth, (...args) => modulecontroller.getModuleById(...args));

moduleRouter.patch('/update-module/:id', auth.auth, (...args) => modulecontroller.updateModule(...args));






module.exports = moduleRouter;