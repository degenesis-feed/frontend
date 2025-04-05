"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [description, setDescription] = useState<string>("");

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("feedme:user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed?.description) {
            setDescription(parsed.description);
          }
        } catch (err) {
          console.warn("Invalid user profile in localStorage.", err);
        }
      }
    }
  }, []);

  function formatEvent(event: FeedEvent, userAddress: string) {
    const isSender = event.from?.toLowerCase() === userAddress?.toLowerCase();
    const direction = isSender ? "sent" : "received";
    const counterparty = isSender ? event.to : event.from;

    const decimals = event.contract?.decimals ?? 18;
    const rawValue = Number(event.value ?? 0);
    const amount = (rawValue / Math.pow(10, decimals)).toFixed(2);

    const symbol = event.contract?.symbol ?? "UNKNOWN";
    const date = event.timestamp
      ? new Date(event.timestamp * 1000).toLocaleDateString()
      : "Unknown Date";

    return `You ${direction} ${amount} ${symbol} ${
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
            <p className="text-gray-500">
              {walletAddress ? shortenAddress(walletAddress) : "Not connected"}
            </p>

            {description && <p className="mt-4 text-gray-800">{description}</p>}

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
          {["posts"].map((tab) => (
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
            <div className="p-6 text-center text-gray-500">
              No activity found.
            </div>
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
