/* eslint-disable @next/next/no-img-element */
export default function NestStakedCard() {
  return (
    <div className="nest-staked-card">
      <div className="content">
        <div className="staked-detail">
          <div className="simple-nft-card">
            <div className="id">#{24}</div>
            <div className="label">multiplier</div>
            <img src={"/img/wp-image.png"} alt="" />
          </div>
          <div className="multiplier">
            <img src={"/img/wp-image.png"} alt="" />
            <div className="multiplier-overlay">
              <h2>X{1}</h2>
              <p>Staked</p>
            </div>
          </div>
          <div className="detail-content">
            <div className="label">staked</div>
            <h2>Nested</h2>
            <div className="texts">
              <div className="text-item">
                <h5>Nest</h5>
                <h6>Tier 1</h6>
              </div>
              <div className="text-item">
                <h5>Woodpeckers</h5>
                <h6>2</h6>
              </div>
              <div className="text-item">
                <h5>$BLAZE x day</h5>
                <h6>5 $BLAZE</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="staked-action"></div>
      </div>
    </div>
  );
}
