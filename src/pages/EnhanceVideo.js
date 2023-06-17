import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { UserAuth } from '../context/AuthContext';
import { getAllVideoEnhance, getVideoEnhance, enhanceVideo, uploadAndEnhanceVideo } from "../api/VideoEnhance";
import { ToastContainer, toast } from 'react-toastify';


export default function EnhanceVideo(props) {

  const [validatedVideoUrl, setValidatedVideoUrl] = useState(false);
  const [validatedVideoUpload, setValidatedVideoUpload] = useState(false);
  const [file, setFile] = useState();
  const [pendingVideoEnhance, setPendingVideoEnhance] = useState(null);
  const { user } = UserAuth();

  
  useEffect(() => {

    async function loadVideos() {
      const idToken = await user.getIdToken();
      const accessToken = await user.accessToken;
      const response = await getAllVideoEnhance(idToken, accessToken);
      if (response == null) {
        return;
      }
      const pendingVideo = response.find((video) => video.status === "PENDING");
      if (pendingVideo !== undefined && pendingVideo !== null) {
        setPendingVideoEnhance(pendingVideo);
        props.setIsVideoEnhanced(false);
      } else {
        setPendingVideoEnhance(null);
        props.setIsVideoEnhanced(true);
      }
    }

    loadVideos();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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

    if(!file.type.includes("video")){
      toast.error('Only Video File is supported', {
        position: toast.POSITION.TOP_RIGHT
      });
      event.target.reset();
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
      const idToken = await user.getIdToken();
      const accessToken = await user.accessToken;
      const response = await getVideoEnhance(idToken, accessToken, pendingVideoEnhance.requestId);
      setPendingVideoEnhance(response);
    }

    //props.isVideoEnhanced === true && 
    if (pendingVideoEnhance != null && pendingVideoEnhance.status === "PENDING") {
      getPendingVideoEnhance();
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isVideoEnhanced]);

  // useEffect(() => {
  //   async function getPendingVideoEnhance() {
  //     const token = await user.getIdToken();
  //     const response = await getAllVideoEnhance(token);
  //     if (response == null) {
  //       return;
  //     }
  //     const pendingVideo = response.find((video) => video.status === "PENDING");
  //     if (pendingVideo != null) {
  //       setPendingVideoEnhance(pendingVideo);
  //       props.setIsVideoEnhanced(false);
  //     }
  //   }

  //   getPendingVideoEnhance();
  
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    
    <main className="d-flex flex-grow-1 my-5 align-items-center justify-content-center">
      <ToastContainer />
      { pendingVideoEnhance == null
        ?(
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
        ):(
          // pendingVideoEnhance != null && pendingVideoEnhance.status === "PENDING" &&
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
        )
      }  
    </main>

  );

}