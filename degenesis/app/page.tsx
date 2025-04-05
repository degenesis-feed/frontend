"use client"

import { useState } from "react"
import { Bell, Bookmark, Hash, Home, Mail, MoreHorizontal, Search, User, Pizza } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import LeaderboardPage from "./components/LeaderboardPage"
import CommunitiesPage from "./components/CommunitiesPage"
import FollowingPage from "./components/FollowingPage"

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
  const [activeTab, setActiveTab] = useState("following")
  const [tweetText, setTweetText] = useState("")
  const [tweets, setTweets] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      handle: "@janecooper",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Just deployed my new portfolio website! Check it out at example.com 🚀",
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
  ])

  const handleTweet = () => {
    if (tweetText.trim() === "") return

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
    }

    setTweets([newTweet, ...tweets])
    setTweetText("")
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 text-orange-500 flex items-center justify-center">
                  <Pizza className="h-8 w-8" />
                </div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10">
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${activeTab === "communities" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"}`}
                onClick={() => setActiveTab("communities")}
              >
                Communities
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${activeTab === "leaderboard" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"}`}
                onClick={() => setActiveTab("leaderboard")}
              >
                Leaderboard
              </button>
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${activeTab === "following" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"}`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            </nav>
            <div className="flex items-center">
              <button className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
              <appkit-button />
            </div>
          </div>
          <div className="md:hidden flex justify-around border-t border-gray-100">
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${activeTab === "communities" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("communities")}
            >
              Communities
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${activeTab === "leaderboard" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Leaderboard
            </button>
            <button
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${activeTab === "following" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-20">
            <nav className="space-y-1">
              <Link
                href="#"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
              >
                <Home className="h-6 w-6 mr-4" />
                <span className="text-lg font-medium">Home</span>
              </Link>
            </nav>
            <button
              onClick={() => {
                setActiveTab("following")
                document.getElementById("tweet-input")?.focus()
              }}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full transition-colors"
            >
              Tweet
            </button>
          </div>
        </div>

        {/* Main Feed */}
        <div className="md:col-span-2">
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
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-20">
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-xl mb-3">Who to follow</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Jessica Wilson</div>
                    <div className="text-sm text-gray-500">@jessicaw</div>
                  </div>
                  <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-bold hover:bg-gray-800 transition-colors">
                    Follow
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Michael Chen</div>
                    <div className="text-sm text-gray-500">@mikechen</div>
                  </div>
                  <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-bold hover:bg-gray-800 transition-colors">
                    Follow
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Tech Insider</div>
                    <div className="text-sm text-gray-500">@techinsider</div>
                  </div>
                  <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-bold hover:bg-gray-800 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
              <button className="text-orange-500 hover:text-orange-600 text-sm mt-4 font-medium">Show more</button>
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3">
        <Link href="#" className="p-2 text-gray-700 hover:text-orange-500">
          <Home className="h-6 w-6" />
        </Link>
        <Link href="#" className="p-2 text-gray-700 hover:text-orange-500">
          <Search className="h-6 w-6" />
        </Link>
        <Link href="#" className="p-2 text-gray-700 hover:text-orange-500">
          <Bell className="h-6 w-6" />
        </Link>
        <Link href="#" className="p-2 text-gray-700 hover:text-orange-500">
          <Mail className="h-6 w-6" />
        </Link>
      </nav>
    </div>
  )
}

