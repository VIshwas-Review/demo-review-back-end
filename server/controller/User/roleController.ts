import type { Response, Request, NextFunction } from 'express'

import User from '../../models/user'
import { USER_ROLES } from '../../config/constants'
import { generateToken } from '../../lib/accessToken'
import { sendEmail, getMailOptions } from '../../lib/email'

export const generateAdminToken = async (req: Request, res: Response) => {
  try {
    const { requesterEmail, isApproved, message, approvedRole } = req.body
    const user = JSON.parse(res.get('user'))

    if (approvedRole && approvedRole === USER_ROLES.ADMIN) {
      const status = Boolean(isApproved)

      const mailOptions = getMailOptions(
        user.email,
        requesterEmail,
        status,
        status
          ? generateToken({
              requesterEmail,
              isApproved,
              message,
              approvedEmail: user.email,
              approvedRole,
            })
          : undefined
      )

      return sendEmail(mailOptions, res)
    }

    res.status(422)
    res.statusMessage = 'Unprocessable Entity'

    return res.send({ message: 'The Token can be generated only for the Admin role' })
  } catch (error: any) {
    res.status(422)
    res.statusMessage = 'Unprocessable Entity'
    return res.send({ message: error.message, body: req.body, params: req.params })
  }
}
