import axios from 'axios';
import { getPlayableVideoUrl } from './GCS';


export async function getAllVideoEnhance(idToken, accessToken) {

  const url = `${process.env.REACT_APP_VIDEO_ENHANCE_API_BASE_URL}/api/video-enhance/`;
  const config = {
    headers: { Authorization: `Bearer ${idToken}` }
  };

  const response = await axios.get(url, config);
  const videoEnhances = response.data;
  if (videoEnhances == null || videoEnhances === undefined || videoEnhances.length === 0) {
    return [];
  }
  for (let i = 0; i < videoEnhances.length; i++) {
    videoEnhances[i].videoUrl = await getPlayableVideoUrl(accessToken, videoEnhances[i].videoUrl, videoEnhances[i].requestId);
    videoEnhances[i].enhancedVideoUrl = await getPlayableVideoUrl(accessToken, videoEnhances[i].enhancedVideoUrl, videoEnhances[i].requestId);
  }
  return videoEnhances;

}


export async function getVideoEnhance(idToken, accessToken, requestId) {

  const url = `${process.env.REACT_APP_VIDEO_ENHANCE_API_BASE_URL}/api/video-enhance/${requestId}`;
  const config = {
    headers: { Authorization: `Bearer ${idToken}` }
  };

  const response = await axios.get(url, config);
  const videoEnhance = response.data;
  videoEnhance.videoUrl = await getPlayableVideoUrl(accessToken, videoEnhance.videoUrl, requestId);
  videoEnhance.enhancedVideoUrl = await getPlayableVideoUrl(accessToken, videoEnhance.enhancedVideoUrl, requestId);
  return videoEnhance;

}


export async function enhanceVideo(token, videoUrl) {

  const url = `${process.env.REACT_APP_VIDEO_ENHANCE_API_BASE_URL}/api/video-enhance/`;
  const bodyParameters = {
    videoUrl: videoUrl,
  };
  const config = {
    "Content-Type": "application/json",
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.post(url, bodyParameters, config);
  return response.data;

}


export async function uploadAndEnhanceVideo(token, file) {
  const url = `${process.env.REACT_APP_VIDEO_ENHANCE_API_BASE_URL}/api/video-enhance/upload`;
    
  const formData = new FormData();
  formData.append("video", file);
  
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