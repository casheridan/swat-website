import React from "react";
import "./css/Banner.css";
import firstLogo from "./images/first_icon.svg";

export default function Banner(props) {
  return (
    <div className="banner">
      <img alt="FIRST Logo" src={firstLogo} />
      <div className="award-name">
        <span>Winner</span>
      </div>
      <div className="award-event">
        <span>{props.bannerName}</span>
      </div>
    </div>
  );
}
