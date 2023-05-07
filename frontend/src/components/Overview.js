import "./Overview.scss";
import DonationCard from "./DonationCard";
import LineGraph from "./DonationChart";
import { Line } from "react-chartjs-2";

function Overview() {
  return (
    <div className="donationsOverview">
      <DonationCard title="Total Donations" amount="Rs. 100,000" />
      <DonationCard title="Donations this month" amount="Rs. 100,000" />
      <DonationCard title="Donations this year" amount="Rs. 100,000" />
      <DonationCard
        classs="Special"
        title="Donations this week"
        amount={<LineGraph />}
      />
    </div>
  );
}

export default Overview;
