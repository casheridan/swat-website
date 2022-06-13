import React from "react";
import "./Join.css";
import Spacer from "../../Spacer";
import { Link } from "react-router-dom";
import Button from "@material/react-button";
import "@material/react-button/dist/button.css";
import studentImg from "../../images/2018-cowtown.jpg";
// import parentImg from "../../images/2018-cowtown.jpg";

export default function () {
  return (
    <>
      <Spacer size="5" type="vh" />
      <div className="join-banner">
        <h1>
          Become a Member
          <br />
          of S.W.A.T.
        </h1>
        <h3>S.W.A.T. needs a student like you!</h3>
        <p>Register for the 2023 season now.</p>
      </div>
      <Spacer size="10" />
      <div className="joining-container">
        <div className="content-container">
          <div className="content">
            <div className="img-container">
              <div className="img-block-container" id="students">
                <img src={studentImg} alt="" />
              </div>
            </div>
            <div className="inner-content block">
              <h2>New and Returning Students</h2>
              <p>
                All new and returning students must complete the registration
                process to ensure that we have your correct contact information.
                Once registration is complete you will need to attest to the
                team handbook and code of conduct. If you have any questions
                regarding the registration process please contact a mentor or...
              </p>
            </div>
            <Spacer size="10" type="px" />
            <div className="block">
              <Link to="/student-registration">
                <Button raised={true}>Register</Button>
              </Link>
            </div>
          </div>
          <div className="content">
            <div className="img-container">
              <div className="img-block-container" id="parents">
                <img src={studentImg} alt="" />
              </div>
            </div>
            <div className="inner-content block">
              <h2>Parents, we need you</h2>
              <p>
                Ratchet Rocker Robotics is more than robots. If your child joins
                our team, there’s a lot you can do to support your student and
                our team’s success. Parents, you can contribute your technical
                OR non-technical expertise to the team by helping the team with
                building field elements, signing up to feed our team during the
                build season, volunteering on overnight trips, volunteering at
                regional events, fundraising, or so much more. If you’re
                inspired, we hope you’ll join us!
              </p>
            </div>
            <Spacer size="10" type="px" />
            <div className="block">
              <Link to="/parent-committee">
                <Button raised={true}>Parent Committee</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
