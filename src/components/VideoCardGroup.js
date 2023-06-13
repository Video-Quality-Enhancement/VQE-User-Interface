import React from "react";
import VideoCard from "./VideoCard";

export default function VideoCardGroup(props) {

  const originalVideo = {
    videoUrl: props.originalVideoUrl,
    videoQuality: props.originalVideoQuality,
    videoType: "Original"
  };

  const enhancedVideo = {
    videoUrl: props.enhancedVideoUrl,
    videoQuality: props.enhancedVideoQuality,
    videoType: "Enhanced"
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className="flex-row bg-dark bg-gradient rounded shadow text-center">
        <div className="text-white p-2">
          <strong>{props.title}</strong>
        </div>
        <div className='d-inline-flex p-3 gap-3 flex-md-row flex-column shadow-lg bg-body-tertiary rounded shadow'>

          <VideoCard 
            videoUrl={originalVideo.videoUrl}
            videoQuality={originalVideo.videoQuality}
            videoType={originalVideo.videoType}
          />

          <VideoCard 
            videoUrl={enhancedVideo.videoUrl}
            videoQuality={enhancedVideo.videoQuality}
            videoType={enhancedVideo.videoType}
          />

        </div>
      </div>
    </div>
  );

}