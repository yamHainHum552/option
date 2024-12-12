"use client";
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const weeklyProgressData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  taskCompletionData: [3, 4, 2, 5, 4, 6, 3],
  saharaPointsData: [20, 40, 30, 50, 60, 70, 80],
};

function WeeklyProgress() {
  const lineChartData = {
    labels: weeklyProgressData.labels,
    datasets: [
      {
        label: "Tasks Completed",
        data: weeklyProgressData.taskCompletionData,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: weeklyProgressData.labels,
    datasets: [
      {
        label: "Sahara Points Earned",
        data: weeklyProgressData.saharaPointsData,
        backgroundColor: "#10B981",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">Weekly Progress</h3>

      <div className="mt-4">
        <h4 className="text-md font-medium text-gray-600">Tasks Completed</h4>
        <Line data={lineChartData} />
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium text-gray-600">
          Sahara Points Earned
        </h4>
        <Bar data={barChartData} />
      </div>
    </div>
  );
}

export default WeeklyProgress;
