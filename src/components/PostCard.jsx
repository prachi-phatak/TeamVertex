const platformConfig = {
  Instagram: {
    bg: "rgba(220,39,67,0.12)",
    border: "rgba(220,39,67,0.25)",
    text: "#f87171",
    emoji: "📸",
    dot: "#f43f5e"
  },
  Facebook: {
    bg: "rgba(24,119,242,0.12)",
    border: "rgba(24,119,242,0.25)",
    text: "#60a5fa",
    emoji: "👥",
    dot: "#3b82f6"
  },
  WhatsApp: {
    bg: "rgba(37,211,102,0.12)",
    border: "rgba(37,211,102,0.25)",
    text: "#4ade80",
    emoji: "💬",
    dot: "#22c55e"
  },
  LinkedIn: {
    bg: "rgba(0,119,181,0.12)",
    border: "rgba(0,119,181,0.25)",
    text: "#38bdf8",
    emoji: "💼",
    dot: "#0ea5e9"
  }
};

export default function PostCard({ post, onClick }) {
  const config = platformConfig[post.platform] || platformConfig.Instagram;

  return (
    <div
      onClick={onClick}
      className="card-hover rounded-2xl p-4 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
            style={{ background: config.bg, border: `1px solid ${config.border}` }}>
            {config.emoji}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: config.text }}>
              {post.platform}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              ⏰ {post.bestTime}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{post.reach.toLocaleString()}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>reach</p>
        </div>
      </div>

      <p className="text-sm line-clamp-2 mb-3" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
        {post.caption}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {post.hashtags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: config.bg, color: config.text, border: `1px solid ${config.border}` }}>
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs px-2 py-1 rounded-lg"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
          View →
        </span>
      </div>
    </div>
  );
}
