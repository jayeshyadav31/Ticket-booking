import express from "express"
import { signupUser,loginUser,logout,updateUser, getUser } from "../Controllers/UserControllers.js";
import ProtectRoute from "../middleware/ProtectRoutes.js";
const router=express.Router()
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',logout)
router.post('/update/:id',ProtectRoute,updateUser)
router.get('/profile/:query',ProtectRoute,getUser)
export default router;