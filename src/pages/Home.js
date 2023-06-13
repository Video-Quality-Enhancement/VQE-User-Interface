import React from 'react'
import { Button } from 'react-bootstrap';
import VideoCardGroup from '../components/VideoCardGroup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserAuth } from '../context/AuthContext';


export default function Home() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  function handleEnhanceVideo() {
    if (user && user.uid) {
      navigate('/enhance-video');
    } else {
      toast.info('Please SignIn', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <main className="mb-5">

      <ToastContainer />

      <div className='d-flex flex-column gap-5'>

        <div className='d-inline-flex flex-column gap-3 mt-5 align-items-center'>
          <h1 className='display-1 text-white'>
            <strong>VQE.AI</strong>
          </h1>

          <p className='lead text-white text-center col col-lg-7 col-9'>
          Transforming Pixels into Perfection! Unleashing the true potential of videos with our cutting-edge enhancement technology, delivering stunning visual clarity and unparalleled viewing experience.
          </p>

          <Button variant="outline-light" className='' size="lg" onClick={handleEnhanceVideo}>
            <strong>Enhance Video</strong>
          </Button>
          
        </div>
        
        <VideoCardGroup
          title='Example 1' 
          originalVideoUrl='https://drive.google.com/uc?id=1h6uHTM1zRmtLw5g8X5iipUN0iB8T3BDk'
          originalVideoTitle='Original1'
          originalVideoQuality='360p'
          enhancedVideoUrl='https://drive.google.com/uc?id=1h6uHTM1zRmtLw5g8X5iipUN0iB8T3BDk'
          enhancedVideoTitle='Enhanced1'
          enhancedVideoQuality='1080p'
        />

        <VideoCardGroup 
          title='Example 2'
          originalVideoUrl='https://drive.google.com/uc?id=1h6uHTM1zRmtLw5g8X5iipUN0iB8T3BDk'
          originalVideoTitle='Original2'
          originalVideoQuality='360p'
          enhancedVideoUrl='https://drive.google.com/uc?id=1h6uHTM1zRmtLw5g8X5iipUN0iB8T3BDk'
          enhancedVideoTitle='Enhanced2'
          enhancedVideoQuality='1080p'
        />
      </div>

    </main>
  )
}