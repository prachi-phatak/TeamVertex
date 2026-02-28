import { useState } from "react";

const categories = ["Restaurant", "Clothing", "Electronics", "Salon", "Grocery", "Other"];
const tones = ["Formal", "Friendly", "Funny", "Inspirational"];
const goals = ["More Followers", "Drive Sales", "Brand Awareness", "Promote Offer"];

export default function Onboarding({ onSubmit }) {
  const [apiKey, setApiKey] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!apiKey || !name || !category || !audience || !tone || !goal) {
      setError("Please fill all fields!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSubmit({ apiKey, name, category, audience, tone, goal });
    } catch (e) {
      setError("API Error! Check your API key.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">🚀 MarketAI</h1>
        <p className="text-gray-500 mb-8">AI-powered marketing for your business</p>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-5">

          <div>
            <label className="text-sm font-semibold text-gray-700">Claude API Key</label>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Business Name</label>
            <input
              type="text"
              placeholder="e.g. Sharma Sweets"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
            >
              <option value="">Select category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Target Audience</label>
            <input
              type="text"
              placeholder="e.g. families in Mumbai aged 25-45"
              value={audience}
              onChange={e => setAudience(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Brand Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`p-2 rounded-xl text-sm font-medium border transition-all ${
                    tone === t
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Your Goal</label>
            <div className="grid grid-cols-2 gap-2">
              {goals.map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`p-2 rounded-xl text-sm font-medium border transition-all ${
                    goal === g
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-lg disabled:opacity-50"
          >
            {loading ? "⏳ Generating your plan..." : "Generate My Content Plan →"}
          </button>

        </div>
      </div>
    </div>
  );
}