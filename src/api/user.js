import axios from 'axios';

export async function getUserVideos(token) {
  try {

    const url = `${process.env.USER_VIDEO_API_BASE_URL}/api/user/videos`;
    
    const bodyParameters = {};
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    const response = await axios.get(url, bodyParameters, config);
    // console.log(response);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}