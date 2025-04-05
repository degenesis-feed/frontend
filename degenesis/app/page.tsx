"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LeaderboardPage from "./components/LeaderboardPage";
import CommunitiesPage from "./components/CommunitiesPage";
import FollowingPage from "./components/FollowingPage";
import OwnFeedPage from "./components/OwnFeedPage";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { base, baseSepolia } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = "d679b0acafc801412fd613c2ebe6a961";

// 2. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [base, baseSepolia],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export default function TwitterFrontend() {
  const [activeTab, setActiveTab] = useState("following");
  const [tweetText, setTweetText] = useState("");
  const [tweets, setTweets] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      handle: "@janecooper",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Just deployed my new portfolio website! Check it out at example.com 🚀",
      time: "2h",
      comments: 5,
      retweets: 12,
      likes: 28,
    },
    {
      id: 2,
      name: "Alex Johnson",
      handle: "@alexj",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Excited to announce that I'll be speaking at the upcoming tech conference next month! Who else is going to be there?",
      time: "4h",
      comments: 8,
      retweets: 24,
      likes: 76,
    },
    {
      id: 3,
      name: "Tech News",
      handle: "@technews",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Breaking: New AI model released today shows remarkable improvements in natural language understanding and generation.",
      time: "5h",
      comments: 15,
      retweets: 112,
      likes: 324,
    },
    {
      id: 4,
      name: "Sarah Miller",
      handle: "@sarahm",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Just finished reading an amazing book on design systems. Highly recommend for all UX designers out there!",
      time: "8h",
      comments: 3,
      retweets: 7,
      likes: 42,
    },
  ]);

  const handleTweet = () => {
    if (tweetText.trim() === "") return;

    const newTweet = {
      id: Date.now(),
      name: "Your Name",
      handle: "@yourhandle",
      avatar: "/placeholder.svg?height=40&width=40",
      content: tweetText,
      time: "now",
      comments: 0,
      retweets: 0,
      likes: 0,
    };

    setTweets([newTweet, ...tweets]);
    setTweetText("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 text-orange-500 flex items-center justify-center">
                  <Image
                    src="/feedme.webp"
                    alt="Profile"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover"
                  />
                </div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10">
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "following"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "communities"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
                onClick={() => setActiveTab("communities")}
              >
                Communities
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "leaderboard"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
                onClick={() => setActiveTab("leaderboard")}
              >
                Leaderboard
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "ownfeed"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
                onClick={() => setActiveTab("ownfeed")}
              >
                My Profile
              </button>
            </nav>
            <div className="flex items-center">
              <button className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Profile"
                    width={50}
                    height={50}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
              <appkit-button />
            </div>
          </div>
          <div className="md:hidden flex justify-around border-t border-gray-100">
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "communities"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("communities")}
            >
              Communities
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "leaderboard"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Leaderboard
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "following"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "ownfeed"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("ownfeed")}
            >
              My Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-start justify-center">
        <main className="max-w-3xl w-full px-4 py-6">
          {/* Main Feed */}
          <div className="w-full">
            {activeTab === "following" && (
              <FollowingPage
                tweets={tweets}
                tweetText={tweetText}
                setTweetText={setTweetText}
                handleTweet={handleTweet}
              />
            )}

            {activeTab === "communities" && <CommunitiesPage />}

            {activeTab === "leaderboard" && <LeaderboardPage />}
            
            {activeTab === "ownfeed" && <OwnFeedPage />}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3">
        <Link href="#" className="p-2 text-gray-700 hover:text-orange-500">
          <Home className="h-6 w-6" />
        </Link>
      </nav>
    </div>
  );
}