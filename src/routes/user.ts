import express from 'express'
import userSignup from '../controllers/signup'
import userLogin from '../controllers/userLogin'
const router = express.Router()

router.post("/signup",userSignup)
router.post("/login", userLogin)

export default router