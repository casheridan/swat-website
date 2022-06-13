import React from "react";
import "./css/SocialSection.css";
import YoutubeSection from "./YoutubeSection";

export default function SocialSection() {
  return (
    <>
      <div>
        <YoutubeSection />
        <div className="embeds" style={{ marginTop: "25px" }}>
          <div
            className="fb-page"
            data-href="https://www.facebook.com/swat1806/"
            data-tabs="timeline"
            data-width="250"
            data-height="650"
            data-small-header="true"
            data-adapt-container-width="false"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/swat1806/"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/swat1806/">S.W.A.T. Robotics</a>
            </blockquote>
          </div>
          <a
            className="twitter-timeline"
            data-width="250"
            data-height="650"
            href="https://twitter.com/frc1806?ref_src=twsrc%5Etfw"
          >
            Tweets by frc1806
          </a>
        </div>
      </div>
    </>
  );
}
