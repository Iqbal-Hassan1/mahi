import { orgnaization } from '../controllers';
import express from 'express';
import auth from '../utils/middlewares/auth'
import uploads from '../utils/file-upload'

const orgnaizationRouter = express.Router();

orgnaizationRouter.patch('/update/:id', [auth.auth, uploads.single('logo')], (...args) => orgnaization.updateOrgnaization(...args));

orgnaizationRouter.post('/create', [auth.auth, uploads.single('logo')], (...args) => orgnaization.addOrgnaization(...args));

orgnaizationRouter.get('/get-all', [auth.auth, auth.checkrole], (...args) => orgnaization.getAllOrgnaization(...args));

module.exports = orgnaizationRouter;