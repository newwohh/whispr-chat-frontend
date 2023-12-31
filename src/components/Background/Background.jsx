import React from "react";
import "../../styles/Background/Background.css";

function Background() {
  return (
    <div style={{ height: "0vh" }}>
      <div className="ripple-background">
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </div>
  );
}

export default Background;
