import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function Calendar({ posts, business, setScreen, setSelectedPost }) {
  return (
    <div className="min-h-screen gradient-bg pb-24">

      {/* Background orbs */}
      <div className="fixed top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />

      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-8 pb-5"
        style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}>
              Content Calendar
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              {business.name} • 7-Day Plan
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <div className="w-2 h-2 rounded-full bg-violet-400" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-xs text-violet-300 font-medium">7 Posts</span>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="px-4 pt-5 space-y-3">
        {posts.map((post, i) => (
          <div key={i}
            className="fade-in-up"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" }}>
                {post.day}
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <PostCard
              post={post}
              onClick={() => {
                setSelectedPost(post);
                setScreen("postDetail");
              }}
            />
          </div>
        ))}
      </div>

      <Navbar screen="calendar" setScreen={setScreen} />
    </div>
  );
}
