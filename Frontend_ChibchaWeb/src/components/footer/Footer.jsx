import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="continer">
        <footer className="py-3 my-4 ">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item ">
              <a href="#" className="nav-link px-2 text-light">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-light">
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-light">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-light">
                ¿Quiénes somos?
              </a>
            </li>
          </ul>
          <p className="text-center text-light">© 2023 NexGen Software Solutions</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
