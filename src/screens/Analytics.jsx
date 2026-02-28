import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import Navbar from "../components/Navbar";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(20,20,35,0.95)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "12px", padding: "10px 14px" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{label}</p>
        <p style={{ color: "#a78bfa", fontWeight: 600, fontSize: "14px" }}>{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

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
    ([name, count]) => ({ name: name.slice(0, 2), count, full: name })
  );

  const totalReach = posts.reduce((sum, p) => sum + p.reach, 0);
  const avgEngagement = (posts.reduce((sum, p) => sum + p.engagement, 0) / posts.length).toFixed(1);
  const bestPost = posts.reduce((best, p) => p.reach > best.reach ? p : best, posts[0]);

  return (
    <div className="min-h-screen gradient-bg pb-24">

      {/* Background orb */}
      <div className="fixed bottom-20 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-8 pb-5"
        style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Analytics
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          Weekly Performance Overview
        </p>
      </div>

      <div className="px-4 pt-5 space-y-4">

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 fade-in-up">
          {[
            { label: "Posts", value: posts.length, color: "#a78bfa", icon: "📝" },
            { label: "Total Reach", value: `${(totalReach/1000).toFixed(1)}K`, color: "#f472b6", icon: "👁" },
            { label: "Avg. Engagement", value: `${avgEngagement}%`, color: "#34d399", icon: "💫" }
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center card-hover">
              <p className="text-lg mb-1">{stat.icon}</p>
              <p className="text-xl font-bold" style={{ color: stat.color, fontFamily: 'Syne, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reach Chart */}
        <div className="glass rounded-2xl p-5 fade-in-up-delay-1">
          <h3 className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            📈 Reach This Week
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={reachData}>
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="reach"
                stroke="url(#reachGradient)"
                strokeWidth={3}
                dot={{ fill: "#a78bfa", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#db2777" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Chart */}
        <div className="glass rounded-2xl p-5 fade-in-up-delay-2">
          <h3 className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            📊 Posts by Platform
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={platformData} barSize={28}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Best Post */}
        {bestPost && (
          <div className="rounded-2xl p-5 fade-in-up-delay-3"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(219,39,119,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🏆</span>
              <h3 className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Best Post This Week
              </h3>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm px-3 py-1 rounded-full"
                style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
                {bestPost.platform} • {bestPost.day}
              </span>
              <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>
                {bestPost.reach.toLocaleString()} reach
              </span>
            </div>
            <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              {bestPost.caption}
            </p>
          </div>
        )}

      </div>

      <Navbar screen="analytics" setScreen={setScreen} />
    </div>
  );
}
