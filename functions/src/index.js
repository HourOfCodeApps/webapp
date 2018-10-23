/* eslint-disable import/prefer-default-export */

import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

import sendEmail from './lib/sendEmail';
import renderTemplate from './lib/renderTemplate';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

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

const emailTeacherApproved = functions.firestore.document('teachers/{uid}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const oldValue = change.before.data();

    if (oldValue.isApproved || !newValue.isApproved) {
      return;
    }

    const { uid } = context.params;

    const userRecord = await admin.auth().getUser(uid);
    await sendEmail({
      to: userRecord.email,
      subject: 'Ваш доступ підтверджено',
      text: 'Ваш доступ було підтверджено адміністратором',
      html: renderTemplate('email-teacher-approved', {
        displayName: userRecord.displayName,
      })
    });
    console.log('Email sent', userRecord.toJSON());
  });

const emailTeacherNeedsApprove = functions.firestore.document('teachers/{uid}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) {
      // teacher deleted
      return;
    }

    const teacher = change.after.data();
    const oldValue = change.before.data();

    if (
      !teacher.schoolId // teacher hasn't school yet
      || oldValue.isApproved || teacher.isApproved // teacher is already approved
    ) {
      return;
    }

    const { uid } = context.params;
    const userSnap = await firestore.collection('users').doc(context.params.uid).get();
    const user = userSnap.data();

    const teacherUserRecord = await admin.auth().getUser(uid);

    const schoolSnap = await firestore.collection('schools').doc(teacher.schoolId).get();
    const school = schoolSnap.data();

    const adminSnaps = await firestore.collection('admins').get();

    const admins = await Promise.all(
      adminSnaps.docs
        .map(doc => doc.id)
        .map(uid => admin.auth().getUser(uid))
    );

    const adminEmails = admins.map(userRecord => userRecord.email);

    await sendEmail({
      bcc: adminEmails.filter(v => v).join(),
      subject: 'Новий вчитель потребує підтвердження',
      text: `Вчитель ${teacherUserRecord.displayName} з школи "${school.name}" потребує підтвердження.`,
      html: renderTemplate('email-teacher-needs-approve', {
        school,
        teacher: teacherUserRecord,
        url: `${functions.config().general.host}/teachers`,
      })
    });
    console.log('Email sent');
  });

export {
  emailTeacherApproved,
  emailTeacherNeedsApprove,
  updateSchoolsTimeslotsCount,
}
