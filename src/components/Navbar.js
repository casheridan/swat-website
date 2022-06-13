import React, { useRef, useState, useEffect } from "react";
import "./css/Navbar.css";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "./images/swat-logo.png";
import { Link } from "react-router-dom";
import {
  MdOutlineMenu,
  MdOutlineClose,
  MdFolderShared,
  MdLogout,
  MdLogin,
} from "react-icons/md";
import { IconContext } from "react-icons/lib";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const sidebar = useRef(null);
  let pancake = null;
  const [width, setWidth] = useState("0px");
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalVisible, setModal] = useState(false);

  // Allows opening of the sidebar with the pancakes and
  // closes the sidebar if focus is lost
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setModal(false);
      } else {
        setLoggedIn(false);
      }
    });
    if (pancake === null) pancake = document.getElementById("pancake");
    const listener = function (e) {
      if (pancake && pancake.contains(e.target)) {
        width === "0px" ? setWidth("250px") : setWidth("0px");
      } else if (sidebar.current && sidebar.current.contains(e.target)) {
      } else {
        setWidth("0px");
      }
    };
    document.addEventListener("click", listener);
    return () => {
      // This function gets called when the "effect wears off"
      // which means we need to unregister the listener
      document.removeEventListener("click", listener);
    };
  });

  const showModal = () => {
    setModal(!modalVisible);
  };

  const signingOut = () => {
    signOut(auth);
  };

  const closeNav = () => {
    setWidth("0px");
  };

  return (
    <>
      <IconContext.Provider
        value={{
          className: "react-icons",
          color: "#fff",
          size: 30,
        }}
      >
        {/* Fixed Navbar */}
        <div className="fixedbar">
          <MdOutlineMenu
            style={{ cursor: "pointer", marginLeft: "20px" }}
            id="pancake"
          />
          <Link to="/" className="logo-link">
            <img src={logo} className="logo" alt="S.W.A.T. Logo" />
          </Link>
          <div className="right-nav">
            <div
              className={loggedIn ? "login_pic-nav hidden" : "login_pic-nav"}
              id="login_pic-nav"
              onClick={showModal}
            >
              <MdLogin />
            </div>
            <Link
              to="/user-page"
              className={loggedIn ? "navbar-user" : "navbar-user hidden"}
              id="navbar-user"
            >
              <MdFolderShared />
            </Link>
            <div
              className={loggedIn ? "navbar-user" : "navbar-user hidden"}
              id="btnLogOut"
              onClick={signingOut}
            >
              <MdLogout />
            </div>
          </div>
        </div>
        {/* Login Modal */}
        <div className={modalVisible ? "modal" : "modal hidden"}>
          <LoginModal />
          <div className="modal-background" onClick={showModal} />
        </div>
        {/* Side Navbar */}
        <div
          className="sidenav"
          style={{ width: width }}
          ref={sidebar}
          tabIndex="-1"
        >
          <div className="closebtn">
            <MdOutlineClose color="#808080" onClick={closeNav} />
          </div>
          <Link to="/" onClick={closeNav}>
            Home
          </Link>
          <Link to="/awards" onClick={closeNav}>
            Awards
          </Link>
          <Link to="/history" onClick={closeNav}>
            History
          </Link>
          <Link to="/sponsors" onClick={closeNav}>
            Sponsors
          </Link>
          <Link to="/blog" onClick={closeNav}>
            Blog
          </Link>
          <Link to="/join" onClick={closeNav}>
            Join
          </Link>
          <Link
            to="/about-us"
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            onClick={closeNav}
          >
            About Us
          </Link>
        </div>
      </IconContext.Provider>
    </>
  );
}
