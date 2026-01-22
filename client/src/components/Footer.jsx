import React from "react";
import logo from "../layout/img/transparent_logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} />
        <span>All rights reserved, copyright © for Vexa</span>
      </div>
      <div className="social-media">
        <ul>
          <a href="#" target="_blank">
            <li>
              <i className="fa-brands fa-github"></i>
            </li>
          </a>
          <a href="#" target="_blank">
            <li>
              <i className="fa-brands fa-linkedin"></i>
            </li>
          </a>
          <a href="#" target="_blank">
            <li>
              <i className="fa-brands fa-square-upwork"></i>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
