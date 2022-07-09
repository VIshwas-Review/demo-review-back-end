import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import { USER_ROLES } from '../config/constants'
import { verifyAccessToken } from '../lib/accessToken'
import type { UserRole, RoleVerificationPayLoad } from '../types/api'

export const authenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
  roles?: UserRole[]
) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) {
      return res.status(401).json({
        error: 'Login or Signup to Continue',
      })
    } else {
      const isCustomAuth = accessToken.length < 500
      let decodedData: any

      if (accessToken && isCustomAuth) {
        decodedData = jwt.verify(accessToken, process.env.JWT_SECRET as string)
        req.params.userId = decodedData?.userId

        res.set('user', JSON.stringify(decodedData))
      } else {
        decodedData = jwt.decode(accessToken)

        req.params.userId = decodedData?.sub
      }

      if (decodedData?.exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: 'JWT token has expired, please login to obtain a new one',
        })
      }

      if (roles) {
        if (roles.includes(decodedData?.role)) {
          return next()
        } else {
          return res.status(404).send('Access Denied')
        }
      }

      return next()
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

export const verifySignUpRole = async (req: Request, res: Response, next: NextFunction) => {
  const { email, accessToken, role } = req.body

  if (role === USER_ROLES.ADMIN) {
    try {
      const accessPayload = verifyAccessToken<RoleVerificationPayLoad>(accessToken)

      if (accessPayload && accessToken && email === accessPayload.requesterEmail) {
        return next()
      } else {
        res.status(422)
        res.statusMessage = 'Unprocessable Entity'
        return res.send({
          message: 'The Access Token is Invalid with the Email which you have given',
        })
      }
    } catch (error: any) {
      res.status(422)
      res.statusMessage = 'Unprocessable Entity'
      return res.send({ message: error.message })
    }
  } else {
    next()
  }
}
