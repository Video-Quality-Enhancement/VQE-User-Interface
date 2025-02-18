import React from "react";
// import { Card } from "react-bootstrap";

export default function VideoCard(props) {
  return (
    // <Card className="overflow-hidden m-3 shadow" style={{ width: "350px" }}>
    //   <iframe 
    //     src={props.videoUrl} 
    //     title={props.videoTitle} 
    //     height="200px"
    //     allow='autoplay'
    //     allowFullScreen
    //   >
    //   </iframe>
    //   <Card.Body>
    //     <Card.Title className="text-center position-relative">
    //       {props.videoType}
    //       <div className="position-absolute bg-dark text-white bottom-0 end-0 rounded px-2 shadow">
    //         {props.videoQuality}
    //       </div>
    //     </Card.Title>
    //   </Card.Body>
    // </Card>
    <div className="d-flex">
      <div className="card shadow">
        {
          props.videoUrl && props.videoUrl !== ""
          ? (<video 
              src={props.videoUrl} 
              width="350"
              height="200"
              className="card-img-top"
              controls>
              Video not supported
            </video>
          ): (
            <div 
              className="card-img-top d-flex align-items-center justify-content-center border-bottom" 
              style={{width: 350, height: 200}}
            >
              <h2>Video not available</h2>
            </div>
          )

        }
        

        <div className="card-body ">
          <h5 className="card-title text-center position-relative">
            {props.videoType}
            <div className="position-absolute bg-dark text-white bottom-0 end-0 rounded px-2 shadow">
              {props.videoQuality}
            </div>
          </h5>
        </div>
      </div>
    </div>
  );
}