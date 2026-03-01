import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const categories = ["Restaurant", "Clothing", "Electronics", "Salon", "Grocery", "Other"];
const tones = ["Formal", "Friendly", "Funny", "Inspirational"];
const goals = ["More Followers", "Drive Sales", "Brand Awareness", "Promote Offer"];

const toneEmojis = { Formal: "👔", Friendly: "😊", Funny: "😂", Inspirational: "✨" };
const goalEmojis = { "More Followers": "📈", "Drive Sales": "💰", "Brand Awareness": "🌟", "Promote Offer": "🎁" };

export default function BusinessProfile({ business, onSubmit }) {
    const [name, setName] = useState(business?.name || "");
    const [category, setCategory] = useState(business?.category || "");
    const [audience, setAudience] = useState(business?.audience || "");
    const [tone, setTone] = useState(business?.tone || "");
    const [goal, setGoal] = useState(business?.goal || "");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    // Pre-fill whenever business prop changes (e.g. after login)
    useEffect(() => {
        if (business) {
            setName(business.name || "");
            setCategory(business.category || "");
            setAudience(business.audience || "");
            setTone(business.tone || "");
            setGoal(business.goal || "");
        }
    }, [business]);

    const handleSubmit = async () => {
        if (!name || !category || !audience || !tone || !goal) {
            setError("Please fill all fields!");
            return;
        }
        setError("");
        setSaved(false);
        setLoading(true);
        try {
            await onSubmit({ name, category, audience, tone, goal });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) {
            setError(e.message || "Something went wrong!");
        }
        setLoading(false);
    };

    const isFirstTime = !business?.name;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen gradient-bg noise pb-24"
        >
            {/* Background orbs */}
            <div className="fixed top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
            <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

            <div className="max-w-lg mx-auto px-4 pt-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                        <span className="text-3xl">🏢</span>
                    </div>
                    <h2 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Business <span style={{ color: "#a78bfa" }}>Profile</span>
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {isFirstTime ? "Set up your business to get started" : "Update your business details anytime"}
                    </p>
                </div>

                {/* Saved banner */}
                {saved && (
                    <div className="mb-4 p-3 rounded-xl text-center text-sm font-semibold"
                        style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
                        ✅ Business profile saved successfully!
                    </div>
                )}

                {/* Form */}
                <div className="glass rounded-3xl p-8 space-y-6">

                    {/* Business Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Business Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Sharma Sweets"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="input-dark w-full p-3 rounded-xl text-sm"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="input-dark w-full p-3 rounded-xl text-sm"
                        >
                            <option value="">Select category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Target Audience */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Target Audience
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. families in Mumbai aged 25-45"
                            value={audience}
                            onChange={e => setAudience(e.target.value)}
                            className="input-dark w-full p-3 rounded-xl text-sm"
                        />
                    </div>

                    {/* Brand Tone */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Brand Tone
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {tones.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className="p-3 rounded-xl text-sm font-medium transition-all"
                                    style={{
                                        background: tone === t ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "rgba(255,255,255,0.05)",
                                        border: tone === t ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.08)",
                                        color: tone === t ? "white" : "rgba(255,255,255,0.6)",
                                        boxShadow: tone === t ? "0 4px 15px rgba(124,58,237,0.3)" : "none"
                                    }}
                                >
                                    {toneEmojis[t]} {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Your Goal
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {goals.map(g => (
                                <button
                                    key={g}
                                    onClick={() => setGoal(g)}
                                    className="p-3 rounded-xl text-sm font-medium transition-all"
                                    style={{
                                        background: goal === g ? "linear-gradient(135deg, #db2777, #be185d)" : "rgba(255,255,255,0.05)",
                                        border: goal === g ? "1px solid rgba(236,72,153,0.6)" : "1px solid rgba(255,255,255,0.08)",
                                        color: goal === g ? "white" : "rgba(255,255,255,0.6)",
                                        boxShadow: goal === g ? "0 4px 15px rgba(219,39,119,0.3)" : "none"
                                    }}
                                >
                                    {goalEmojis[g]} {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-xl p-3 text-sm"
                            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Save Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary w-full py-4 rounded-2xl text-white font-semibold text-base"
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Saving...
                            </span>
                        ) : isFirstTime ? "Generate My Content Plan →" : "Save Business Profile ✅"}
                    </button>
                </div>

                <p className="text-center mt-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Powered by AI • Built for Indian Businesses
                </p>
            </div>
        </motion.div>
    );
}
