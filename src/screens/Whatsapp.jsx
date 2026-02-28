import { useState } from "react";
import Navbar from "../components/Navbar";

export default function WhatsApp({ posts, setScreen }) {
  const [sent, setSent] = useState({});
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);

  const whatsappPosts = posts.filter(p => p.platform === "WhatsApp");
  const allPosts = posts;

 const handleSend = (index) => {
  const post = allPosts[index];
  const message = `${post.caption}\n\n${post.hashtags.join(" ")}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
  setSent(prev => ({ ...prev, [index]: true }));
};

 const handleBroadcast = async () => {
  setBroadcasting(true);
  await new Promise(r => setTimeout(r, 1000));

  const firstPost = allPosts[0];
  const message = `📢 Weekly Content Broadcast from ${firstPost ? firstPost.caption.slice(0, 100) : ""}...`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");

  setBroadcasting(false);
  setBroadcastDone(true);
  const allSent = {};
  allPosts.forEach((_, i) => allSent[i] = true);
  setSent(allSent);
};

  return (
    <div className="min-h-screen gradient-bg pb-24">

      {/* Background orb */}
      <div className="fixed top-20 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #25d366, transparent)" }} />

      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-8 pb-5"
        style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}>
              💬 WhatsApp
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Broadcast content to your customers
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}>
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-green-300 font-medium">Active</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">

        {/* Broadcast All Button */}
        <button
          onClick={handleBroadcast}
          disabled={broadcasting || broadcastDone}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all"
          style={{
            background: broadcastDone
              ? "rgba(37,211,102,0.2)"
              : "linear-gradient(135deg, #25d366, #128c7e)",
            border: broadcastDone ? "1px solid rgba(37,211,102,0.4)" : "none",
            boxShadow: broadcastDone ? "none" : "0 8px 25px rgba(37,211,102,0.3)",
            opacity: broadcasting ? 0.7 : 1
          }}
        >
          {broadcasting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Broadcasting...
            </span>
          ) : broadcastDone ? (
            "✅ All Messages Broadcast!"
          ) : (
            "📢 Broadcast All Posts"
          )}
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Posts", value: allPosts.length, color: "#4ade80" },
            { label: "Sent", value: Object.keys(sent).length, color: "#a78bfa" },
            { label: "Pending", value: allPosts.length - Object.keys(sent).length, color: "#f472b6" }
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-3 text-center">
              <p className="text-xl font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>
                {s.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Message Cards */}
        <h3 className="text-sm font-semibold pt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          ALL MESSAGES
        </h3>

        {allPosts.map((post, i) => (
          <div key={i} className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: sent[i]
                ? "1px solid rgba(37,211,102,0.3)"
                : "1px solid rgba(255,255,255,0.08)"
            }}>

            {/* WhatsApp message bubble style */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}>
                💬
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400">{post.day}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>⏰ {post.bestTime}</p>
              </div>
              {sent[i] && (
                <span className="ml-auto text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(37,211,102,0.15)", color: "#4ade80" }}>
                  ✓✓ Sent
                </span>
              )}
            </div>

            {/* Message preview */}
            <div className="rounded-xl p-3 mb-3"
              style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.15)" }}>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                {post.caption}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.hashtags.slice(0, 3).map((tag, j) => (
                  <span key={j} className="text-xs" style={{ color: "rgba(37,211,102,0.7)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {!sent[i] && (
              <button
                onClick={() => handleSend(i)}
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #25d366, #128c7e)",
                  boxShadow: "0 4px 15px rgba(37,211,102,0.25)"
                }}
              >
                Send via WhatsApp 📤
              </button>
            )}
          </div>
        ))}

      </div>

      <Navbar screen="whatsapp" setScreen={setScreen} />
    </div>
  );
}