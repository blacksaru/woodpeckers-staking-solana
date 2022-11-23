/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NFTType } from "../pages/staking";
import Skeleton from "@mui/material/Skeleton";
import { WalletContextState } from "@solana/wallet-adapter-react";
import NestUnstakedCard from "./NestUnstakedCard";
import { BoxBackIcon, CircleClose } from "./svgIcons";
import UnstakedCardAtNest from "./UnstakedCardAtNest";
import { PublicKey } from "@solana/web3.js";
import { errorAlert } from "./toastGroup";
import NestPlanItem from "./NestPlanItem";
import NestStakedCard from "./NestStakedCard";

export default function NestStakedCollectionBox(props: {
  wallet: WalletContextState;
  loading: boolean;
  title: string;
  wpNftList: NFTType[] | undefined;
  nestNftList: NFTType[] | undefined;
  setNfts: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
  updatePage: Function;
}) {
  const {
    loading,
    wpNftList,
    nestNftList,
    title,
    setNfts,
    isOverlay,
    setIsOverlay,
    updatePage,
    wallet,
  } = props;

  const [forceRender, setForceRender] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedNest, setSelectedNest] = useState<NFTType>();
  const [maxWpCnt, setMaxWpCnt] = useState(1);
  const [isShowWps, setIsShowWps] = useState(false);
  const [isStakingPlan, setIsStakingPlan] = useState(false);
  const [tier, setTier] = useState(1);

  const [blazins, setBlazins] = useState<NFTType[]>();
  const [selectedNfts, setSelectedNfts] = useState<{ mint: PublicKey }[]>([]);
  const [selectedMainNfts, setSelectedMainNfts] = useState<
    { mint: PublicKey }[]
  >([]);

  const update = () => {
    updatePage();
    closeOverlay();
  };

  const closeOverlay = () => {
    setIsReady(false);
    setIsOverlay(false);
    setIsStakingPlan(false);
    setSelectedMainNfts([]);
  };

  const closeIsShowWps = () => {
    if (selectedNfts.length <= maxWpCnt) {
      setIsShowWps(false);
      setSelectedMainNfts(selectedNfts);
    } else {
      errorAlert(`Max WP amount should be ${maxWpCnt}`);
    }
  };

  const closeClerIsShowWps = () => {
    setIsShowWps(false);
  };

  const showSelectBox = () => {
    setIsOverlay(true);
    setIsReady(true);
  };

  const handleSelect = (mint: string) => {
    let nfts = blazins;
    let selected: { mint: PublicKey }[] = [];
    if (nfts) {
      for (let i = 0; i < nfts.length; i++) {
        if (nfts[i].mint === mint) {
          nfts[i].selected = !nfts[i].selected;
        }
        if (nfts[i].selected) {
          selected.push({ mint: new PublicKey(nfts[i].mint) });
        }
      }
      setSelectedNfts(selected);
      // console.log(selected);
    }
    setForceRender(!forceRender);
  };

  return (
    <div
      className="main-box collection-box"
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
        <h3>{title}</h3>
        {loading ? (
          <div className="nft-gallery">
            {[1, 2, 3, 4, 5].map((item, key) => (
              <Skeleton
                variant="rectangular"
                width={128}
                height={128}
                key={key}
                style={{ borderRadius: 15 }}
              />
            ))}
          </div>
        ) : (
          <div className="nest-staked-gallery">
            {nestNftList &&
              nestNftList.length !== 0 &&
              nestNftList.map(
                (item, key) =>
                  !item.staked && (
                    <NestStakedCard
                      key={key}
                      // id={item.id}
                      // nft={item}
                      // mint={item.mint}
                      // uri={item.uri}
                      // key={key}
                      // image={item.image}
                      // selected={item.selected}
                      // showSelectBox={showSelectBox}
                      // setSelectedNest={setSelectedNest}
                      // setIsShowWps={setIsShowWps}
                    />
                  )
              )}
          </div>
        )}
      </div>
    </div>
  );
}
