"use client";

import React, { useState } from "react";

const leaderboardData = [
  {
    id: 1,
    name: "Jeevan Kushwaha",
    streaks: 5,
    saharaPoints: 250,
    tasksCompleted: 50,
  },
  {
    id: 2,
    name: "Arya Sharma",
    streaks: 4,
    saharaPoints: 100,
    tasksCompleted: 40,
  },
  {
    id: 3,
    name: "Maya Singh",
    streaks: 8,
    saharaPoints: 50,
    tasksCompleted: 12,
  },
  {
    id: 4,
    name: "Rohit Thapa",
    streaks: 3,
    saharaPoints: 90,
    tasksCompleted: 40,
  },
  {
    id: 5,
    name: "Sneha Koirala",
    streaks: 7,
    saharaPoints: 70,
    tasksCompleted: 60,
  },
];

function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedBy, setSortedBy] = useState("saharaPoints");

  const filteredData = leaderboardData
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b[sortedBy] - a[sortedBy]);

  return (
    <div className="max-w-lg mx-auto p-4  rounded-md shadow-md font-sans">
      <h1 className="text-2xl font-bold text-center text-amber-500">
        Leaderboard
      </h1>

      {/* Search Bar */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400"
        />
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setSortedBy("saharaPoints")}
          className={`p-2 text-white rounded-md shadow-md font-bold ${
            sortedBy === "saharaPoints" ? "bg-yellow-600" : "background"
          }`}
        >
          Sahara Points
        </button>
        <button
          onClick={() => setSortedBy("streaks")}
          className={`p-2 text-white rounded-md shadow-md font-bold ${
            sortedBy === "streaks" ? "bg-yellow-600" : "background"
          }`}
        >
          Streaks
        </button>
        <button
          onClick={() => setSortedBy("tasksCompleted")}
          className={`p-2 text-white rounded-md shadow-md font-bold ${
            sortedBy === "tasksCompleted" ? "bg-yellow-700" : "background"
          }`}
        >
          Tasks Completed
        </button>
      </div>

      {/* Leaderboard Table */}
      <ul className="mt-6 space-y-4">
        {filteredData.map((user, index) => (
          <li
            key={user.id}
            className="flex justify-between items-center background p-4 rounded-md shadow-lg hover:bg-yellow-100"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {index + 1}. {user.name}
              </h2>
              <p className="text-sm text-gray-500">
                Streaks: {user.streaks} 🔥
              </p>
              <p className="text-sm text-gray-500">
                Tasks Completed: {user.tasksCompleted}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-yellow-600">
                {user.saharaPoints} pts
              </h3>
            </div>
          </li>
        ))}
      </ul>

      {/* Personal Highlight */}
      <section className="mt-8 p-4 background rounded-md shadow-md">
        <h3 className="text-lg font-bold text-center text-black">Your Rank</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-700">Rank: 1</p>
          <p className="text-gray-700">Points: 250</p>
          <p className="text-gray-700">Streaks: 5 🔥</p>
        </div>
      </section>

      {/* Milestones or Achievements */}
      <section className="mt-6 p-4 background rounded-md shadow-md">
        <h3 className="text-lg font-bold text-center text-black">
          Achievements
        </h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center space-x-2">
            <span className="bg-green-400 p-2 rounded-full text-white shadow-md">
              ✔
            </span>
            <p className="text-gray-700">Completed 50 tasks</p>
          </li>
          <li className="flex items-center space-x-2">
            <span className="bg-blue-400 p-2 rounded-full text-white shadow-md">
              🔥
            </span>
            <p className="text-gray-700">Maintained a 5-day streak</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Leaderboard;
