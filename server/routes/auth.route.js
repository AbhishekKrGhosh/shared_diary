import express from 'express'
import { google, signin, signout, signup } from '../controllers/auth.controller.js'
import { apiKeyAuth } from '../utils/apiKeyAuth.js';

const router = express.Router()

router.use(apiKeyAuth);

router.post('/signup',signup )
router.post('/signin',signin )
router.post('/google', google)
router.get('/signout', signout)

export default router