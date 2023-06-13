import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getEnhanceVideos } from '../api/user';
import VideoCardGroup from '../components/VideoCardGroup';


const EnhancedVideos = (props) => {
  const { user } = UserAuth();
  const [videos, setVideos] = React.useState([]);

  async function getVideos() {
    try {

      const token = await user.getIdToken();
      const response = await getEnhanceVideos(token);
      if (response == null || response === undefined || response.length === 0) {
        return;
      }
      console.log(response);
      if(response.length === videos.length) {
        return;
      }

      const completedVideos = response.filter((video) => video.status !== 'PENDING');
      console.log(completedVideos);
      const temp = completedVideos.map((video) => {

        return (
          <VideoCardGroup
            key={video.requestId}
            title={video.status + " - " + video.requestId}
            originalVideoUrl={video.videoUrl}
            originalVideoTitle="Original"
            originalVideoQuality={video.videoQuality}
            enhancedVideoUrl={video.enhancedVideoUrl}
            enhancedVideoTitle="Enhanced"
            enhancedVideoQuality={video.enhancedVideoQuality}
          />
        )
      });
      
      setVideos(temp);

    } catch(error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.isVideoEnhanced === true) {
      getVideos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isVideoEnhanced]);


  return (
    <main className='my-auto py-5'>
      <div className='d-flex flex-column gap-5'>
        {videos}
      </div>
    </main>
  );
};

export default EnhancedVideos;