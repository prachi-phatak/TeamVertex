import { useState } from "react";
import Onboarding from "./screens/Onboarding";
import Calendar from "./screens/Calendar";
import PostDetail from "./screens/PostDetail";
import Analytics from "./screens/Analytics";
import WhatsApp from "./screens/Whatsapp";
import Voice from "./screens/Voice";
import { generateContentPlan } from "./utils/GeminiAPI";

export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [posts, setPosts] = useState([]);
  const [business, setBusiness] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOnboardingSubmit = async (data) => {
    const generatedPosts = await generateContentPlan(data);
    setPosts(generatedPosts);
    setBusiness(data);
    setScreen("calendar");
  };

  return (
    <>
      {screen === "onboarding" && (
        <Onboarding onSubmit={handleOnboardingSubmit} />
      )}
      {screen === "calendar" && (
        <Calendar
          posts={posts}
          business={business}
          setScreen={setScreen}
          setSelectedPost={setSelectedPost}
        />
      )}
      {screen === "postDetail" && selectedPost && (
        <PostDetail
          post={selectedPost}
          setScreen={setScreen}
        />
      )}
      {screen === "analytics" && (
        <Analytics
          posts={posts}
          setScreen={setScreen}
        />
      )}
      {screen === "whatsapp" && (
        <WhatsApp
          posts={posts}
          setScreen={setScreen}
        />
      )}
      {screen === "voice" && (
        <Voice
          posts={posts}
          business={business}
          setScreen={setScreen}
        />
      )}
    </>
  );
}