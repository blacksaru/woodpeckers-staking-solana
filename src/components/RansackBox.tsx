import React from "react";

export default function RansackBox() {
  return (
    <div className="main-box collection-box ransack">
      <div className="main-box-content">
        <h3 className="box-title">
          Ransack <span>This will only be available only while nesting.</span>
        </h3>
        <div className="select-mission">
          <h4>Select a mission</h4>
          <p>
            You need at least: <br />
            X1 woodpecker and X1 nest <br />
            To Start a mission
          </p>
          <button className="btn-action">ransack now</button>
        </div>
      </div>
    </div>
  );
}
