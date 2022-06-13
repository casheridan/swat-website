import React from "react";
import "./css/Spacer.css";

export default function Spacer(props) {
  const halfSpace = props.size / 2 || "5";
  const sizeType = props.type || "px";
  return (
    <div
      className="spacer"
      style={{
        paddingTop: `${halfSpace}${sizeType}`,
        paddingRight: "auto",
        paddingBottom: `${halfSpace}${sizeType}`,
        paddingLeft: "auto",
      }}
    />
  );
}
