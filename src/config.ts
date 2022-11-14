const config = {
  firebase: {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.FIREBASE_DATABASE_URL,
    projectId: import.meta.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.FIREBASE_APP_ID,
  },
  firebaseFunctionsRegion: import.meta.env.FIREBASE_FUNCTIONS_REGION,
  map: {
    key: import.meta.env.GOOGLE_MAPS_KEY,
  },
};

export default Object.freeze(config);
