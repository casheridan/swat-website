import React, { useState, useEffect } from "react";
import "./Awards.css";
import Banner from "../../Banner";
import Spacer from "../../Spacer";
import { bannersData } from "./Data.js";

export default function Awards() {
  const [banners, setBanners] = useState([]);
  let counter = 0;
  useEffect(() => {
    setBanners(bannersData);
  });
  return (
    <>
      <Spacer size="15" type="vh" />
      <h2
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "30px",
        }}
      >
        S.W.A.T. Awards
      </h2>
      <br />
      <h4
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "20px",
        }}
      >
        Banners
      </h4>
      <div className="banners">
        {banners.map((banner) => {
          counter = counter + 1;
          return (
            <Banner
              key={counter}
              bannerName={
                banner.date + " " + banner.location + " " + banner.type
              }
            />
          );
        })}
      </div>
    </>
  );
}
