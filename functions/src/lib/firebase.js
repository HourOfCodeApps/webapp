import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default admin;
