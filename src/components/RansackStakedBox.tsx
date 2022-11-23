/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { WalletContextState } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { NFTType } from "../pages/staking";
import MissionItem from "./MissionItem";

export default function RansackStakedBox(props: {
  wallet: WalletContextState;
  isOverlay: boolean;
  setIsOverlay: Function;
  wpNfts: NFTType[] | undefined;
  nestNfts: NFTType[] | undefined;
  updatePage: Function;
}) {
  const { wallet, isOverlay, updatePage, setIsOverlay, nestNfts, wpNfts } =
    props;

  return (
    <div className="main-box collection-box ransack">
      <div className="main-box-content">
        <h3 className="box-title">
          Mission Ongoing{" "}
          <span>This will only be available only while nesting.</span>
        </h3>
        <div className="missions-box">
          {nestNfts &&
            nestNfts.map((item, key) => (
              <MissionItem
                key={key}
                updatePage={updatePage}
                wallet={wallet}
                nest={item}
                isEnd={key === 4}
                wpNfts={nestNfts}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
