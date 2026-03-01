import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateAICaption } from "../utils/GeminiAPI";

const platforms = ["Instagram", "Facebook", "WhatsApp", "LinkedIn"];
const contentTypes = ["Product Promotion", "Festival Offer", "Customer Review", "Behind the Scenes", "Tips & Tricks", "New Arrival"];
const tones = ["Friendly", "Formal", "Funny", "Inspirational"];

export default function AIContent({ business, setScreen, logActivity }) {
  const [platform, setPlatform] = useState("Instagram");
  const [contentType, setContentType] = useState("Product Promotion");
  const [tone, setTone] = useState("Friendly");
  const [customNote, setCustomNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setCopied(false);
    try {
      const prompt = `You are a social media expert for Indian small businesses.
Write a ${tone.toLowerCase()} ${platform} post caption for:
Business: ${business.name}
Category: ${business.category}
Content Type: ${contentType}
Target Audience: ${business.audience}
${customNote ? `Additional Note: ${customNote}` : ""}

Requirements:
- Write ONLY the caption text
- Make it engaging for Indian audience
- Include 1-2 relevant emojis
- Keep it under 150 words
- End with a call to action
- Add 5 relevant hashtags at the end`;

      const caption = await generateAICaption(prompt);
      setResult(caption);
      logActivity("generate_caption", { platform, contentType, tone, businessName: business.name, result: caption });
    } catch (e) {
      setResult("❌ Error generating caption. Please check your API key.");
    }
    setLoading(false);
  };

  const handleGenerateIdeas = async () => {
    setLoadingIdeas(true);
    try {
      const prompt = `Generate 6 creative social media content ideas for an Indian ${business.category} business called "${business.name}".
Return ONLY a JSON array of 6 strings. Each string is a short content idea (under 15 words).`;

      const response = await generateAICaption(prompt);
      const clean = response.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setIdeas(parsed);
      logActivity("generate_ideas", { businessName: business.name, ideas: parsed });
    } catch (e) {
      setIdeas(["Share a special offer", "Post a testimonial", "Feature a product", "Tell your store story", "Offer tips", "Celebrate a festival"]);
    }
    setLoadingIdeas(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    logActivity("copy_caption", { platform, businessName: business.name });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="p-2 bg-indigo-500/20 rounded-lg">🤖</span>
            AI Content Studio
          </h2>
          <p className="text-purple-200/40 mt-1">Indian Business Edition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest mb-4">Platform</p>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${platform === p ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "bg-white/5 border-white/5 text-purple-200/40"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest mb-4">Tone</p>
            <div className="grid grid-cols-2 gap-2">
              {tones.map(t => (
                <button key={t} onClick={() => setTone(t)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${tone === t ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "bg-white/5 border-white/5 text-purple-200/40"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
          <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest mb-4">Goal</p>
          <div className="space-y-2">
            {contentTypes.map(t => (
              <button key={t} onClick={() => setContentType(t)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-left border transition-all ${contentType === t ? "bg-pink-500/20 border-pink-500/40 text-pink-300" : "bg-white/5 border-white/5 text-purple-200/40"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
        <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest mb-4">Additional Note</p>
        <input type="text" value={customNote} onChange={e => setCustomNote(e.target.value)} placeholder="e.g. 20% off for Mumbai customers"
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button onClick={handleGenerate} disabled={loading} className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold shadow-xl shadow-indigo-500/20">
          {loading ? "Generating..." : "✨ Craft Caption"}
        </button>
        <button onClick={handleGenerateIdeas} disabled={loadingIdeas} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold">
          {loadingIdeas ? "Brainstorming..." : "💡 Get Ideas"}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/10 rounded-[32px] p-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">{platform} CONTENT</span>
              <button onClick={handleCopy} className="px-4 py-2 bg-indigo-500/20 rounded-xl text-xs font-bold">{copied ? "✓ Copied" : "Copy"}</button>
            </div>
            <p className="text-white text-lg whitespace-pre-wrap">{result}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ideas.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea, i) => (
              <div key={i} onClick={() => setCustomNote(idea)} className="p-5 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group">
                <p className="text-sm text-purple-200 group-hover:text-white">{idea}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}