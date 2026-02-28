import { useState } from "react";

const platformConfig = {
  Instagram: { gradient: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", emoji: "📸", light: "rgba(220,39,67,0.15)", border: "rgba(220,39,67,0.3)" },
  Facebook: { gradient: "linear-gradient(135deg, #1877f2, #0a52cc)", emoji: "👥", light: "rgba(24,119,242,0.15)", border: "rgba(24,119,242,0.3)" },
  WhatsApp: { gradient: "linear-gradient(135deg, #25d366, #128c7e)", emoji: "💬", light: "rgba(37,211,102,0.15)", border: "rgba(37,211,102,0.3)" },
  LinkedIn: { gradient: "linear-gradient(135deg, #0077b5, #005885)", emoji: "💼", light: "rgba(0,119,181,0.15)", border: "rgba(0,119,181,0.3)" }
};

export default function PostDetail({ post, setScreen }) {
  const [caption, setCaption] = useState(post.caption);
  const [scheduled, setScheduled] = useState(false);
  const config = platformConfig[post.platform] || platformConfig.Instagram;

  return (
    <div className="min-h-screen gradient-bg pb-10">

      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-4"
        style={{ background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={() => setScreen("calendar")}
          className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          ←
        </button>
        <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Edit Post
        </h2>
      </div>

      <div className="px-4 pt-5 space-y-4">

        {/* Platform Banner */}
        <div className="rounded-2xl p-5 relative overflow-hidden fade-in-up"
          style={{ background: config.gradient }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3), transparent 60%)" }} />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{config.emoji}</span>
                  <span className="font-bold text-white text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {post.platform}
                  </span>
                </div>
                <p className="text-sm text-white opacity-80">{post.day} • Best time: {post.bestTime}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{post.reach.toLocaleString()}</p>
                <p className="text-xs text-white opacity-70">est. reach</p>
              </div>
            </div>
          </div>
        </div>

        {/* Caption Editor */}
        <div className="glass rounded-2xl p-5 fade-in-up-delay-1">
          <label className="block text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            ✏️ Caption
          </label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-xl text-sm resize-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.9)",
              outline: "none"
            }}
          />
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            {caption.length} characters
          </p>
        </div>

        {/* Hashtags */}
        <div className="glass rounded-2xl p-5 fade-in-up-delay-2">
          <label className="block text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            # Hashtags
          </label>
          <div className="flex flex-wrap gap-2">
            {post.hashtags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ background: config.light, border: `1px solid ${config.border}`, color: "rgba(255,255,255,0.8)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 fade-in-up-delay-3">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{post.reach.toLocaleString()}</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Estimated Reach</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{post.engagement}%</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Engagement Rate</p>
          </div>
        </div>

        {/* Schedule Button */}
        {scheduled ? (
          <div className="rounded-2xl p-5 text-center fade-in-up"
            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-bold text-green-400 text-lg">Post Scheduled!</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              Going live on {post.day} at {post.bestTime}
            </p>
          </div>
        ) : (
          <button
            onClick={() => setScheduled(true)}
            className="w-full py-4 rounded-2xl font-semibold text-white transition-all fade-in-up-delay-4"
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              boxShadow: "0 8px 25px rgba(5,150,105,0.3)"
            }}
          >
            Schedule Post ✅
          </button>
        )}

      </div>
    </div>
  );
}
