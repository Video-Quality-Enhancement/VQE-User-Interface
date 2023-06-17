import axios from 'axios';

export async function upsertUser(idToken) {

  const url = `${process.env.REACT_APP_USER_API_BASE_URL}/api/user/`;
  const bodyParameters = {};
  const config = {
    "Content-Type": "application/json",
    headers: { Authorization: `Bearer ${idToken}` }
  };

  const response = await axios.put(url, bodyParameters, config);
  return response.data;

}


export async function addFCMtoken(idToken, fcmToken) {

  const url = `${process.env.REACT_APP_USER_API_BASE_URL}/api/user/fcmTokens`;
  const bodyParameters = {
    "FCMtoken": fcmToken
  };
  const config = {
    "Content-Type": "application/json",
    headers: { Authorization: `Bearer ${idToken}` }
  };

  const response = await axios.put(url, bodyParameters, config);
  return response.data;

}