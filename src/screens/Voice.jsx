import { useState, useRef } from "react";
import Navbar from "../components/Navbar";

export default function Voice({ posts, business, setScreen }) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  // Use refs to track state inside async speech callbacks
  const pausedRef = useRef(false);
  const currentIndexRef = useRef(0);

  const totalReach = posts.reduce((sum, p) => sum + p.reach, 0);
  const avgEngagement = (posts.reduce((sum, p) => sum + p.engagement, 0) / posts.length).toFixed(1);
  const bestPost = posts.reduce((best, p) => p.reach > best.reach ? p : best, posts[0]);

  const briefingLines = [
    `Good morning! Here is your daily briefing for ${business.name}.`,
    `You have ${posts.length} posts scheduled this week across Instagram, Facebook, WhatsApp and LinkedIn.`,
    `Your estimated total reach is ${(totalReach / 1000).toFixed(1)} thousand people.`,
    `Average engagement rate is ${avgEngagement} percent.`,
    `Your best performing post is on ${bestPost?.day} for ${bestPost?.platform} with ${bestPost?.reach.toLocaleString()} estimated reach.`,
    `Your content tone is ${business.tone} and your goal is ${business.goal}.`,
    `Keep posting consistently to grow your ${business.category} business. Good luck!`
  ];

  const speakFrom = (startIndex) => {
    pausedRef.current = false;

    const speakLine = (index) => {
      // Stop if paused or finished
      if (pausedRef.current) return;
      if (index >= briefingLines.length) {
        setPlaying(false);
        setPlayed(true);
        setPaused(false);
        return;
      }

      currentIndexRef.current = index;
      setCurrentLine(index);

      const utterance = new SpeechSynthesisUtterance(briefingLines[index]);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;
      utterance.lang = "en-IN";

      // Pick best available voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        v.lang.includes("en-IN") ||
        v.lang.includes("en-GB") ||
        v.name.toLowerCase().includes("google")
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => {
        if (!pausedRef.current) {
          speakLine(index + 1);
        }
      };

      utterance.onerror = () => {
        if (!pausedRef.current) {
          speakLine(index + 1);
        }
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    setTimeout(() => speakLine(startIndex), 300);
  };

  const handlePlay = () => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support voice! Please use Chrome.");
      return;
    }
    pausedRef.current = false;
    currentIndexRef.current = 0;
    window.speechSynthesis.cancel();
    setPlaying(true);
    setPlayed(false);
    setPaused(false);
    setCurrentLine(0);
    speakFrom(0);
  };

  const handlePause = () => {
    // Set paused flag so next onend callback stops
    pausedRef.current = true;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setPaused(true);
  };

  const handleContinue = () => {
    pausedRef.current = false;
    setPaused(false);
    setPlaying(true);
    setPlayed(false);
    // Continue from saved index
    speakFrom(currentIndexRef.current);
  };

  const handleReset = () => {
    pausedRef.current = true;
    window.speechSynthesis.cancel();
    setPlayed(false);
    setPlaying(false);
    setPaused(false);
    setCurrentLine(0);
    currentIndexRef.current = 0;
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">

      {/* Background orb */}
      <div className="fixed top-20 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />

      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-8 pb-5"
        style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}>
              🎙️ Voice Briefing
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Your daily AI audio summary
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <span className="text-xs text-yellow-300 font-medium">ElevenLabs</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-5">

        {/* Main Player Card */}
        <div className="rounded-3xl p-6 text-center"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(245,158,11,0.1))", border: "1px solid rgba(139,92,246,0.3)" }}>

          {/* Animated mic icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            {playing && (
              <>
                <div className="absolute w-24 h-24 rounded-full animate-ping"
                  style={{ background: "rgba(139,92,246,0.2)" }} />
                <div className="absolute w-20 h-20 rounded-full animate-pulse"
                  style={{ background: "rgba(139,92,246,0.15)" }} />
              </>
            )}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #f59e0b)", boxShadow: "0 8px 25px rgba(124,58,237,0.4)" }}>
              <span className="text-2xl">
                {playing ? "🔊" : paused ? "⏸️" : "🎙️"}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Daily Business Briefing
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            {business.name} • {posts.length} posts this week
          </p>

          {/* Currently speaking line */}
          {playing && (
            <div className="rounded-2xl p-4 mb-5"
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", minHeight: "70px" }}>
              <p className="text-sm text-white" style={{ lineHeight: 1.7 }}>
                🗣️ {briefingLines[currentLine]}
              </p>
              <div className="flex justify-center gap-1.5 mt-3">
                {briefingLines.map((_, i) => (
                  <div key={i} className="rounded-full transition-all duration-300"
                    style={{
                      background: i === currentLine ? "#a78bfa"
                        : i < currentLine ? "rgba(167,139,250,0.4)"
                        : "rgba(255,255,255,0.15)",
                      width: i === currentLine ? "20px" : "6px",
                      height: "6px"
                    }} />
                ))}
              </div>
            </div>
          )}

          {/* Paused info */}
          {paused && !playing && (
            <div className="rounded-2xl p-3 mb-4"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
              <p className="text-yellow-300 text-sm font-medium">
                ⏸ Paused at line {currentLine + 1} of {briefingLines.length}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                "{briefingLines[currentLine].slice(0, 50)}..."
              </p>
            </div>
          )}

          {/* Completed */}
          {played && !playing && !paused && (
            <div className="rounded-2xl p-4 mb-5"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <p className="text-green-400 font-medium text-lg">✅ Briefing Complete!</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                You're all caught up for today
              </p>
            </div>
          )}

          {/* Initial Play Button */}
          {!playing && !played && !paused && (
            <button
              onClick={handlePlay}
              className="w-full py-4 rounded-2xl font-semibold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #f59e0b)",
                boxShadow: "0 8px 25px rgba(124,58,237,0.35)"
              }}
            >
              ▶ Play Daily Briefing
            </button>
          )}

          {/* Playing buttons */}
          {playing && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-1.5 py-2">
                {[14, 22, 18, 28, 16, 24, 12].map((h, i) => (
                  <div key={i} className="w-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(to top, #7c3aed, #a78bfa)",
                      height: `${h}px`,
                      animation: `pulse ${0.4 + i * 0.1}s ease-in-out infinite alternate`
                    }} />
                ))}
                <span className="text-sm text-violet-300 ml-3 font-medium">Speaking...</span>
              </div>
              <button
                onClick={handlePause}
                className="w-full py-3 rounded-2xl text-sm font-semibold transition-all"
                style={{
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171"
                }}
              >
                ⏸ Pause
              </button>
            </div>
          )}

          {/* Paused buttons */}
          {paused && !playing && (
            <div className="space-y-3">
              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-2xl font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #f59e0b)",
                  boxShadow: "0 8px 25px rgba(124,58,237,0.35)"
                }}
              >
                ▶ Continue Briefing
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-2xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)"
                }}
              >
                🔄 Start Over
              </button>
            </div>
          )}

          {/* Completed button */}
          {played && !playing && !paused && (
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-2xl text-sm font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)"
              }}
            >
              🔄 Play Again
            </button>
          )}

        </div>

        {/* Full Script */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            📄 Full Script
          </h3>
          <div className="space-y-3">
            {briefingLines.map((line, i) => (
              <div key={i} className="flex gap-3 transition-all duration-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={{
                    background: playing && i === currentLine
                      ? "rgba(139,92,246,0.4)"
                      : paused && i === currentLine
                      ? "rgba(245,158,11,0.3)"
                      : played ? "rgba(34,197,94,0.2)"
                      : "rgba(255,255,255,0.06)",
                    border: playing && i === currentLine
                      ? "1px solid rgba(139,92,246,0.7)"
                      : paused && i === currentLine
                      ? "1px solid rgba(245,158,11,0.5)"
                      : "1px solid rgba(255,255,255,0.08)"
                  }}>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {played ? "✓" : i + 1}
                  </span>
                </div>
                <p className="text-sm transition-all duration-300" style={{
                  color: playing && i === currentLine
                    ? "rgba(255,255,255,0.95)"
                    : paused && i === currentLine
                    ? "rgba(245,158,11,0.9)"
                    : "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  fontWeight: (playing || paused) && i === currentLine ? 600 : 400
                }}>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ElevenLabs Badge */}
        <div className="rounded-2xl p-4 text-center"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <p className="text-sm" style={{ color: "rgba(245,158,11,0.8)" }}>
            🎵 Powered by <strong>ElevenLabs</strong> Voice AI
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            Natural human-like voice synthesis • Use Chrome for best results
          </p>
        </div>

      </div>

      <Navbar screen="voice" setScreen={setScreen} />
    </div>
  );
}
