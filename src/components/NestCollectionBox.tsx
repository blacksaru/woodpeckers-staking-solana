/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NFTType } from "../pages/staking";
import Skeleton from "@mui/material/Skeleton";
import { WalletContextState } from "@solana/wallet-adapter-react";
import NestUnstakedCard from "./NestUnstakedCard";
import { CircleClose } from "./svgIcons";
import UnstakedCardAtNest from "./UnstakedCardAtNest";

export default function NestCollectionBox(props: {
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

  const [blazins, setBlazins] = useState<NFTType[]>();

  const closeOverlay = () => {
    setIsReady(false);
    setIsOverlay(false);
  };

  const showSelectBox = () => {
    setIsOverlay(true);
    setIsReady(true);
  };

  const handleSelect = () => {};

  useEffect(() => {
    setBlazins(wpNftList);
    if (selectedNest) {
      switch (selectedNest.tier) {
        case "1":
          setMaxWpCnt(2);
          break;
        case "2":
          setMaxWpCnt(5);
          break;
        case "3":
          setMaxWpCnt(8);
          break;
        default:
          setMaxWpCnt(2);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNest, wpNftList]);

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
        {isOverlay && isReady && (
          <div className="box-overlay">
            <button className="overlay-close" onClick={closeOverlay}>
              <CircleClose />
            </button>
            <div className="overlay-content">
              <h3>Nesting Woodpeckers</h3>
            </div>
            {selectedNest && !isShowWps && (
              <div className="nest-group">
                <div className="nest-group-content">
                  <div className="item-group">
                    <div className="id">#{selectedNest.id}</div>
                    <div className="label">multiplier</div>
                    <img src={selectedNest.image} alt="" />
                    <p className="item-dec">Tier {selectedNest.tier}</p>
                  </div>
                  <p className="x">X</p>
                  <div className="item-group">
                    <div
                      className="multi-pre-box"
                      onClick={() => setIsShowWps(true)}
                    >
                      <p className="t">
                        Select
                        <br />
                        Woodpecker
                        <br />
                        NFT
                      </p>
                    </div>
                    <p className="item-dec">
                      Max. x{maxWpCnt} Woodpecker
                      <br />
                      for Tier 1
                    </p>
                  </div>
                </div>
                <button className="btn-action">get in the nest</button>
              </div>
            )}

            {selectedNest && isShowWps && (
              <div className="nest-group">
                <div className="nest-box-list">
                  {blazins &&
                    blazins.length !== 0 &&
                    blazins.map((item, key) => (
                      <UnstakedCardAtNest
                        key={key}
                        id={item.id}
                        handleSelect={handleSelect}
                        mint={item.mint}
                        name={item.name}
                        image={item.image}
                        selected={item.selected}
                      />
                    ))}
                </div>
                <button className="btn-action">Select Woodpecker</button>
              </div>
            )}
          </div>
        )}
        <h3>{title}</h3>

        {!(isOverlay && isReady) && (
          <>
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
              <div className="nft-gallery">
                {nestNftList &&
                  nestNftList.length !== 0 &&
                  nestNftList.map(
                    (item, key) =>
                      !item.staked && (
                        <NestUnstakedCard
                          id={item.id}
                          nft={item}
                          mint={item.mint}
                          uri={item.uri}
                          key={key}
                          image={item.image}
                          selected={item.selected}
                          showSelectBox={showSelectBox}
                          setSelectedNest={setSelectedNest}
                          setIsShowWps={setIsShowWps}
                        />
                      )
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
