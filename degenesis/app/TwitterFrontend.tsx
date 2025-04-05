"use client";
import { useState, useEffect } from "react";
import { Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LeaderboardPage from "./components/LeaderboardPage";
import CommunitiesPage from "./components/CommunitiesPage";
import FollowingPage from "./components/FollowingPage";
import OwnFeedPage from "./components/OwnFeedPage";
import SearchOverlay from "./components/SearchOverlay";
import { signupUser } from "./lib/signup"; // Adjust the import path as necessary
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { fetchFeed } from "./lib/following";

type Tweet = {
    id: number
    name: string                  // token name
    handle: string                // token symbol
    avatar?: string               // optional, if you ever get logo
    content: string               // transfer summary
    time: string                  // formatted timestamp
    from: string                  // sender address
    to: string                    // receiver address
    value: string                 // raw value
    transactionHash: string       // tx hash
    contractAddress: string  
    comments: number
    retweets: number
    likes: number     
};

export default function TwitterFrontend() {
  const { address } = useAccount();

  const [activeTab, setActiveTab] = useState("following");
  const [tweetText, setTweetText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [_, setSearchResults] = useState<any[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [_userProfile, setUserProfile] = useState<{
    wallet: string;
    description: string;
    signedUp: boolean;
  } | null>(null);

  const [tweets, setTweets] = useState<any[]>([]);
  const [userDescription, setUserDescription] = useState("Hey there! I'm new here 🚀");


  useEffect(() => {
    const trySignup = async () => {
      if (!address) return;
  
      const stored = localStorage.getItem("feedme:user");
      let parsed = null;
  
      try {
        parsed = stored ? JSON.parse(stored) : null;
      } catch {
        localStorage.removeItem("feedme:user");
      }
  
      if (parsed?.wallet?.toLowerCase() === address.toLowerCase()) {
        setUserProfile(parsed);
        setWalletAddress(address);
        return;
      }
  
      try {
        const res = await signupUser(address, userDescription);
        const userData = {
          wallet: address,
          description: userDescription,
          signedUp: true,
        };
        localStorage.setItem("feedme:user", JSON.stringify(userData));
        setUserProfile(userData);
        setWalletAddress(address);
        console.log("✅ Signup successful:", res.message);
      } catch (err) {
        console.error("❌ Signup failed:", err);
      }
    };
  
    trySignup();
  }, [address]);
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!address) return;
      try {
        const profile = await signupUser(address, "Default description");
        setUserProfile(profile);
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [address]);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would fetch search results from an API
    console.log(`Searching for: ${query}`);

    // For demo purposes, we'll filter tweets that contain the query
    if (query.trim()) {
      const filteredTweets = tweets.filter(
        (tweet) =>
          tweet.content.toLowerCase().includes(query.toLowerCase()) ||
          tweet.name.toLowerCase().includes(query.toLowerCase()) ||
          tweet.handle.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredTweets);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (!address) return;

    const loadFeed = async () => {
      try {
        const rawFeed = await fetchFeed(address);

        const transformedTweets: Tweet[] = rawFeed.map(
          (item: any, idx: number) => ({
            id: item.transactionHash || `${idx}`, // fallback if tx hash is missing
            name: item.contract?.name || "Anonymous",
            handle: item.from?.slice(0, 6) + "..." + item.from?.slice(-4),
            avatar: "/feedme.webp", // placeholder
            content: `Sent ${Number(item.value) / 1e18} tokens to ${item.to}`,
            time: new Date(item.timestamp * 1000).toLocaleString(),
            comments: Math.floor(Math.random() * 10), // fake for now
            retweets: Math.floor(Math.random() * 10),
            likes: Math.floor(Math.random() * 100),
          })
        );

        setTweets(transformedTweets);
      } catch (err) {
        console.error("Failed to fetch feed", err);
      }
    };

    loadFeed();
  }, [address]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        walletAddress={walletAddress} // ✅ pass this in
      />
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 text-orange-500 flex items-center justify-center">
                  <Image
                    src="/feedme.webp"
                    alt="FeedMe Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10">
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "following"
                    ? "text-[--feedme-red] border-b-2 border-[--feedme-red]"
                    : "text-gray-700 hover:text-[--feedme-red]"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "communities"
                    ? "text-[--feedme-red] border-b-2 border-[--feedme-red]"
                    : "text-gray-700 hover:text-[--feedme-red]"
                }`}
                onClick={() => setActiveTab("communities")}
              >
                Communities
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "leaderboard"
                    ? "text-[--feedme-red] border-b-2 border-[--feedme-red]"
                    : "text-gray-700 hover:text-[--feedme-red]"
                }`}
                onClick={() => setActiveTab("leaderboard")}
              >
                Leaderboard
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "ownfeed"
                    ? "text-[--feedme-red] border-b-2 border-[--feedme-red]"
                    : "text-gray-700 hover:text-[--feedme-red]"
                }`}
                onClick={() => setActiveTab("ownfeed")}
              >
                My Profile
              </button>
            </nav>
            <div className="flex items-center">
              <button
                className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors relative"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
                {searchQuery && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-[--feedme-red] rounded-full"></span>
                )}
              </button>
            </div>
            <div className="flex items-center">
              <ConnectButton />
            </div>
          </div>
          <div className="md:hidden flex justify-around border-t border-gray-100">
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "communities"
                  ? "text-[--feedme-red] border-b-2 border-orange-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("communities")}
            >
              Communities
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "leaderboard"
                  ? "text-orange-500 border-b-2 border-[--feedme-red]"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Leaderboard
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "following"
                  ? "text-[--feedme-red] border-b-2 border-[--feedme-red]"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
                activeTab === "ownfeed"
                  ? "text-[--feedme-red] border-b-2 border-[--feedme-red]"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("ownfeed")}
            >
              My Profile
            </button>
          </div>
        </div>
      </header>

      {!_userProfile?.signedUp && address && (
  <div className="max-w-3xl w-full px-4 mt-4 mx-auto">
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg shadow">
      <label htmlFor="desc" className="block font-semibold mb-1 text-sm text-gray-700">
        Enter a short profile bio:
      </label>
      <textarea
        id="desc"
        rows={3}
        placeholder="Hey there! I'm new here 🚀"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[feedme-red]"
        value={userDescription}
        onChange={(e) => setUserDescription(e.target.value)}
      />
      <button
        className="mt-2 bg-orange-500 hover:bg-[feedme-red-dark] text-white font-bold py-1.5 px-4 rounded-full"
        onClick={() => {
          localStorage.removeItem("feedme:user");
          window.location.reload();
        }}
      >
        Save & Sign Up Again
      </button>
    </div>
  </div>
)}


      {/* Main Content */}
      <div className="flex-grow flex items-start justify-center">
        <main className="max-w-3xl w-full px-4 py-6">
          {/* Main Feed */}
          <div className="w-full">
            {activeTab === "following" && (
              <FollowingPage
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
        <Link href="#" className="p-2 text-gray-700 hover:text-[--feedme-red]">
          <Home className="h-6 w-6" />
        </Link>
      </nav>
    </div>
  );
}
