export default function Navbar({ screen, setScreen }) {
  const tabs = [
    { id: "calendar", emoji: "📅", label: "Calendar" },
    { id: "whatsapp", emoji: "💬", label: "WhatsApp" },
    { id: "voice", emoji: "🎙️", label: "Voice" },
    { id: "analytics", emoji: "📊", label: "Analytics" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-4 pt-2"
      style={{ background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex gap-2 max-w-md mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className="flex-1 py-2.5 flex flex-col items-center gap-0.5 rounded-xl transition-all text-xs font-medium"
            style={{
              background: screen === tab.id
                ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.3))"
                : "rgba(255,255,255,0.04)",
              border: screen === tab.id
                ? "1px solid rgba(139,92,246,0.4)"
                : "1px solid rgba(255,255,255,0.06)",
              color: screen === tab.id ? "#a78bfa" : "rgba(255,255,255,0.3)"
            }}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}