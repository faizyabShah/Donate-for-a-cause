import "./Overview.scss";
import DonationCard from "./DonationCard";
import LineGraph from "./DonationChart";
import { useState, useEffect } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { Line } from "react-chartjs-2";

function Overview() {
  const [totalDonations, setTotalDonations] = useState(null);
  const [thisMonthDonations, setThisMonthDonations] = useState(null);
  const [thisYearDonations, setThisYearDonations] = useState(null);
  const [lastFiveMonthsDonations, setLastFiveMonthsDonations] = useState(null);
  const [peopleImpacted, setPeopleImpacted] = useState(null);
  const { token, user } = useUserContext();
  useEffect(() => {
    const fetchPeopleImpacted = async () => {
      const url = "http://localhost:5000/api/user/getpeopleimpacted";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      console.log(data);
      setPeopleImpacted(data);
    };

    const fetchTotalDonations = async () => {
      const url = "http://localhost:5000/api/projects/userdonations";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setTotalDonations(data);
    };

    const fetchThisMonthDonations = async () => {
      const url = "http://localhost:5000/api/projects/userdonationsmonth";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setThisMonthDonations(data);
    };

    const fetchThisYearDonations = async () => {
      const url = "http://localhost:5000/api/projects/userdonationsyear";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setThisYearDonations(data);
    };

    const fetchLastFiveMonthsDonations = async () => {
      const url =
        "http://localhost:5000/api/projects/userdonationslastfivemonths";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setLastFiveMonthsDonations(data);
    };
    if (user) {
      fetchPeopleImpacted();
      fetchThisMonthDonations();
      fetchTotalDonations();
      fetchThisYearDonations();
      fetchLastFiveMonthsDonations();
    }
  }, [user]);

  return (
    <div className="donationsOverview">
      <DonationCard
        title="Total Donations"
        amount={totalDonations != null ? totalDonations.sum : "loading"}
      />
      <DonationCard
        title="Donations this month"
        amount={thisMonthDonations != null ? thisMonthDonations.sum : "loading"}
      />
      <DonationCard
        title="Donations this year"
        amount={thisYearDonations != null ? thisYearDonations.sum : "loading"}
      />
      <DonationCard
        title="People impacted by your donations"
        amount={
          peopleImpacted != null ? peopleImpacted.peopleImpacted : "loading"
        }
      />
      <DonationCard
        classs="Special"
        title="Donations last five months:"
        amount={<LineGraph lastFiveMonthsDonations={lastFiveMonthsDonations} />}
      />
    </div>
  );
}

export default Overview;
