import { Chart as ChartJS } from "chart.js/auto";
import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./DonationChart.scss";
function LineGraph({ lastFiveMonthsDonations }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.chartInstance.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "fit-content";
    }
  }, []);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log(lastFiveMonthsDonations);
  return lastFiveMonthsDonations != null ? (
    <div className="donationChart">
      <Line
        data={{
          // x-axis label values
          labels: [
            months[new Date().getMonth() - 4],
            months[new Date().getMonth() - 3],
            months[new Date().getMonth() - 2],
            months[new Date().getMonth() - 1],
            months[new Date().getMonth()],
          ],
          datasets: [
            {
              label: "Donations",
              data: [
                lastFiveMonthsDonations[new Date().getMonth() - 4],
                lastFiveMonthsDonations[new Date().getMonth() - 3],
                lastFiveMonthsDonations[new Date().getMonth() - 2],
                lastFiveMonthsDonations[new Date().getMonth() - 1],
                lastFiveMonthsDonations[new Date().getMonth()],
              ],
              fill: false,
              borderWidth: 2,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "green",
              responsive: true,
            },
          ],
        }}
      />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
}

export default LineGraph;
