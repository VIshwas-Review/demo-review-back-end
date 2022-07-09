import type { Response } from 'express'
import type { SendMailOptions, SentMessageInfo } from 'nodemailer'

import { MAIL_TRANSPORTER_EMAIL } from '../config/variables'
import { MailTransporter } from '../config/mailTransporter'

export const getMailOptions = (
  from: string,
  to: string,
  status: boolean,
  token?: string
): SendMailOptions => {
  const html = status
    ? `<h1> Congratulations Your Request to get Admin Role has been approved </h1>
    <p> Your Token to Register as admin user in the portal <strong> ${token} </strong>. 
    <br> </br> Please use your email ${to} with the above Access Token to register.</p>
      <p> Register through the portal within 24 hours from now, 
       because the the token which has been provided to you is much confidential
       and expires after the 24 hours. please register and login within time.
        </p>`
    : '<h3> Your Request to get the Super User access has been Rejected, PLease Try communicating with User who has all privileged access </h3>'
  const subject = status
    ? 'Your Request to Admin Role Processed'
    : 'Your Request to Admin Role UnProcessed'
  const text = status
    ? `Happy to have you!, welcome the organization ${to}`
    : 'Rejected due to some security policy'

  return {
    from: MAIL_TRANSPORTER_EMAIL,
    to,
    cc: [from, MAIL_TRANSPORTER_EMAIL],
    html,
    subject,
    text,
  }
}

export const sendEmail = (options: SendMailOptions, response: Response) => {
  const sendMessageHandler = (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      console.log(
        `There was some issue with the mail transporter ${JSON.stringify(
          error
        )}, with the Mail Options ${JSON.stringify(options)}`
      )
      response.status(401)
      response.send(`There was some issue with the mail transporter ${JSON.stringify(error)}`)
    } else {
      console.log(`The Access token has been sent successfully`)
      response.status(200)
      response.send({
        message: `Successfully Access Token has been sent to ${options.to}`,
        mailInfo: JSON.stringify(info),
      })
    }
  }

  MailTransporter.sendMail(options, sendMessageHandler)
}
