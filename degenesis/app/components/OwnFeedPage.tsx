"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, LinkIcon } from "lucide-react";
import { useAccount } from "wagmi";
import { fetchOwnFeed } from "../lib/feed";

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
  const { address: walletAddress } = useAccount();
  const [posts, setPosts] = useState<FeedEvent[]>([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (!walletAddress) return;

    const loadFeed = async () => {
      try {
        const data = await fetchOwnFeed(walletAddress);
        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching own feed:", err);
      }
    };

    loadFeed();
  }, [walletAddress]);

  function formatEvent(event: FeedEvent, userAddress: string) {
    const isSender = event.from.toLowerCase() === userAddress.toLowerCase();
    const direction = isSender ? "sent" : "received";
    const counterparty = isSender ? event.to : event.from;
    const amount = (Number(event.value) / Math.pow(10, event.contract?.decimals)).toFixed(2);
    const date = new Date(event.timestamp * 1000).toLocaleDateString();

    return `You ${direction} ${amount} ${event.contract.symbol} ${
      isSender ? "to" : "from"
    } ${shortenAddress(counterparty)} on ${date}`;
  }

  function shortenAddress(addr: string): string {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600 relative">
          <Image
            src="/feedme.webp"
            alt="Cover photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden h-32 w-32 bg-white shadow-md">
            <Image
              src="/feedme.webp?height=128&width=128"
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
            <h1 className="text-2xl font-bold">FeedMe User</h1>
            <p className="text-gray-500">{walletAddress ? shortenAddress(walletAddress) : "Not connected"}</p>

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
                  feedme.xyz
                </a>
              </div>
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined 2024</span>
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

        {/* Feed */}
        <div className="divide-y divide-gray-100">
          {posts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No activity found.</div>
          ) : (
            posts.map((event, idx) => (
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
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(event.transactionHash)}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
