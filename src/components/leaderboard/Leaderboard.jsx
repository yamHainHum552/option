import React from "react";

const dummyLeaderboardData = [
  { rank: 1, name: "Jivan Kushwaha", saharaPoints: 110 },
  { rank: 2, name: "Yam Guragain", saharaPoints: 100 },
  { rank: 3, name: "Kushal Adhikari", saharaPoints: 80 },
  { rank: 4, name: "Kritam Bhattarai", saharaPoints: 50 },
  { rank: 5, name: "Sailesh Karki", saharaPoints: 30 },
  { rank: 6, name: "Sulav Adhikari", saharaPoints: 20 },
];

function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <header className="bg-yellow-200 p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Leaderboard</h1>
        <p className="text-sm text-gray-600 text-center mt-1">
          Check out the top performers!
        </p>
      </header>

      <main className="mt-4 space-y-4">
        <table className="min-w-full table-auto bg-yellow-100 border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-yellow-100 text-left">
            <tr>
              <th className="p-3 text-sm text-gray-700">Rank</th>
              <th className="p-3 text-sm text-gray-700">Name</th>
              <th className="p-3 text-sm text-gray-700">Sahara Points</th>
            </tr>
          </thead>
          <tbody>
            {dummyLeaderboardData.map((user) => (
              <tr
                key={user.rank}
                className="border-b hover:bg-yellow-50 transition-colors"
              >
                <td className="p-3 text-sm text-gray-700">{user.rank}</td>
                <td className="p-3 text-sm text-gray-700">{user.name}</td>
                <td className="p-3 text-sm text-gray-700">
                  {user.saharaPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Leaderboard;
