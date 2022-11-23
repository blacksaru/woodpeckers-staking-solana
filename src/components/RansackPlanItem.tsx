import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { ClipLoader } from "react-spinners";
import { NFTType } from "../pages/staking";

export default function RansackPlanItem(props: {
  wallet: WalletContextState;
  title: string;
  description: any;
  lockTime: number;
  updatePage: Function;
  selectedNest: NFTType | undefined;
  setPlanId: Function;
  setEndProgress: Function;
  selectedWpNfts: {
    mint: PublicKey;
  }[];
}) {
  const [loading, setLoading] = useState(false);
  const handleStake = async () => {
    props.setPlanId();
    props.setEndProgress(true);
  };
  return (
    <div className="plan-item">
      <h4>{props.title}</h4>
      {props.description}
      <button onClick={() => handleStake()} disabled={loading}>
        {loading ? <ClipLoader size={10} color="#fff" /> : <>Select Plan</>}
      </button>
    </div>
  );
}
