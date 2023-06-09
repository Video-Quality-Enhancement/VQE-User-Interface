import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import VideoCardGroup from '../components/VideoCardGroup';

const Home = () => {
  return (
    <main className="mb-5">
      
      <Container>
        <Row className='justify-content-center'>
          <Col className='text-center mt-5 col-9'>
            <h1 className='display-1 text-white'>
              <strong>VQE.AI</strong>
            </h1>
            <p className='lead text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </Col>
        </Row>
      </Container>

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

    </main>
  )
}

export default Home;