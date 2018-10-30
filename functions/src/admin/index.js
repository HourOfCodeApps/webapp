/* eslint-disable import/prefer-default-export */

import admin from '../lib/firebase';
import sendEmail from '../lib/sendEmail';
import renderTemplate from '../lib/renderTemplate';

const firestore = admin.firestore();

const sendEmailToAdmins = async (subject, template, data) => {
  const adminSnaps = await firestore.collection('admins').get();

  const admins = await Promise.all(
    adminSnaps.docs
      .map(doc => doc.id)
      .map(uid => admin.auth().getUser(uid))
  );

  const adminEmails = admins.map(userRecord => userRecord.email);

  await sendEmail({
    bcc: adminEmails.filter(v => v).join(),
    subject,
    html: renderTemplate(template, data),
  });
};

export {
  sendEmailToAdmins,
}
