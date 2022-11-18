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
import Skeleton from "@mui/material/Skeleton";
import CollectionBox from "../components/CollectionBox";
import Header from "../components/Header";

export interface NFTType {
  mint: string;
  id: string;
  uri: string;
  image: string;
  name: string;
  selected: boolean;
  tier: string;
  staked: boolean;
  isMulti: boolean;
}

const StakingPage: NextPage = () => {
  const router = useRouter();
  const wallet = useWallet();
  const [blazins, setBlazins] = useState<NFTType[]>();
  const [nests, setNests] = useState<NFTType[]>();
  const [loading, setLoading] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const getWalletNfts = async () => {
    if (wallet.publicKey === null) {
      setBlazins([]);
      setNests([]);
      return;
    }
    setLoading(true);
    let nfts: NFTType[] = [];
    const nftList = await getParsedNftAccountsByOwner({
      publicAddress: wallet.publicKey.toBase58(),
      connection: solConnection,
    });
    console.log(nftList, "==> nft list");
    let blazinList: NFTType[] = [];
    let nestsList: NFTType[] = [];
    for (let item of nftList) {
      if (
        item.data.creators &&
        item.data.creators[0].address === CREATOR_ADDRESS_BLAZIN
      ) {
        blazinList.push({
          mint: item.mint,
          id: item.data.name.split("#")[1],
          uri: item.data.uri,
          image: "",
          name: item.data.name,
          selected: false,
          tier: "0",
          staked: false,
          isMulti: false,
        });
      } else if (
        item.data.creators &&
        item.data.creators[0].address === CREATOR_ADDRESS_NEST
      ) {
        nestsList.push({
          mint: item.mint,
          id: item.data.name.split("#")[1],
          uri: item.data.uri,
          image: "",
          name: item.data.name,
          selected: false,
          tier: "0",
          staked: false,
          isMulti: false,
        });
      }
    }
    let blazinMetaList: { image: string; name: string }[] = await Promise.all(
      blazinList.map((nft) =>
        fetch(nft.uri)
          .then((resp) => resp.json())
          .then((json) => {
            return {
              image: json.image as string,
              name: json.name as string,
            };
          })
          .catch((error) => {
            console.log(error);
            return {
              image: "",
              name: "",
            };
          })
      )
    );
    let nestMetaList: { image: string; name: string }[] = await Promise.all(
      nestsList.map((nft) =>
        fetch(nft.uri)
          .then((resp) => resp.json())
          .then((json) => {
            return {
              image: json.image as string,
              name: json.name as string,
            };
          })
          .catch((error) => {
            console.log(error);
            return {
              image: "",
              name: "",
            };
          })
      )
    );
    for (let i = 0; i < blazinList.length; i++) {
      blazinList[i].image = blazinMetaList[i].image;
    }
    for (let i = 0; i < nestsList.length; i++) {
      nestsList[i].image = nestMetaList[i].image;
    }

    setBlazins(blazinList);
    setNests(nestsList);
    setLoading(false);
  };

  const handleSelect = () => {};

  useEffect(() => {
    getWalletNfts();
  }, [wallet.publicKey, wallet.connected]);

  return (
    <>
      <Header />
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

          <CollectionBox
            title="Blazin Woodpeckers Genesis Collections"
            nftList={blazins}
            loading={loading}
            setNfts={setBlazins}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
          />

          <CollectionBox
            title="Nest Collections"
            nftList={nests}
            loading={loading}
            setNfts={setNests}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
          />
          {isOverlay && <div className="overlay-back"></div>}
        </div>
      </main>
    </>
  );
};

export default StakingPage;
