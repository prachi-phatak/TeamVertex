import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const postTypes = [
  { label: "Product Showcase", emoji: "🛍️", tagline: "Discover Our Best!" },
  { label: "Festival Offer", emoji: "🎉", tagline: "Special Festival Deals!" },
  { label: "Sale Banner", emoji: "🔥", tagline: "Mega Sale — Limited Time!" },
  { label: "Brand Awareness", emoji: "⭐", tagline: "Your Satisfaction Is Our Priority!" },
  { label: "New Arrival", emoji: "✨", tagline: "Something New Has Arrived!" },
  { label: "Thank You", emoji: "🙏", tagline: "Thank You For Your Support!" },
];

const categoryPhotoIds = {
  Salon: [1061, 1065, 1043],
  Restaurant: [292, 431, 493],
  Clothing: [216, 325, 669],
  Electronics: [0, 119, 160],
  Grocery: [139, 102, 429],
  Other: [20, 48, 76],
};

const overlays = [
  { color1: "rgba(124,58,237,0.7)", color2: "rgba(219,39,119,0.7)" },
  { color1: "rgba(0,0,0,0.55)", color2: "rgba(15,23,42,0.8)" },
  { color1: "rgba(5,150,105,0.65)", color2: "rgba(6,78,59,0.8)" },
];

export default function ImageGen({ business, setScreen, logActivity }) {
  const [postType, setPostType] = useState(postTypes[0]);
  const [customTagline, setCustomTagline] = useState("");
  const [generated, setGenerated] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const buildImage = (photoId, overlay, tagline) =>
    new Promise((resolve) => {
      const W = 500, H = 500;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // 1. Draw real photo
        ctx.drawImage(img, 0, 0, W, H);

        // 2. Gradient overlay
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, overlay.color1);
        grad.addColorStop(1, overlay.color2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // 3. Top dark strip
        const topGrad = ctx.createLinearGradient(0, 0, 0, 90);
        topGrad.addColorStop(0, "rgba(0,0,0,0.75)");
        topGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, W, 90);

        // 4. Business name
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px Georgia, serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        ctx.shadowBlur = 6;
        ctx.fillText(business.name.toUpperCase(), W / 2, 48);

        // 5. Thin white line under name
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(80, 62); ctx.lineTo(W - 80, 62);
        ctx.stroke();

        // 6. Emoji
        ctx.font = "80px serif";
        ctx.textAlign = "center";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.fillText(postType.emoji, W / 2, 210);

        // 7. Tagline — word wrap
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 26px Georgia, serif";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        const words = tagline.split(" ");
        let line = "", y = 295;
        for (let w of words) {
          const test = line + w + " ";
          if (ctx.measureText(test).width > W - 80 && line) {
            ctx.fillText(line.trim(), W / 2, y);
            line = w + " "; y += 36;
          } else line = test;
        }
        ctx.fillText(line.trim(), W / 2, y);

        // 8. Bottom vignette
        const btm = ctx.createLinearGradient(0, H - 80, 0, H);
        btm.addColorStop(0, "rgba(0,0,0,0)");
        btm.addColorStop(1, "rgba(0,0,0,0.6)");
        ctx.fillStyle = btm;
        ctx.fillRect(0, H - 80, W, 80);

        ctx.shadowBlur = 0;
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };

      img.onerror = () => {
        const grad2 = ctx.createLinearGradient(0, 0, W, H);
        grad2.addColorStop(0, overlay.color1.replace("0.7", "1"));
        grad2.addColorStop(1, overlay.color2.replace("0.8", "1"));
        ctx.fillStyle = grad2; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fff"; ctx.font = "bold 22px Arial"; ctx.textAlign = "center";
        ctx.fillText(business.name.toUpperCase(), W / 2, 50);
        ctx.font = "72px serif"; ctx.fillText(postType.emoji, W / 2, 200);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };

      img.src = `https://picsum.photos/id/${photoId}/500/500`;
    });

  const handleGenerate = async () => {
    setLoading(true);
    setGenerated([]);
    const category = business.category || "Other";
    const ids = categoryPhotoIds[category] || categoryPhotoIds["Other"];
    const tagline = customTagline || postType.tagline;
    const results = [];
    for (let i = 0; i < 3; i++) {
      const url = await buildImage(ids[i], overlays[i], tagline);
      results.push({ url, label: `Style ${i + 1}` });
    }
    setGenerated(results);
    setSelected(results[0]);
    setLoading(false);
    logActivity("generate_images", { businessName: business.name, type: postType.label, tagline });
  };

  const handleDownload = () => {
    if (!selected) return;
    const link = document.createElement("a");
    link.href = selected.url;
    link.download = `${business.name}-post.jpg`;
    link.click();
    logActivity("download_image", { businessName: business.name });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="p-2 bg-pink-500/20 rounded-lg">🎨</span>
            Creative Assets
          </h2>
          <p className="text-purple-200/40 mt-1">Design your brand assets with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest mb-4 ml-1">Post Style</p>
            <div className="grid grid-cols-2 gap-3">
              {postTypes.map(t => (
                <button key={t.label} onClick={() => setPostType(t)}
                  className={`py-4 px-4 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-2 ${postType.label === t.label ? "bg-pink-500/20 border-pink-500/40 text-pink-300" : "bg-white/5 border-white/5 text-purple-200/40 hover:bg-white/10"}`}>
                  <span className="text-xl">{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest mb-4 ml-1">Custom Tagline</p>
            <input type="text" value={customTagline} onChange={e => setCustomTagline(e.target.value)} placeholder={postType.tagline}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-white/10" />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold shadow-xl shadow-pink-500/20 disabled:opacity-50">
            {loading ? "Designing..." : "Generate 3 Variations"}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-[40px] p-8 min-h-[450px]">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.url} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 flex flex-col items-center w-full">
                <div className="relative group">
                  <img src={selected.url} className="w-full max-w-[300px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10" alt="Preview" />
                  <button onClick={handleDownload} className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl text-white font-bold backdrop-blur-sm">
                    Click to Download
                  </button>
                </div>

                <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10">
                  {generated.map((img, i) => (
                    <div key={i} onClick={() => setSelected(img)} className={`w-14 h-14 rounded-xl cursor-pointer overflow-hidden border-2 transition-all ${selected.url === img.url ? "border-pink-500 scale-105" : "border-transparent opacity-50"}`}>
                      <img src={img.url} className="w-full h-full object-cover" alt="Thumb" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <p className="text-purple-200/20 font-bold uppercase tracking-widest text-xs">Awaiting Generation</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
