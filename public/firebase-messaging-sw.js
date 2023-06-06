if ('function' === typeof importScripts) {

  // Scripts for firebase and firebase messaging
  /* eslint-env worker */
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

  // Initialize the Firebase app in the service worker by passing the generated config
  var firebaseConfig = {
    "apiKey": "AIzaSyAf4QDi4abOvdpu99GfZyersYMqynTpDFs",
    "authDomain": "vqe-user.firebaseapp.com",
    "projectId": "vqe-user",
    "storageBucket": "vqe-user.appspot.com",
    "messagingSenderId": "952924951218",
    "appId": "1:952924951218:web:2fb0f5267db8165be3afab",
    "measurementId": "G-3C5R9N863B"
  };

  // eslint-disable-next-line no-undef
  firebase.initializeApp(firebaseConfig);

  // eslint-disable-next-line no-undef
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    console.log("omggggg")

    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //   body: payload.notification.body,
    // };

    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });

}