/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import MainBox from "../components/MainBox";
import UnstakedCard from "../components/UnstakedCard";
import { getNftMetaData, solConnection } from "../contexts/utils";
import { CREATOR_ADDRESS_BLAZIN, CREATOR_ADDRESS_NEST } from "../config";
import { PublicKey } from "@solana/web3.js";

export interface NFTType {
  mint: string;
  id: number;
  image: string;
  name: string;
  tier: string;
  staked: boolean;
  isMulti: boolean;
}

const StakingPage: NextPage = () => {
  const router = useRouter();
  const wallet = useWallet();
  const [foxes, setFoxes] = useState<NFTType[]>();

  const getWalletNfts = async () => {
    if (wallet.publicKey === null) {
      setFoxes([]);
      return;
    }
    let nfts: NFTType[] = [];
    const nftList = await getParsedNftAccountsByOwner({
      publicAddress: wallet.publicKey.toBase58(),
      connection: solConnection,
    });
    console.log(nftList, "==> nft list");
  };

  useEffect(() => {
    getWalletNfts();
  }, [wallet.publicKey, wallet.connected]);

  return (
    <main className="pt-220">
      <div className="container">
        <div className="top-value-banner">
          <MainBox>
            <div className="total-values">
              <p>Supply</p>
              <h2>5555</h2>
            </div>
          </MainBox>
          <MainBox>
            <div className="total-values">
              <p>Total Staked</p>
              <h2>44.456%</h2>
            </div>
          </MainBox>
          <MainBox>
            <div className="total-values">
              <p>Rewards Distributed</p>
              <h2 style={{ fontWeight: 400 }}>
                <span>398,876.00 </span>$Blaze
              </h2>
            </div>
          </MainBox>
        </div>

        <div className="top-value-banner-two">
          <h1>Your a rewards</h1>
          <button className="collect-rewards">collect rewards</button>
          <div className="two-content">
            <MainBox>
              <div className="total-values">
                <p>Live Rewards</p>
                <h2 style={{ fontWeight: 400 }}>
                  <span>0 </span>$Blaze
                </h2>
              </div>
            </MainBox>
            <MainBox>
              <div className="total-values">
                <p>Accumulated Rewards</p>
                <h2 style={{ fontWeight: 400 }}>
                  <span>+300.001 </span>$Blaze
                </h2>
              </div>
            </MainBox>
          </div>
        </div>

        <div className={`main-box collection-box`}>
          <div className="main-box-content">
            <h3>Blazin Woodpeckers Genesis Collections</h3>
            <div className="action-buttons">
              <button className="btn-action">stake</button>
              <button className="btn-action">stake all</button>
            </div>
            <div className="nft-gallery">
              <UnstakedCard id={1234} />
              <UnstakedCard id={1234} />
              <UnstakedCard id={1234} />
              <UnstakedCard id={1234} />
            </div>
          </div>
        </div>

        <div className={`main-box collection-box`}>
          <div className="main-box-content">
            <h3>Nest Collections</h3>
            <div className="action-buttons">
              <button className="btn-action">stake</button>
              <button className="btn-action">stake all</button>
            </div>
            <div className="nft-gallery">
              <UnstakedCard id={1234} />
              <UnstakedCard id={1234} />
              <UnstakedCard id={1234} />
              <UnstakedCard id={1234} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StakingPage;
