import React, { useRef, useLayoutEffect } from "react";
import "./css/YearlyGame.css";
import gameImage from "./images/CHARGED_UP_Logo_Horiz_RGB_FullColor.png";
import VideoSection from "./VideoSection";

export default function YearlyGame() {
  const domRef = useRef();
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) domRef.current.classList.add("fadeIn");
        });
      },
      { rootMargin: "0px 0px -175px 0px" }
    );
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  });
  return (
    <>
      <div className="game-section">
        <h1 style={{ marginBottom: "30px" }}>This years Game...</h1>
        <a
          target="_new"
          href="https://www.firstinspires.org/robotics/frc/game-and-season"
        >
          <img alt="" ref={domRef} src={gameImage} className="game-img" />
        </a>
      </div>
      <VideoSection url="http://www.youtube.com/embed/LgniEjI9cCM" />
    </>
  );
}
