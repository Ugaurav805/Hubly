import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Analytics.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const weeklyChatData = {
  labels: [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
    "Week 8",
    "Week 9",
    "Week 10",
  ],
  datasets: [
    {
      label: "Chats",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: "#00D907",
      backgroundColor: "#00D907",
      tension: 0.4,
      pointBackgroundColor: "black",
    },
  ],
};

const options = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { color: "#6A6B70" } },
    x: { ticks: { color: "#6A6B70" } },
  },
};

const Analytics = () => {
  return (
    <div className="analytics-layout">
      <Sidebar />
      <div className="analytics-content">
        <h2 className="heading">Analytics</h2>

        <div className="chart-container">
          <h3 className="chart-title">Missed Chats</h3>
          <Line data={weeklyChatData} options={options} />
        </div>

        <div className="stats-container">
          <div className="stat-block">
            <h4 className="stat-title">Average Reply time</h4>
            <p className="stat-value">0 secs</p>
            <p className="stat-desc">
              For highest customer satisfaction rates you should aim to reply to
              an incoming customer's message in 15 seconds or less. Quick
              responses will get you more conversations, help you earn customers
              trust and make more sales.
            </p>
          </div>

          <div className="stat-block">
            <h4 className="stat-title">Resolved Tickets</h4>
            <div className="progress-circle">
              <svg width="114" height="114">
                <circle
                  cx="57"
                  cy="57"
                  r="50"
                  stroke="#ddd"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="57"
                  cy="57"
                  r="50"
                  stroke="#00D907"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset="62"
                  transform="rotate(-90 57 57)"
                />
              </svg>
              <span className="progress-text">80%</span>
            </div>
            <p className="stat-desc">
              A callback system on a website, as well as proactive invitations,
              help to attract even more customers. A separate round button for
              ordering a call with a small animation helps to motivate more
              customers to make calls.
            </p>
          </div>

          <div className="stat-block">
            <h4 className="stat-title">Total Chats</h4>
            <p className="stat-value">122 Chats</p>
            <p className="stat-desc">
              This metric shows the total number of chats for all Channels for
              the selected period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
