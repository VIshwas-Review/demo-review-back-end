import express from 'express'

import { signIn, signUp } from '../controller/User/authController'
import { generateAdminToken } from '../controller/User/roleController'
import { verifySignUpRole } from '../middleware/auth'

const router = express.Router()

router.post('/sign-in', signIn)
router.post('/sign-up', verifySignUpRole, signUp)
router.post('/generate-admin-role-token', generateAdminToken)

export default router
