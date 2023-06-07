import React from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import GDriveUpload from "../components/GDriveUpload";

export default function Enhance() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    
    <main className="mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="m-3">
        <Container>
          
          <Row className="justify-content-center">
            <Form.Group as={Col} lg="5" md="6" controlId="validationCustom01" className="bg-secondary rounded-top z-1">

              <Form.Label className="mt-1 mb-0 text-black fs-5 fw-bold">
                Video Url
              </Form.Label>
              
              <Form.Control
                required
                type="text"
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
              <Button className="btn btn-dark m-2" type="submit">Submit form</Button>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg="5" md="6" className="d-flex justify-content-center">
              <span className="border rounded text-white m-3 p-2 py-1">
                <strong>OR</strong>
              </span>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg="5" md="6" className="d-flex justify-content-center">
              <GDriveUpload />
            </Col>
          </Row>

        </Container>
      </Form>
    </main>

  );

}