import React from "react";
import logo from "./../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-success bg-gradient" role="contentinfo">
      <div className="footer-container">
        <div className="text-center">
          <img
            className="footer-logo"
            src={logo}
            alt="Logo AgroTherapy"
            width="200"
            height="60"
          />
          <p className="footer-text text-white">Cultivando um futuro mais inclusivo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
