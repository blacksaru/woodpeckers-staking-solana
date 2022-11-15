/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import MainBox from "../components/MainBox";

const StakingPage: NextPage = () => {
  const router = useRouter();
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
      </div>
    </main>
  );
};

export default StakingPage;
