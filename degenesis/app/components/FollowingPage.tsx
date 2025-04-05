"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { fetchFeed } from "../lib/following";
import { useAccount } from "wagmi";

interface Tweet {
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
  likes: number     // contract address
}


interface FollowingPageProps {
  tweetText: string;
  setTweetText: (text: string) => void;
  handleTweet: () => void;
}

export default function FollowingPage({
  tweetText,
  setTweetText,
  handleTweet,
}: FollowingPageProps) {
  const { address } = useAccount();
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    if (!address) return;
  
    const loadFeed = async () => {
      try {
        const rawFeed = await fetchFeed(address);
  
        const transformed = rawFeed.map((item: any, idx: number) => {
          const value = item?.value ?? "0";
          const to = item?.to ?? "0x0000000000000000000000000000000000000000";
          const timestamp = item?.timestamp;
          const time = timestamp
            ? new Date(timestamp * 1000).toLocaleString()
            : "Just now";
  
          return {
            id: item?.transactionHash || `tx-${idx}`,
            name: item?.contract?.name || "Unnamed Token",
            handle: item?.contract?.symbol
              ? `@${item.contract.symbol}`
              : "@unknown",
            avatar: "/feedme.webp",
            content: `Sent ${(Number(value) / 1e18).toFixed(4)} tokens to ${to.slice(0, 6)}...${to.slice(-4)}`,
            time,
            from: item?.from ?? "unknown",
            to,
            value,
            transactionHash: item?.transactionHash ?? "unknown",
            contractAddress: item?.contract?.address ?? "",
            comments: Math.floor(Math.random() * 5),
            retweets: Math.floor(Math.random() * 10),
            likes: Math.floor(Math.random() * 50),
          };
        });
  
        setTweets(transformed);
      } catch (err) {
        console.error("❌ Failed to fetch or transform feed:", err);
      }
    };
  
    loadFeed();
  }, [address]);
  
  

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-xl font-bold">Home</h2>
      </div>

      {/* Tweet Composer */}
      <div className="border-b border-gray-100 px-4 py-3 flex">
        <div className="mr-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="/feedme.webp?height=40&width=40"
              alt="Your profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <textarea
            id="tweet-input"
            className="w-full border-0 focus:ring-0 text-lg placeholder-gray-400 py-2 resize-none"
            placeholder="What's happening?"
            rows={2}
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex space-x-2"></div>
            <button
              onClick={handleTweet}
              disabled={!tweetText.trim()}
              className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 px-4 rounded-full transition-colors ${
                !tweetText.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      {tweets.map((tweet, idx) => (
        <div
          key={tweet.id || idx}
          className="border-b border-gray-100 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex">
            <div className="mr-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src="/feedme.webp"
                  alt="User avatar" // alt added
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold text-gray-900">{tweet.from}</span>
                <span className="mx-1 text-gray-500">·</span>
                <span className="text-gray-500">{tweet.time}</span>
                <button className="ml-auto p-1 text-gray-500 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1 text-gray-800">{tweet.content}</div>
              <div className="mt-3 flex justify-between max-w-md">
                <button className="flex items-center text-gray-500 hover:text-orange-500 group">
                  <div className="p-1.5 rounded-full group-hover:bg-orange-50 transition-colors">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-1 text-xs">{tweet.comments}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
