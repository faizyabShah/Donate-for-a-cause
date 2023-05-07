import "./DonationCard.scss";

function DonationCard({ classs, title, amount }) {
  return (
    <div className={classs ? "donationCard " + classs : "donationCard"}>
      <div className="donationCardHeader">
        <div className="donationCardTitle">{title}</div>
      </div>
      <div
        className={classs ? "donationCardBody " + classs : "donationCardBody"}
      >
        <div
          className={
            classs ? "donationCardAmount " + classs : "donationCardAmount"
          }
        >
          {amount}
        </div>
      </div>
    </div>
  );
}

export default DonationCard;
