import { Chart as ChartJS } from "chart.js/auto";
import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./DonationChart.scss";
function LineGraph() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.chartInstance.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "fit-content";
    }
  }, []);
  return (
    <div className="donationChart">
      <Line
        data={{
          // x-axis label values
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "# of Calories Lost",
              // y-axis data plotting values
              data: [200, 300, 1300, 520, 2000, 350, 150],
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
  );
}

export default LineGraph;
