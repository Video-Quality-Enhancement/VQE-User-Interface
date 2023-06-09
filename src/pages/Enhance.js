import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { UserAuth } from '../context/AuthContext';
import { getEnhanceVideos, getEnhanceVideo, enhanceVideo, uploadAndEnhanceVideo } from "../api/user";
import { ToastContainer, toast } from 'react-toastify';


export default function Enhance(props) {

  const [validatedVideoUrl, setValidatedVideoUrl] = useState(false);
  const [validatedVideoUpload, setValidatedVideoUpload] = useState(false);
  const [file, setFile] = useState();
  const [pendingVideoEnhance, setPendingVideoEnhance] = useState(null);
  const { user } = UserAuth();

  if (pendingVideoEnhance != null && pendingVideoEnhance.status === "PENDING") {
    user.getIdToken().then((token) => {
      getEnhanceVideos(token).then((response) => {
        if (response == null) {
          return;
        }
        const pendingVideo = response.find((video) => video.status === "PENDING");
        if (pendingVideo != null && pendingVideo.requestId !== pendingVideoEnhance.requestId) {
          setPendingVideoEnhance(pendingVideo);
          props.setIsVideoEnhanced(false);
        } else if (pendingVideo == null) {
          setPendingVideoEnhance(null);
          props.setIsVideoEnhanced(true);
        }
      })
    });
  }


  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleVideoUrlSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidatedVideoUrl(true);
    const videoUrl = event.target.elements[0].value;
    if (!videoUrl) {
      console.log("no video url");
      return;
    }
    
    try {

      const token = await user.getIdToken();
      const response = await enhanceVideo(token, videoUrl);
      setPendingVideoEnhance(response);
      props.setIsVideoEnhanced(false);
      toast.success('Video Url Uploaded Successfully', {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch(error) {
      console.log(error);
      toast.error('Error Uploading Video Url', {
        position: toast.POSITION.TOP_RIGHT
      });
    } finally {
      event.target.reset();
      setValidatedVideoUrl(false);
    }

  };

  const handleVideoUploadSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidatedVideoUpload(true);
    if(!file) {
      console.log("no file");
      return;
    }

    try {

      const token = await user.getIdToken();
      const response = await uploadAndEnhanceVideo(token, file);
      setPendingVideoEnhance(response);
      props.setIsVideoEnhanced(false);
      toast.success('Video Uploaded Successfully', {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch(error) {
      console.log(error);
      toast.error('Error Uploading Video', {
        position: toast.POSITION.TOP_RIGHT
      });
    } finally {
      event.target.reset();
      setValidatedVideoUpload(false);
    }

  };

  useEffect(() => {
    async function getPendingVideoEnhance() {
      const token = await user.getIdToken();
      const response = await getEnhanceVideo(token, pendingVideoEnhance.requestId);
      setPendingVideoEnhance(response);
    }

    if (props.isVideoEnhanced === true && pendingVideoEnhance != null && pendingVideoEnhance.status === "PENDING") {
      getPendingVideoEnhance();
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isVideoEnhanced]);

  useEffect(() => {
    async function getPendingVideoEnhance() {
      const token = await user.getIdToken();
      const response = await getEnhanceVideos(token);
      if (response == null) {
        return;
      }
      const pendingVideo = response.find((video) => video.status === "PENDING");
      if (pendingVideo != null) {
        setPendingVideoEnhance(pendingVideo);
        props.setIsVideoEnhanced(false);
      }
    }

    getPendingVideoEnhance();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <main className="mt-5">
      <ToastContainer />
      { pendingVideoEnhance == null && props.isVideoEnhanced === true &&
        <Container>
          <Form noValidate validated={validatedVideoUrl} onSubmit={handleVideoUrlSubmit} className="m-3">
            
            <Row className="justify-content-center">
              <Form.Group as={Col} lg="5" md="6" controlId="validationCustom01" className="bg-secondary rounded-top z-1">

                <Form.Label className="mt-1 mb-0 text-black fs-5 fw-bold">
                  Video Url
                </Form.Label>
                
                <Form.Control
                  required
                  type="url"
                  placeholder="https://example.com/videos/video.mp4"
                />

                <Form.Control.Feedback>
                  Looks good!
                </Form.Control.Feedback>

                <Form.Control.Feedback type="invalid">
                  Please provide a valid Video Url.
                </Form.Control.Feedback>

              </Form.Group>
            </Row>
            
            <Row className="justify-content-center">
              <Col lg="5" md="6" className="d-flex justify-content-center bg-secondary rounded-bottom">
                <Button className="btn btn-dark m-2" type="submit">Enhance</Button>
              </Col>
            </Row>

          </Form>

          <Row className="justify-content-center">
            <Col lg="5" md="6" className="d-flex justify-content-center">
              <span className="border rounded text-white m-3 p-2 py-1">
                <strong>OR</strong>
              </span>
            </Col>
          </Row>

          <Form noValidate validated={validatedVideoUpload} onSubmit={handleVideoUploadSubmit} className="m-3">

            <Row className="justify-content-center">
              <Col lg="5" md="6" className="bg-secondary rounded-top">
                
                <Form.Label className="mt-1 mb-0 text-black fs-5 fw-bold">
                  Video Upload
                </Form.Label>
                
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg="5" md="6" className="d-flex justify-content-center bg-secondary">
                
                <input
                  className="form-control"
                  required
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                />
                
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg="5" md="6" className="d-flex justify-content-center bg-secondary rounded-bottom">
                <Button className="btn btn-dark m-2" type="submit">Enhance</Button>
              </Col>
            </Row>

          </Form>
        </Container>
      }
      {
        pendingVideoEnhance != null && pendingVideoEnhance.status === "PENDING" &&
        <div>

          <div className="d-flex justify-content-center">
            <video width="350" height="200" controls>
              <source src={pendingVideoEnhance.videoUrl} type="video/mp4" />
            </video>
          </div>

          <div className="d-flex justify-content-center text-white h4">
            Enhancing Video...
          </div>

        </div>
        
      } 
    </main>

  );

}