import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faFacebook, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="w-full bg-dark text-center text-white mt-auto">
      <div className="container p-4 pb-0">
        
        <section className="mb-4">
          
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FontAwesomeIcon icon={faFacebook} /></a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FontAwesomeIcon icon={faTwitter} /></a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FontAwesomeIcon icon={faGoogle} /></a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FontAwesomeIcon icon={faInstagram} /></a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FontAwesomeIcon icon={faLinkedin} /></a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FontAwesomeIcon icon={faGithub} /></a>
        </section>

      </div>

      <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2023 Copyright:&nbsp;
        <a className="text-white" href="/">
          VQE.AI
        </a>
      </div>

    </footer>
  );
};