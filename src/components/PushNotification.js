import React, { useState, useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../config/firebase";
import { Toast, ToastContainer } from 'react-bootstrap';


export default function PushNotification(props) {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState("");

  function requestNotificationPermission() {

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        
        if(localStorage.getItem('fcmToken') != null) {
          return;
        }

        getToken(messaging, { vapidKey: process.env.REACT_APP_VAPIDKEY }).then((currentToken) => {
          if (currentToken) {
  
            // TODO: Send the token to your server and update the UI if necessary
            console.log('currentToken', currentToken);
            localStorage.setItem('fcmToken', currentToken);
  
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  
  }
  
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    setNotification(payload.notification.body);
    props.setIsVideoEnhanced(true);
  });

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (notification !== "") {
      setShow(true);
    }
  }, [notification]); // * make sure u r sending a new notification every time (with request id)

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">VQE.AI</strong>
        </Toast.Header>
        <Toast.Body>{notification}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}