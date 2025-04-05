"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, LinkIcon, MoreHorizontal } from "lucide-react";
import { fetchOwnFeed } from "../lib/feed"; // Make sure this path is correct

interface FeedEvent {
  from: string;
  to: string;
  value: string;
  timestamp: number;
  transactionHash: string;
  contract: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
}

export default function OwnFeedPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [posts, setPosts] = useState<FeedEvent[]>([]);
  const [activeTab, setActiveTab] = useState("posts");

  // 🔌 Listen for Reown AppKit wallet connect event
  useEffect(() => {
    const handleWalletConnected = (event: any) => {
      const address = event.detail?.address;
      if (address) {
        setWalletAddress(address);
      }
    };

    window.addEventListener("appkit:connected", handleWalletConnected);

    return () => {
      window.removeEventListener("appkit:connected", handleWalletConnected);
    };
  }, []);

  // 🔄 Optional: Check if already connected
  useEffect(() => {
    const checkInitialConnection = () => {
      const detail = (window as any).appkit?.connection?.getState?.();
      if (detail?.address) {
        setWalletAddress(detail.address);
      }
    };

    checkInitialConnection();
  }, []);

  function formatEvent(event: FeedEvent, userAddress: string) {
    const isSender = event.from.toLowerCase() === userAddress.toLowerCase();
    const direction = isSender ? "sent" : "received";
    const counterparty = isSender ? event.to : event.from;
    const amount = (
      Number(event.value) / Math.pow(10, event.contract.decimals)
    ).toFixed(2);
    const date = new Date(event.timestamp * 1000).toLocaleDateString();

    return `You ${direction} ${amount} ${event.contract.symbol} ${
      isSender ? "to" : "from"
    } ${shortenAddress(counterparty)} on ${date}`;
  }

  function shortenAddress(addr: string): string {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  // 🧠 Fetch own feed when wallet is available
  useEffect(() => {
    const loadFeed = async () => {
      if (!walletAddress) return;

      try {
        const data = await fetchOwnFeed(walletAddress);
        console.log('====================================');
        console.log("Fetched own feed:", data);
        console.log('====================================');
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching own feed:", error);
      }
    };

    loadFeed();
  }, [walletAddress]);

  return (
    <div className="space-y-4">
      {/* Profile + Posts */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600 relative">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Cover photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden h-32 w-32 bg-white shadow-md">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button className="px-4 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Edit profile
            </button>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold">Alex Johnson</h1>
            <p className="text-gray-500">@alexjohnson</p>

            <p className="mt-4 text-gray-800">
              Frontend developer & UI/UX enthusiast. Building beautiful web
              experiences with React & Next.js. Always learning, always
              creating.
            </p>

            <div className="flex flex-wrap gap-y-2 mt-3 text-gray-500">
              <div className="flex items-center mr-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center mr-4">
                <LinkIcon className="h-4 w-4 mr-1" />
                <a href="#" className="text-orange-500 hover:underline">
                  alexjohnson.dev
                </a>
              </div>
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined March 2020</span>
              </div>
            </div>

            <div className="flex mt-4">
              <div className="mr-4">
                <span className="font-bold">1,234</span>{" "}
                <span className="text-gray-500">Following</span>
              </div>
              <div>
                <span className="font-bold">5,678</span>{" "}
                <span className="text-gray-500">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-100">
          {["posts", "replies", "media", "likes"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === tab
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-100">
          {posts.map((event, idx) => (
            <div key={idx} className="p-4 border-b border-gray-100">
              <div className="text-gray-800">
                {formatEvent(event, walletAddress!)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Tx:{" "}
                <a
                  href={`https://basescan.org/tx/${event.transactionHash}`}
                  className="text-orange-500 underline"
                  target="_blank"
                >
                  {shortenAddress(event.transactionHash)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
