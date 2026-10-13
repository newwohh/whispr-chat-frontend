import React from "react";
import "../../styles/Background/Background.css";

function Background() {
  return (
    <div className="modern-background" aria-hidden="true">
      <div className="glow-orb-primary" />
      <div className="grid-overlay" />
    </div>
  );
}

export default React.memo(Background);
