/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import MainBox from "../components/MainBox";
import { getNetworkTime, solConnection } from "../contexts/utils";
import { CREATOR_ADDRESS_BLAZIN, CREATOR_ADDRESS_NEST } from "../config";
import CollectionBox from "../components/CollectionBox";
import Header from "../components/Header";
import {
  getAllNFTs,
  getGlobalInfo,
  getNestPoolState,
} from "../contexts/transaction";
import CollectionStakedBox from "../components/CollectionStakedBox";
import RansackBox from "../components/RansackBox";
import NestCollectionBox from "../components/NestCollectionBox";
import NestStakedCollectionBox from "../components/NestStakedCollectionBox";
import RansackStakedBox from "../components/RansackStakedBox";
import { EPOCH } from "../contexts/type";

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
  stakedTime: number;
  lockTime: number;
  lockLength: number;
  claimable: number;
  nested: boolean;
  ransacked: boolean;
}

const StakingPage: NextPage = () => {
  const router = useRouter();
  const wallet = useWallet();
  const [blazins, setBlazins] = useState<NFTType[]>();
  const [nests, setNests] = useState<NFTType[]>();
  const [loading, setLoading] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  const [totalStakedCount, setTotalStakedCount] = useState(0);
  const [totalRewardDistributed, setTotalRewardDistributed] = useState(0);

  const getWalletNfts = async () => {
    if (wallet.publicKey === null) {
      setBlazins([]);
      setNests([]);
      return;
    }
    setLoading(true);
    const now = await getNetworkTime();
    const stakedNfts = await getAllNFTs();
    console.log(stakedNfts);
    let userNfts: any = [];
    if (stakedNfts && stakedNfts.count !== 0 && stakedNfts.data) {
      userNfts = stakedNfts.data.filter(
        (user) => user.owner === wallet.publicKey?.toBase58()
      )[0];
      if (userNfts) {
        userNfts = userNfts.staking;
      }
    }
    const nestedState = await getNestPoolState(wallet.publicKey);
    console.log(nestedState, "==> nestedState staked nfts");

    let nestedWps: {
      claimable: number;
      emission: number;
      lockTime: number;
      nest: string;
      stakedTime: number;
      mint: string;
    }[] = [];

    if (nestedState) {
      const stakedCount = nestedState.stakedCount.toNumber();
      for (let i = 0; i < stakedCount; i++) {
        for (let j = 0; j < 8; j++) {
          nestedWps.push({
            claimable: nestedState.staking[i].claimable.toNumber(),
            emission: nestedState.staking[i].emission.toNumber(),
            lockTime: nestedState.staking[i].lockTime.toNumber(),
            nest: nestedState.staking[i].nest.toBase58(),
            stakedTime: nestedState.staking[i].stakedTime.toNumber(),
            mint: nestedState.staking[i].woodpecker[j].toBase58(),
          });
        }
      }
    }

    const nftList = await getParsedNftAccountsByOwner({
      publicAddress: wallet.publicKey.toBase58(),
      connection: solConnection,
    });

    let blazinList: NFTType[] = [];
    let nestsList: NFTType[] = [];
    if (nestedState) {
      for (let item of nftList) {
        if (
          item.data.creators &&
          item.data.creators[0].address === CREATOR_ADDRESS_BLAZIN
        ) {
          const filtered = userNfts.filter(
            (nft: any) => nft.mint === item.mint
          )[0];
          const filteredNest = nestedWps.filter(
            (nft) => item.mint === nft.mint
          )[0];

          blazinList.push({
            mint: item.mint,
            id: item.data.name.split("#")[1],
            uri: item.data.uri,
            image: "",
            name: item.data.name,
            selected: false,
            tier: "0",
            staked: filtered || filteredNest,
            isMulti: false,
            stakedTime: filtered
              ? filtered.stakedTime
              : filteredNest
              ? filteredNest.stakedTime
              : now,
            lockTime: filtered
              ? filtered.lockTime
              : filteredNest
              ? filteredNest.lockTime
              : now,
            claimable: filtered
              ? filtered.claimable
              : filteredNest
              ? filteredNest.claimable
              : 0,
            lockLength: filtered
              ? (filtered.lockTime - filtered.stakedTime > 0
                  ? filtered.lockTime - filtered.stakedTime
                  : 0) / EPOCH
              : filteredNest
              ? (filteredNest.lockTime - filteredNest.stakedTime > 0
                  ? filteredNest.lockTime - filteredNest.stakedTime
                  : 0) / EPOCH
              : 0,
            nested: filteredNest ? true : false,
            ransacked: false,
          });
        } else if (
          item.data.creators &&
          item.data.creators[0].address === CREATOR_ADDRESS_NEST
        ) {
          const filtered = userNfts.filter(
            (nft: any) => nft.mint === item.mint
          )[0];
          nestsList.push({
            mint: item.mint,
            id: item.data.name.split("#")[1],
            uri: item.data.uri,
            image: "",
            name: item.data.name,
            selected: false,
            tier: "0",
            staked: filtered ? true : false,
            isMulti: false,
            stakedTime: filtered ? filtered.stakedTime : now,
            lockTime: filtered ? filtered.lockTime : now,
            claimable: filtered ? filtered.claimable : 0,
            lockLength: filtered
              ? (filtered.lockTime - filtered.stakedTime > 0
                  ? filtered.lockTime - filtered.stakedTime
                  : 0) / EPOCH
              : 0,
            nested: false,
            ransacked: false,
          });
        }
      }
    } else if (userNfts) {
      for (let item of nftList) {
        if (
          item.data.creators &&
          item.data.creators[0].address === CREATOR_ADDRESS_BLAZIN
        ) {
          const filtered = userNfts.filter(
            (nft: any) => nft.mint === item.mint
          )[0];

          blazinList.push({
            mint: item.mint,
            id: item.data.name.split("#")[1],
            uri: item.data.uri,
            image: "",
            name: item.data.name,
            selected: false,
            tier: "0",
            staked: filtered ? true : false,
            isMulti: false,
            stakedTime: filtered ? filtered.stakedTime : now,
            lockTime: filtered ? filtered.lockTime : now,
            claimable: filtered ? filtered.claimable : 0,
            lockLength: filtered
              ? (filtered.lockTime - filtered.stakedTime > 0
                  ? filtered.lockTime - filtered.stakedTime
                  : 0) / EPOCH
              : 0,
            nested: false,
            ransacked: false,
          });
        } else if (
          item.data.creators &&
          item.data.creators[0].address === CREATOR_ADDRESS_NEST
        ) {
          const filtered = userNfts.filter(
            (nft: any) => nft.mint === item.mint
          )[0];
          nestsList.push({
            mint: item.mint,
            id: item.data.name.split("#")[1],
            uri: item.data.uri,
            image: "",
            name: item.data.name,
            selected: false,
            tier: "0",
            staked: filtered ? true : false,
            isMulti: false,
            stakedTime: filtered ? filtered.stakedTime : now,
            lockTime: filtered ? filtered.lockTime : now,
            claimable: filtered ? filtered.claimable : 0,
            lockLength: filtered
              ? (filtered.lockTime - filtered.stakedTime > 0
                  ? filtered.lockTime - filtered.stakedTime
                  : 0) / EPOCH
              : 0,
            nested: false,
            ransacked: false,
          });
        }
      }
    } else {
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
            stakedTime: now as number,
            lockTime: now as number,
            claimable: 0,
            lockLength: 0,
            nested: false,
            ransacked: false,
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
            stakedTime: now as number,
            lockTime: now as number,
            claimable: 0,
            lockLength: 0,
            nested: false,
            ransacked: false,
          });
        }
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
    let nestMetaList: { image: string; name: string; tier: string }[] =
      await Promise.all(
        nestsList.map((nft) =>
          fetch(nft.uri)
            .then((resp) => resp.json())
            .then((json) => {
              return {
                image: json.image as string,
                name: json.name as string,
                tier: json.attributes.filter(
                  (item: any) => item.trait_type.toLowerCase() === "tier"
                )[0].value,
              };
            })
            .catch((error) => {
              console.log(error);
              return {
                image: "",
                name: "",
                tier: "0",
              };
            })
        )
      );
    for (let i = 0; i < blazinList.length; i++) {
      blazinList[i].image = blazinMetaList[i].image;
    }
    for (let i = 0; i < nestsList.length; i++) {
      nestsList[i].image = nestMetaList[i].image;
      nestsList[i].tier = nestMetaList[i].tier;
    }
    setBlazins(blazinList);
    setNests(nestsList);
    setLoading(false);
  };

  const getAllGlobalData = async () => {
    const data = await getGlobalInfo();
    if (data) {
      setTotalStakedCount(data.totalStakedCount);
      setTotalRewardDistributed(data.totalRewardDistributed);
    }
  };

  const updatePage = () => {
    getWalletNfts();
    getAllGlobalData();
  };

  useEffect(() => {
    updatePage();
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
                <h2>{((totalStakedCount / 5555) * 100).toFixed(2)}%</h2>
              </div>
            </MainBox>
            <MainBox>
              <div className="total-values">
                <p>Rewards Distributed</p>
                <h2 style={{ fontWeight: 400 }}>
                  <span>{totalRewardDistributed.toLocaleString()} </span>$BLAZE
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
                    <span>0 </span>$BLAZE
                  </h2>
                </div>
              </MainBox>
              <MainBox>
                <div className="total-values">
                  <p>Accumulated Rewards</p>
                  <h2 style={{ fontWeight: 400 }}>
                    <span>+300.001 </span>$BLAZE
                  </h2>
                </div>
              </MainBox>
            </div>
          </div>

          <CollectionBox
            wallet={wallet}
            title="Blazin Woodpeckers Genesis Collections"
            nftList={blazins}
            loading={loading}
            setNfts={setBlazins}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
            updatePage={updatePage}
          />

          {blazins?.filter((nft) => nft.staked).length !== 0 && (
            <CollectionStakedBox
              wallet={wallet}
              title="Blazin Woodpeckerz Staked"
              nftList={blazins}
              loading={loading}
              setNfts={setBlazins}
              isOverlay={isOverlay}
              setIsOverlay={setIsOverlay}
              updatePage={updatePage}
            />
          )}

          <NestCollectionBox
            wallet={wallet}
            title="Nest Collections"
            wpNftList={blazins}
            nestNftList={nests}
            loading={loading}
            setNfts={setNests}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
            updatePage={updatePage}
          />

          <NestStakedCollectionBox
            wallet={wallet}
            title="Nesting"
            wpNftList={blazins}
            nestNftList={nests}
            loading={loading}
            setNfts={setNests}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
            updatePage={updatePage}
          />
          <RansackBox
            wallet={wallet}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
            wpNfts={blazins}
            nestNfts={nests}
            updatePage={updatePage}
          />
          <RansackStakedBox
            wallet={wallet}
            isOverlay={isOverlay}
            setIsOverlay={setIsOverlay}
            wpNfts={blazins}
            nestNfts={nests}
            updatePage={updatePage}
          />
          {isOverlay && <div className="overlay-back"></div>}
        </div>
      </main>
    </>
  );
};

export default StakingPage;
