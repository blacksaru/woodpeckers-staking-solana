/* eslint-disable @next/next/no-img-element */
import { WalletContextState } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { EPOCH } from "../contexts/type";
import { getNetworkTime } from "../contexts/utils";
import { NFTType } from "../pages/staking";
import RansackEndTimeCountdown from "./RansackEndTimeCountdown";

export default function MissionItem(props: {
  wallet: WalletContextState;
  nest: NFTType | undefined;
  wpNfts: NFTType[];
  updatePage: Function;
  isEnd: boolean;
}) {
  const { nest, wpNfts, isEnd, updatePage } = props;
  const [now, setNow] = useState(Math.floor(new Date().getTime() / 1000));

  const getNowTime = async () => {
    const now = (await getNetworkTime()) as number;
    console.log(now);
    setNow(now);
  };
  useEffect(() => {
    getNowTime();
  }, [props.nest]);

  return (
    <div className={`one-mission ${isEnd ? "ended" : ""}`}>
      {nest && (
        <>
          <div className="content">
            <div className="simple-nft-card">
              <div className="id">#{nest.id}</div>
              <div className="label">multiplier</div>
              <img src={nest.image} alt="" />
            </div>
            <div className="detail">
              <div className="label">staked</div>
              <h4>Intermediate</h4>
              <h3>Birdcamp</h3>
              <div className="title-box">
                <div className="title-item">
                  <h5>Woodpeckers</h5>
                  <span>{wpNfts.length}</span>
                </div>
                <div className="title-item">
                  <h5>Staked</h5>
                  <span>10 Days</span>
                </div>
                <div className="title-item">
                  <h5>$Blaze x day</h5>
                  <span>5 $BLAZE</span>
                </div>
              </div>
            </div>
          </div>
          {!isEnd && (
            <RansackEndTimeCountdown
              endAction={updatePage}
              duration={(nest.stakedTime - nest.lockTime) / EPOCH}
              endTime={new Date(nest.lockTime * 1000)}
            />
          )}
          {isEnd && (
            <div className="ransack-time-ended">
              <p>Time Ended</p>
              <button className="">claim rewards</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
