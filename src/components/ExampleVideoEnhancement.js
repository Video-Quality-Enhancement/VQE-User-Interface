import React from "react";
import VideoCard from "./VideoCard";

export default function ExampleVideoEnhancement(props) {

  const originalVideo = {
    videoUrl: props.originalVideoUrl,
    videoTitle: props.originalVideoTitle,
    videoQuality: props.originalVideoQuality,
    videoType: "Original"
  };

  const enhancedVideo = {
    videoUrl: props.enhancedVideoUrl,
    videoTitle: props.enhancedVideoTitle,
    videoQuality: props.enhancedVideoQuality,
    videoType: "Enhanced"
  };

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className="flex-row bg-dark bg-gradient rounded shadow text-center">
        <div className="text-white p-2">
          <strong>{props.exampleTitle}</strong>
        </div>
        <div className='d-inline-flex flex-md-row flex-column shadow-lg bg-body-tertiary rounded shadow'>
          <div>
            <VideoCard 
              videoUrl={originalVideo.videoUrl}
              videoTitle={originalVideo.videoTitle}
              videoQuality={originalVideo.videoQuality}
              videoType={originalVideo.videoType}
            />
          </div>
          <div>
            <VideoCard 
              videoUrl={enhancedVideo.videoUrl}
              videoTitle={enhancedVideo.videoTitle}
              videoQuality={enhancedVideo.videoQuality}
              videoType={enhancedVideo.videoType}
            />
          </div>
        </div>
      </div>
    </div>
  );

}