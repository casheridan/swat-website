import React from "react";
import "./css/Cover.css";
// Change this to update the front cover photo
import coverImage from "./images/slideshow/2022-gkc-regional.jpg";

export default function Cover() {
  return (
    <>
      <div className="cover-container">
        <div className="cover-background">
          <img alt="" src={coverImage} />
          <div className="cover-overlay" />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <div className="cont-row">
              <div className="content-table">
                {/* Change these to update the main cover text */}
                <div className="content-block">
                  <h2>
                    2022 FIRST Robotics
                    <br />
                    Greater Kansas City Regional
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
