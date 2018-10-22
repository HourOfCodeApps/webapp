/* eslint-disable import/prefer-default-export */
// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });


// import sendEmail from './lib/sendEmail';

// // Sends an email confirmation when a user changes his mailing list subscription.
// exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(async (change) => {
//   const snapshot = change.after;
//   const val = snapshot.val();

//   if (!snapshot.changed('subscribedToMailingList')) {
//     return null;
//   }

//   const mailOptions = {
//     from: '"Spammy Corp." <noreply@firebase.com>',
//     to: val.email,
//   };

//   const subscribed = val.subscribedToMailingList;

//   // Building Email message.
//   mailOptions.subject = subscribed ? 'Thanks and Welcome!' : 'Sad to see you go :`(';
//   mailOptions.text = subscribed ?
//       'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.' :
//       'I hereby confirm that I will stop sending you the newsletter.';

//   try {
//     await sendEmail(mailOptions);
//     console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, val.email);
//   } catch(error) {
//     console.error('There was an error while sending the email:', error);
//   }
//   return null;
// });
// const admin = require('firebase-admin');

const updateSchoolsTimeslotsCount = functions.firestore.document('timeslots/{timeslotId}')
  .onWrite(async (change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const oldDocument = change.before.data();

    const schoolId = document ? document.schoolId : oldDocument.schoolId;

    const timeslotDocs = await firestore.collection('timeslots')
      .where('schoolId', '==', schoolId)
      .get();

    const timeslots = timeslotDocs.docs
      .map(d => d.data())
      .filter(d => !d.mentorId);

    await firestore.collection('schools').doc(schoolId).set({
      availableTimeslotsCount: timeslots.length,
      timeslotsCount: timeslotDocs.docs.length,
    }, { merge: true });
  });

export {
  updateSchoolsTimeslotsCount,
}
