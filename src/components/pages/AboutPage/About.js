import React from "react";
import "./About.css";
import stamp from "../../images/swat_stamp-black.png";

export default function About() {
  return (
    <>
      <h1 style={{ marginTop: "100px" }}>About Us</h1>
      <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        We are FIRST Robotics Competition Team 1806
      </h2>
      <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        S.W.A.T. stands for Smithville Warriors Advancing Technology
      </h2>
      <br />
      <h1>Mission Statement:</h1>
      <p
        style={{
          textAlign: "center",
          marginTop: "10px",
          padding: " 0 50px",
          fontSize: "20px",
        }}
      >
        Smithville Warriors Advancing Technology (S.W.A.T.) focuses on spreading
        the ideals of FIRST while promoting individual growth of team members.
        We have a desire to provide opportunities for students, parents, and
        community members to take advantage of the possibilities surrounding
        STEM education and the multitude of FIRST programs. We, first and
        foremost, wish to inspire a group of passionate students whose purpose
        is to produce a well-designed, quality-built, competitive robot.
        Furthermore, it is the goal of Team 1806 to incorporate fields outside
        of STEM including public communications and marketing in order to make
        FIRST more accessible to a wider array of students.
      </p>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <img src={stamp} alt="S.W.A.T. Stamp" height="225.75" width="225" />
      </div>
      <br />
      <br />
      <br />
      <footer>
        <p>
          Smithville High School Robotics | S.W.A.T. (Smithville Warriors
          Advancing Technology)
        </p>
      </footer>
    </>
  );
}
