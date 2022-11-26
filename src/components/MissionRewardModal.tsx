import { Dialog } from "@mui/material";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getRansackData, withdrawRansackft } from "../contexts/transaction";
import { NFTType } from "../pages/staking";
import { BoxBackIcon, CircleClose } from "./svgIcons";

export default function MissionRewardModal(props: {
  wallet: WalletContextState;
  opened: boolean;
  onClose: Function;
  nest: NFTType | undefined;
  //   style: number;
  //   rewardAmount: number;
  //   rewardStyle: number;
}) {
  const { wallet, opened, onClose, nest } = props;
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const getMissionData = async () => {
    if (nest === undefined) return;
    if (wallet.publicKey === null) return;
    const mission = await getRansackData(
      wallet.publicKey,
      new PublicKey(nest.mint)
    );
    console.log(mission);
  };

  const handleDiscover = async () => {
    if (nest === undefined) return;
    try {
      await withdrawRansackft(
        wallet,
        [{ nestMint: new PublicKey(nest.mint) }],
        setLoading,
        () => setIsEnd(true)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [opened]);
  return (
    <Dialog open={opened} maxWidth="lg">
      <div className="mission-claim-modal">
        <div
          className="main-box collection-box ransack"
          style={{ marginTop: 0 }}
        >
          <div className="main-box-content">
            <h3 className="box-title">
              Claim Rewards
              <span>This will only be available only while nesting.</span>
            </h3>
            <button
              className="back-btn box-icon-button"
              onClick={() => onClose()}
            >
              <CircleClose />
            </button>
            <div className="modal-content">
              <div className="question-mark">?</div>
              <button
                className="discorver-rewards"
                disabled={loading}
                onClick={() => handleDiscover()}
              >
                {loading ? (
                  <ClipLoader size={12} color="#fff" />
                ) : (
                  <>Discover Reward</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
