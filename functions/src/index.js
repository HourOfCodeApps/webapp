/* eslint-disable import/prefer-default-export */

import * as functions from 'firebase-functions';
// import admin from 'firebase-admin';

import { DateTime, Settings } from 'luxon';

import sendEmail from './lib/sendEmail';
import renderTemplate from './lib/renderTemplate';
import admin from './lib/firebase';
import { sendEmailToAdmins } from './admin';

import {
  TIMESLOT_STATUS_NEEDS_APPROVE,
  TIMESLOT_STATUS_APPROVED,
  TIMESLOT_STATUS_HAS_MENTOR,
} from './constants/timeslots';

Settings.defaultZoneName = 'Europe/Kiev';

const firestore = admin.firestore();
// firestore.settings({ timestampsInSnapshots: true });

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

const timeslotUpdated = functions.firestore.document('timeslots/{id}')
  .onWrite(async (change, context) => {

    console.log('timeslot', Boolean(change.before.exists), Boolean(change.after.exists));
    if (!change.after.exists) {
      // timeslot deleted
      console.log('Timeslot deleted');
      return;
    }

    const newValue = change.after.exists ? change.after.data() : null;
    const oldValue = change.before.exists ? change.before.data() : null;

    if (!change.before.exists) {
      console.log('Timeslot created')
    }

    if (
      !newValue.schoolId // timeslot hasn't school
    ) {
      console.log('Invalid timeslot');
      return;
    }

    if (
      !newValue.status
      || newValue.mentorId === undefined
    ) {
      const defaultData = {};

      if (!newValue.status) {
        defaultData.status = TIMESLOT_STATUS_NEEDS_APPROVE;
      }

      if (newValue.mentorId === undefined) {
        defaultData.mentorId = null;
      }

      await change.after.ref.set(defaultData, { merge: true });
      console.log('Default data set');
    }

    if (!change.before.exists) {
      const schoolSnap = await firestore.collection('schools').doc(newValue.schoolId).get();
      const school = schoolSnap.data();

      await sendEmailToAdmins(
        'Новий урок потребує підтвердження',
        'email-timeslot-needs-approve',
        {
          school,
          url: `${functions.config().general.host}/timeslots`,
        }
      );
      console.log('Email sent');
    }

    if (oldValue && newValue && oldValue.status !== newValue.status) {
      // changed status

      if (newValue.status === TIMESLOT_STATUS_APPROVED) {
        console.log('Timeslot was approved');
        // timeslot was approved

        // get teachers profile data
        const schoolSnap = await firestore.collection('schools').doc(newValue.schoolId).get();
        const school = schoolSnap.data();

        const teacherSnaps = await firestore.collection('teachers')
          .where('schoolId', '==', newValue.schoolId)
          .get();
        const teachers = await Promise.all(
          teacherSnaps.docs
            .map(doc => doc.id)
            .map(uid => admin.auth().getUser(uid))
        );

        await Promise.all(
          teachers.map(
            teacherUserRecord => sendEmail({
              bcc: teachers.map(t => t.email).filter(v => v).join(),
              subject: 'Статус додавання уроків: підтверджено',
              // text: `Вчитель ${teacherUserRecord.displayName} з школи "${school.name}" потребує підтвердження.`,
              html: renderTemplate('email-teacher-timeslot-approved', {
                school,
                teacher: teacherUserRecord,
                timeslot: {
                  ...newValue,
                  startTime: newValue.startTime.toDate(),
                  startTimeFormatted: DateTime.fromJSDate(newValue.startTime.toDate()).toLocaleString(DateTime.DATETIME_SHORT),
                },
                url: `${functions.config().general.host}/schedule`,
              })
            }),
          ),
        );

        // await sendEmail({
        //   bcc: teachers.map(t => t.email).filter(v => v).join(),
        //   subject: 'Урок підтверджено',
        //   // text: `Вчитель ${teacherUserRecord.displayName} з школи "${school.name}" потребує підтвердження.`,
        //   html: renderTemplate('email-teacher-timeslot-approved', {
        //     school,
        //     teacher: teacherUserRecord,
        //     url: `${functions.config().general.host}/teachers`,
        //   })
        // });
        console.log('Email to teachers sent');

        // const adminEmails = admins.map(userRecord => userRecord.email);

        // send email to teacher
      }

    }

    // const { uid } = context.params;
    // const userSnap = await firestore.collection('users').doc(context.params.uid).get();
    // const user = userSnap.data();

    // const teacherUserRecord = await admin.auth().getUser(uid);

    // const schoolSnap = await firestore.collection('schools').doc(teacher.schoolId).get();
    // const school = schoolSnap.data();

    // const adminSnaps = await firestore.collection('admins').get();

    // const admins = await Promise.all(
    //   adminSnaps.docs
    //     .map(doc => doc.id)
    //     .map(uid => admin.auth().getUser(uid))
    // );

    // const adminEmails = admins.map(userRecord => userRecord.email);

    // await sendEmail({
    //   bcc: adminEmails.filter(v => v).join(),
    //   subject: 'Новий вчитель потребує підтвердження',
    //   text: `Вчитель ${teacherUserRecord.displayName} з школи "${school.name}" потребує підтвердження.`,
    //   html: renderTemplate('email-teacher-needs-approve', {
    //     school,
    //     teacher: teacherUserRecord,
    //     url: `${functions.config().general.host}/teachers`,
    //   })
    // });
    // console.log('Email sent');
  });

const userCleanup = functions.auth.user().onDelete(async (user) => {
  const { uid } = user;
  await firestore.collection('teachers').doc(uid).delete();
  await firestore.collection('mentors').doc(uid).delete();
  await firestore.collection('admins').doc(uid).delete();
  await firestore.collection('users').doc(uid).delete();
});

export {
  emailTeacherApproved,
  emailTeacherNeedsApprove,
  timeslotUpdated,
  updateSchoolsTimeslotsCount,
  userCleanup,
};
