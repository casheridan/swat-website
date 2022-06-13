import React, { useState } from "react";
import "./css/LoginModal.css";
import { auth } from "../firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  //   GithubAuthProvider,
} from "firebase/auth";
import TextField, { Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
// import { GoMarkGithub } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons/lib";

// function GithubSignIn() {
//   const provider = new GithubAuthProvider();
//   provider.addScope("repo");
//   signInWithPopup(auth, provider);
// }

function GoogleSignIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

function EmailSignIn(email, password) {
  signInWithEmailAndPassword(auth, email, password);
}

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="text-fields">
          <TextField label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </TextField>
          <TextField label="Password">
            <Input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
            />
          </TextField>
        </div>
        <div
          className="modal-btn"
          id="email-btn"
          onClick={() => {
            EmailSignIn(email, password);
          }}
        >
          Sign in
        </div>
        <IconContext.Provider
          value={{
            className: "react-icons",
            size: 25,
          }}
        >
          <div className="modal-btn" id="google-btn" onClick={GoogleSignIn}>
            <FcGoogle
              style={{
                marginRight: "auto",
                paddingLeft: "20px",
              }}
            />
            <p>Sign in with Google</p>
          </div>
          {/* <div className="modal-btn" id="github-btn" onClick={GithubSignIn}>
            <GoMarkGithub
              style={{
                marginRight: "auto",
                paddingLeft: "20px",
                color: "#fff",
              }}
            />
            <p>Sign in with Github</p>
          </div> */}
        </IconContext.Provider>
      </div>
    </div>
  );
}
