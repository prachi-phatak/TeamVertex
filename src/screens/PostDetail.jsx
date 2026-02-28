import { useState } from "react";

const platformColors = {
  Instagram: "bg-pink-500",
  Facebook: "bg-blue-500",
  WhatsApp: "bg-green-500",
  LinkedIn: "bg-indigo-800"
};

export default function PostDetail({ post, setScreen }) {
  const [caption, setCaption] = useState(post.caption);
  const [scheduled, setScheduled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white p-4 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => setScreen("calendar")}
          className="text-indigo-600 font-bold text-lg"
        >
          ← Back
        </button>
        <h2 className="text-lg font-bold text-gray-800">Edit Post</h2>
      </div>

      <div className="p-4 space-y-4">

        <div className={`${platformColors[post.platform]} text-white p-4 rounded-2xl`}>
          <p className="font-bold text-lg">{post.platform}</p>
          <p className="opacity-80 text-sm">{post.day} • {post.bestTime}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-bold text-gray-700 block mb-2">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-bold text-gray-700 block mb-2">
            Hashtags
          </label>
          <div className="flex flex-wrap gap-2">
            {post.hashtags.map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-bold text-gray-700 block mb-2">
            Estimated Reach
          </label>
          <p className="text-2xl font-bold text-indigo-600">
            {post.reach.toLocaleString()} people
          </p>
        </div>

        {scheduled ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-green-600 font-bold text-lg">✅ Post Scheduled!</p>
          </div>
        ) : (
          <button
            onClick={() => setScheduled(true)}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl text-lg"
          >
            Schedule Post ✅
          </button>
        )}

      </div>
    </div>
  );
}