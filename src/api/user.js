import axios from 'axios';


export async function getEnhanceVideos(token) {

  const url = `${process.env.REACT_APP_USER_VIDEO_API_BASE_URL}/api/user/videos/`;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.get(url, config);
  return response.data;

}


export async function getEnhanceVideo(token, requestId) {

  const url = `${process.env.REACT_APP_USER_VIDEO_API_BASE_URL}/api/user/videos/${requestId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.get(url, config);
  return response.data;

}


export async function enhanceVideo(token, videoUrl) {

  const url = `${process.env.REACT_APP_USER_VIDEO_API_BASE_URL}/api/user/videos/enhance`;
  const bodyParameters = {
    videoUrl: videoUrl,
    responseInterfaces: ["ui", "email"]
  };
  const config = {
    "Content-Type": "application/json",
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.post(url, bodyParameters, config);
  return response.data;

}


export async function uploadAndEnhanceVideo(token, file) {
  const url = `${process.env.REACT_APP_USER_VIDEO_API_BASE_URL}/api/user/videos/upload-and-enhance`;
    
  const formData = new FormData();
  formData.append("video", file);
  formData.append("responseInterfaces", "ui");
  formData.append("responseInterfaces", "email");
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  };

  const res = await axios.post(url, formData, config);
  console.log(res.data);
  return res.data;
}