import { Router } from "express";
import { forgotPassword, getAllUser, getSingleUser, login, logout, myprofile, register, resetPassword, updatePassword } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/register',upload.single('avatar'),register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggedIn,myprofile)
router.post('/password/forgot',forgotPassword)
router.put('/password/reset/:token',resetPassword)
router.put('/password/update',updatePassword)

router.get('/admin/users',getAllUser)
router.get('/admin/user/:id',getSingleUser)

export default router