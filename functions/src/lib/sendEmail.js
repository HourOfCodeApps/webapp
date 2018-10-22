// import functions from 'firebase-functions';
// import nodemailer from 'nodemailer';

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
// const mailTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
// });

// /**
//  *
//  * @param {{ from, to, subject, text }} mailOptions
//  */
// const sendEmail = (mailOptions) => {
//   // const mailOptions = {
//   //   from: '"Spammy Corp." <noreply@firebase.com>',
//   //   to: val.email,
//   // };

//   // mailOptions.subject = subscribed ? 'Thanks and Welcome!' : 'Sad to see you go :`(';
//   // mailOptions.text = subscribed ?
//   //     'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.' :
//   //     'I hereby confirm that I will stop sending you the newsletter.';

//   return mailTransport.sendMail(mailOptions);
// }

// export default sendEmail;
