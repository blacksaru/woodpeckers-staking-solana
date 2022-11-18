import { useState } from "react";
import { NFTType } from "../pages/staking";
import Skeleton from "@mui/material/Skeleton";
import UnstakedCard from "./UnstakedCard";
import { CircleClose } from "./svgIcons";

export default function CollectionBox(props: {
  loading: boolean;
  title: string;
  nftList: NFTType[] | undefined;
  setNfts: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
}) {
  const { loading, nftList, title, setNfts, isOverlay, setIsOverlay } = props;
  const [forceRender, setForceRender] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSelect = (mint: string) => {
    let nfts = nftList;
    if (nfts) {
      for (let i = 0; i < nfts.length; i++) {
        if (nfts[i].mint === mint) {
          nfts[i].selected = !nfts[i].selected;
        }
      }
    }
    setNfts(nfts);
    setForceRender(!forceRender);
  };

  const handleIsReady = (type: string) => {
    setIsReady(true);
    setIsOverlay(true);
  };

  const closeOverlay = () => {
    setIsReady(false);
    setIsOverlay(false);
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
        {isOverlay && isReady && (
          <div className="box-overlay">
            <button className="overlay-close" onClick={closeOverlay}>
              <CircleClose />
            </button>
            <div className="overlay-content">
              <h3>{title}</h3>
              <p className="p-text-1">Select a Staking Plan</p>
              <div className="plans-box">
                <div className="plan-item">
                  <h4>Unlocked</h4>
                  <p>
                    You get: <br /> 2.5 $BLAZE a day
                  </p>
                  <button>Select Plan</button>
                </div>
                <div className="plan-item">
                  <h4>10 days</h4>
                  <p>
                    Lock in 100 $BLAZE <br /> 7 $BLAZE a day
                  </p>
                  <button>Select Plan</button>
                </div>
                <div className="plan-item">
                  <h4>20 days</h4>
                  <p>
                    Lock in 100 $BLAZE <br /> 10 $BLAZE a day
                  </p>
                  <button>Select Plan</button>
                </div>
                <div className="plan-item">
                  <h4>35 days</h4>
                  <p>
                    Lock in 300 $BLAZE <br /> 15 $BLAZE a day
                  </p>
                  <button>Select Plan</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <h3>{title}</h3>
        <div className="action-buttons">
          <button
            className="btn-action"
            onClick={() => handleIsReady("single")}
          >
            stake
          </button>
          <button className="btn-action" onClick={() => handleIsReady("all")}>
            stake all
          </button>
        </div>
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
                {nftList &&
                  nftList.length !== 0 &&
                  nftList.map((item, key) => (
                    <UnstakedCard
                      id={item.id}
                      mint={item.mint}
                      uri={item.uri}
                      key={key}
                      image={item.image}
                      selected={item.selected}
                      handleSelect={handleSelect}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
