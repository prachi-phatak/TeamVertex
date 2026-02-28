import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function Calendar({ posts, business, setScreen, setSelectedPost }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold">📅 Content Calendar</h2>
        <p className="opacity-80">{business.name} • 7-Day Plan</p>
      </div>

      <div className="p-4 space-y-3">
        {posts.map((post, i) => (
          <div key={i}>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">
              {post.day}
            </p>
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