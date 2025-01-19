import express from "express";
const router = express.Router();
import { signUp,
     verifyEmail,
     login,
     logout,
     forgotPassword,
     resetPassword,
     checkAuth
 } from "../controllers/auth.controllers.js";
 import verifyJwT from "../middlewares/auth.middleware.js";

router.post('/signup',signUp);
router.post('/verify-email',verifyEmail);
router.post('/login',login);
router.post('/logout',verifyJwT,logout);
router.post('/forgot-password',forgotPassword)

router.post('/reset-password/:token',resetPassword)
router.get('/check-Auth',verifyJwT,checkAuth);


export default router;