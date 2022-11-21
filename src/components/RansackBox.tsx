import React, { useState } from "react";
import { BoxBackIcon } from "./svgIcons";

export default function RansackBox(props: {
  isOverlay: boolean;
  setIsOverlay: Function;
}) {
  const { isOverlay, setIsOverlay } = props;
  const [isReady, setIsReady] = useState(false);
  const [isMissionSelect, setIsMissionSelect] = useState(false);
  return (
    <div
      className="main-box collection-box ransack"
      style={{ zIndex: isOverlay && isReady ? 10 : 2 }}
    >
      <div
        className="main-box-content"
        style={{
          minHeight: isOverlay && isReady ? 320 : 2,
          background:
            isOverlay && isReady
              ? "#1e1e1e"
              : "linear-gradient(92.79deg, #373737 0%, #2b2b2b 100%)",
        }}
      >
        <h3 className="box-title">
          Ransack <span>This will only be available only while nesting.</span>
        </h3>
        {!isMissionSelect && (
          <div className="select-mission">
            <h4>Select a mission</h4>
            <p>
              You need at least: <br />
              X1 woodpecker and X1 nest <br />
              To Start a mission
            </p>
            <button
              className="btn-action"
              onClick={() => setIsMissionSelect(true)}
            >
              ransack now
            </button>
          </div>
        )}
        {isMissionSelect && (
          <div className="mission-box">
            <button
              className="back-btn box-icon-button"
              onClick={() => setIsMissionSelect(false)}
            >
              <BoxBackIcon />
            </button>
            <div className="mission-item">
              <h5>Intermediate</h5>
              <h4>Birdcamp</h4>
              <button className="btn-action">50 $Balze</button>
            </div>
            <div className="mission-item">
              <h5>Normal</h5>
              <h4>Downtown</h4>
              <button className="btn-action">250 $Balze</button>
            </div>
            <div className="mission-item">
              <h5>Hard</h5>
              <h4>Hunted Pier</h4>
              <button className="btn-action">500 $Balze</button>
            </div>
            <div className="mission-item">
              <h5>Impossible</h5>
              <h4>Sewer</h4>
              <button className="btn-action">1000 $Balze</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
