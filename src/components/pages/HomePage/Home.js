import React from "react";
import "./Home.css";
import Cover from "../../Cover";
import Spacer from "../../Spacer";
import YearlyGame from "../../YearlyGame";
import SocialSection from "../../SocialSection";
import DefaultComponent from "../../DefaultComponent";

export default function Home() {
  return (
    <>
      <Cover />
      <Spacer size="92" />
      <YearlyGame />
      <Spacer size="80" />
      <div className="socials-container">
        <SocialSection />
        <DefaultComponent />
      </div>
    </>
  );
}
