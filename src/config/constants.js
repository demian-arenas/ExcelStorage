import * as firebase from "firebase";

const config = {
  apiKey: 'AIzaSyBA-PjmUd7PT8aagBNhe_J2sru1Q_FclP4',
  authDomain: "excelstorage-55567.firebaseapp.com",
  databaseURL: "https://excelstorage-55567.firebaseio.com/",
  storageBucket: "gs://excelstorage-55567.appspot.com/"
};

firebase.initializeApp(config)

export const firebaseAuth = firebase.auth
export const ref = firebase.database().ref()
export const docsRef = firebase.database()
export const firebaseStorage = firebase.storage()
