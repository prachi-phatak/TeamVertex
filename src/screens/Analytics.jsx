import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import Navbar from "../components/Navbar";

export default function Analytics({ posts, setScreen }) {
  const reachData = posts.map(p => ({
    day: p.day.slice(0, 3),
    reach: p.reach
  }));

  const platformCount = posts.reduce((acc, p) => {
    acc[p.platform] = (acc[p.platform] || 0) + 1;
    return acc;
  }, {});

  const platformData = Object.entries(platformCount).map(
    ([name, count]) => ({ name, count })
  );

  const totalReach = posts.reduce((sum, p) => sum + p.reach, 0);
  const avgEngagement = (
    posts.reduce((sum, p) => sum + p.engagement, 0) / posts.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold">📊 Analytics</h2>
        <p className="opacity-80">Weekly Performance</p>
      </div>

      <div className="p-4 space-y-4">

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">{posts.length}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-purple-600">
              {(totalReach / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-gray-500">Reach</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{avgEngagement}%</p>
            <p className="text-xs text-gray-500">Engagement</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-700 mb-4">Reach This Week</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={reachData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reach"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-700 mb-4">Posts by Platform</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <Navbar screen="analytics" setScreen={setScreen} />
    </div>
  );
}
