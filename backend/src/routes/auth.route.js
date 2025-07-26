import express from 'express'
import {login, signup, logout, userSetup} from '../controller/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/setup", protectRoute, userSetup);

router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({success: true, user: req.user});
})

export default router