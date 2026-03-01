import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function History({ token }) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            console.log("Fetching history with token:", token ? token.substring(0, 10) + "..." : "null");
            try {
                const res = await fetch("http://localhost:3001/api/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                console.log("History data received:", data);
                setActivities(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchHistory();
        else setLoading(false);
    }, [token]);

    const getActionLabel = (type) => {
        const labels = {
            generate_caption: "🤖 Generated Caption",
            generate_ideas: "💡 Brainstormed Ideas",
            generate_images: "🎨 Created Visuals",
            download_image: "⬇️ Downloaded Asset",
            login: "🔑 Account Login",
            signup: "✨ New Account",
            complete_onboarding: "🚀 Setup Completed",
            schedule_post: "📅 Scheduled Content"
        };
        return labels[type] || type;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-8 pb-20"
        >
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <span className="p-2 bg-purple-500/20 rounded-lg">📜</span>
                        Activity History
                    </h2>
                    <p className="text-purple-200/40 mt-1">Timeline of your brand's growth</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : activities.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-20 text-center">
                    <p className="text-purple-200/20 font-bold uppercase tracking-widest text-sm">No activities recorded yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {activities.map((activity, idx) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-[32px] transition-all relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start gap-4 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase rounded-full tracking-wider border border-white/10">
                                                {getActionLabel(activity.action_type)}
                                            </span>
                                            <time className="text-[10px] text-purple-200/40 uppercase font-mono">
                                                {new Date(activity.created_at).toLocaleString()}
                                            </time>
                                        </div>

                                        <div className="text-purple-100/80 text-sm line-clamp-2 mt-2">
                                            {activity.action_details?.result ||
                                                activity.action_details?.tagline ||
                                                activity.action_details?.businessName ||
                                                activity.action_details?.caption ||
                                                (typeof activity.action_details === 'string' ? activity.action_details : "Activity logged successfully.")}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedActivity(activity)}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        Details
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] -mr-16 -mt-16 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedActivity && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedActivity(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#151520] border border-white/10 w-full max-w-2xl rounded-[40px] p-10 relative z-10 shadow-3xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30 uppercase tracking-widest">
                                    {getActionLabel(selectedActivity.action_type)}
                                </span>
                                <button onClick={() => setSelectedActivity(null)} className="text-white/40 hover:text-white text-xl">✕</button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-purple-200/40 uppercase tracking-widest mb-2">Timestamp</p>
                                    <p className="text-white font-mono">{new Date(selectedActivity.created_at).toLocaleString()}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-purple-200/40 uppercase tracking-widest mb-2">Details</p>
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-purple-100 leading-relaxed whitespace-pre-wrap">
                                        {selectedActivity.action_details?.result || JSON.stringify(selectedActivity.action_details, null, 2)}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedActivity(null)}
                                className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all"
                            >
                                Close Details
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
