// Import Firebase/GCIP dependencies. These are installed on npm install.
import firebase from 'firebase/app';
import 'firebase/auth';

export const init = (key, sender, app, projectId) => {
  const config = {
    projectId,
    apiKey: key,
    authDomain: `${projectId}.firebaseapp.com`,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: sender,
    appId: app,
  };
  firebase.initializeApp(config);

  return firebase;
};
