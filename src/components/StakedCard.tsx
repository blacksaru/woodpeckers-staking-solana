/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { CheckIcon } from "./svgIcons";
import EndTimeCountdown from "./EndTimeCountdown";
import { WalletContextState } from "@solana/wallet-adapter-react";

export default function StakedCard(props: {
  wallet: WalletContextState;
  id: string;
  handleSelect: Function;
  lockTime: number;
  lockLength: number;
  mint: string;
  uri?: string;
  name?: string;
  image?: string;
  selected?: boolean;
  isNest?: boolean;
}) {
  const {
    wallet,
    id,
    name,
    image,
    selected,
    lockTime,
    isNest,
    handleSelect,
    mint,
    lockLength,
  } = props;
  return (
    <div
      className="staked-card"
      style={{ pointerEvents: lockLength === 0 ? "all" : "none" }}
    >
      <div className="staked-overlay">
        <div className="mark">ended</div>
        <img src="/img/genesis-hover.svg" alt="" />
        <button className="overlay-collect">Collect Rewards</button>
      </div>
      <div className="nft-card" onClick={() => handleSelect(mint)}>
        <div className="nft-id">#{id}</div>
        <div className="staked-label">
          {lockLength === 0 ? "Unlocked" : "Locked"}
        </div>
        <div className="nft-image">
          {image === "" ? (
            <div className="empty-image"></div>
          ) : (
            <img src={image} alt="" />
          )}
        </div>
        <div className="staked-content">
          <div className="content-head">
            <h3>0.5 $Blaze</h3>
            <span className="reward-mark">Daily</span>
          </div>
          <div className="box">
            {lockLength === 0 ? (
              <h4>No Timer</h4>
            ) : lockTime * 1000 < new Date().getTime() ? (
              <h4>End Ended</h4>
            ) : (
              <h4>Time Left</h4>
            )}
            <EndTimeCountdown
              endTime={lockTime * 1000}
              duration={lockLength}
              endAction={() => console.log("ended!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
