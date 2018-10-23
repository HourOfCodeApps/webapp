import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const emailSettings = functions.config().email;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

/**
 *
 * @param {{ from, to, subject, text }} options
 */
const sendEmail = (options) => {
  const mailOptions = {
    from: emailSettings.from,
    ...options,
  };

  return mailTransport.sendMail(mailOptions);
}

export default sendEmail;
