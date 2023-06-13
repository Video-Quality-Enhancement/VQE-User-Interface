import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getEnhanceVideo } from '../api/user';
import VideoCardGroup from '../components/VideoCardGroup';
import { useParams } from 'react-router-dom';

export default function EnhancedVideo() {
  const { user } = UserAuth();
  const [video, setVideo] = React.useState([]);
  const params = useParams();

  async function getVideo() {
    try {

      const token = await user.getIdToken();
      const response = await getEnhanceVideo(token, params.requestId);
      if (response == null || response === undefined) {
        return;
      }
      console.log(response);
      setVideo(response);

    } catch(error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getVideo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='d-flex flex-grow-1 my-5 align-items-center justify-content-center'>
      <VideoCardGroup
        key={video.requestId}
        title={video.requestId}
        originalVideoUrl={video.videoUrl}
        originalVideoTitle="Original"
        originalVideoQuality={video.videoQuality}
        enhancedVideoUrl={video.enhancedVideoUrl}
        enhancedVideoTitle="Enhanced"
        enhancedVideoQuality={video.enhancedVideoQuality}
      />
    </main>
  );
}