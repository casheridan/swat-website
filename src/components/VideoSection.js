import React from "react";
import "./css/VideoSection.css";

export default function VideoSection(props) {
  return (
    <div className="iframe-container">
      <iframe
        title="This years game"
        src={props.url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
