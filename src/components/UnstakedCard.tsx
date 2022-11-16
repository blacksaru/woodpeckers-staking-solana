/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CheckIcon } from "./svgIcons";

export default function UnstakedCard(props: {
  id: number;
  name?: string;
  image?: string;
  selected?: boolean;
  isNest?: boolean;
}) {
  const { id, name, image, selected, isNest } = props;
  return (
    <div className="nft-card unstaked-card">
      <div className="nft-id">#{id}</div>
      <div className="nft-image">
        <img
          src="https://img-cdn.magiceden.dev/rs:fill:250:250:0:0/plain/https://metadata.degods.com/g/3527-dead.png"
          alt=""
        />
      </div>
      {selected && (
        <div className="selected">
          <CheckIcon />
          <p>
            Ready for <br />
            staking
          </p>
        </div>
      )}
    </div>
  );
}
