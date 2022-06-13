import React from "react";
import "./css/YoutubeSection.css";
import ytPic from "./images/swat-youtube.jpg";

export default function YoutubeSection() {
  return (
    <div>
      <div className="youtube-container">
        <a href="https://www.youtube.com/user/FRC1806">
          <img
            alt="SWAT Youtube Channel"
            src={ytPic}
            style={{ borderRadius: "50%" }}
            width="80px"
            height="80px"
          />
        </a>
        <a href="https://www.youtube.com/user/FRC1806">
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "22px",
              color: "black",
            }}
          >
            FRC1806
          </p>
        </a>
      </div>
    </div>
  );
}
