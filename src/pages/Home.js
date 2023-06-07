import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import ExampleVideoEnhancement from '../components/ExampleVideoEnhancement';

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

      <ExampleVideoEnhancement
        exampleTitle='Example 1' 
        originalVideoUrl='https://drive.google.com/file/d/1iBzg7NJp2pQ1Y3CSLEdpqrS2-6R4vnXW/preview'
        originalVideoTitle='Original1'
        originalVideoQuality='360p'
        enhancedVideoUrl='https://drive.google.com/file/d/1iBzg7NJp2pQ1Y3CSLEdpqrS2-6R4vnXW/preview'
        enhancedVideoTitle='Enhanced1'
        enhancedVideoQuality='1080p'
      />

      <ExampleVideoEnhancement 
        exampleTitle='Example 2'
        originalVideoUrl='https://drive.google.com/file/d/1iBzg7NJp2pQ1Y3CSLEdpqrS2-6R4vnXW/preview'
        originalVideoTitle='Original2'
        originalVideoQuality='360p'
        enhancedVideoUrl='https://drive.google.com/file/d/1iBzg7NJp2pQ1Y3CSLEdpqrS2-6R4vnXW/preview'
        enhancedVideoTitle='Enhanced2'
        enhancedVideoQuality='1080p'
      />

    </main>
  )
}

export default Home;