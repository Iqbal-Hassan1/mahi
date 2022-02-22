import { user } from '../controllers';
import express from 'express';
import auth from '../utils/middlewares/auth'

const userRouter = express.Router();

userRouter.post('/signup', (...args) => user.signup(...args));

userRouter.post('/login', (...args) => user.login(...args));

userRouter.get('/get-all-users', [auth.auth, auth.checkrole], (...args) => user.getAllUsers(...args));

userRouter.patch('/update-user/:id', [auth.auth], (...args) => user.updateUser(...args));

userRouter.patch('/update-userPassword/:id', [auth.auth], (...args) => user.UserPassUpdate(...args));

userRouter.post('/super-user', (...args) => user.SuperUser(...args));

userRouter.get('/get-all-super-users', [auth.auth, auth.checkrole], (...args) => user.getAllSuperUsers(...args));

userRouter.post('/filter-super-user', [auth.auth, auth.checkrole], (...args) => user.filterSuperUsers(...args));

userRouter.patch('/super-update-user/:id', [auth.auth], (...args) => user.superUserUpdate(...args));

userRouter.patch('/super-update-userPassword/:id', [auth.auth, auth.checkrole], (...args) => user.superUserPassUpdate(...args));


module.exports = userRouter;