import * as functions from 'firebase-functions';

import admin from '../lib/firebase';

const getUsers = functions.https.onCall(async ({ nextPageToken }, context) => {
  // TODO add context claim isAdmin checking
  const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

  const users = listUsersResult.users.map(userRecord => userRecord.toJSON());

  return users;
});

export default getUsers;
