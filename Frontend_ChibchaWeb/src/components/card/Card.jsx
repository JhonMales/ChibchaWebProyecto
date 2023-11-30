import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import "./Card.css";

const CardP = ({ title, imageSource, text }) => {
  return (
    <div className="card text-center bg-dark ">
      <img src={imageSource} alt="" className="imagen" />
      <div className="card-body text-light ">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary ">{text}</p>
      </div>
    </div>
  );
};
CardP.propTypes = {
  imageSource: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};
export default CardP;
