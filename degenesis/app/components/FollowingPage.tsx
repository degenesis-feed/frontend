"use client"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

interface Tweet {
  id: number
  name: string
  handle: string
  avatar: string
  content: string
  time: string
  comments: number
  retweets: number
  likes: number
}

interface FollowingPageProps {
  tweets: Tweet[]
  tweetText: string
  setTweetText: (text: string) => void
  handleTweet: () => void
}

export default function FollowingPage({ tweets, tweetText, setTweetText, handleTweet }: FollowingPageProps) {
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
              src="/placeholder.svg?height=40&width=40"
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
            <div className="flex space-x-2">
            </div>
            <button
              onClick={handleTweet}
              disabled={!tweetText.trim()}
              className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 px-4 rounded-full transition-colors ${!tweetText.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>

      {/* Tweets */}
      {tweets.map((tweet) => (
        <div key={tweet.id} className="border-b border-gray-100 px-4 py-3 hover:bg-gray-50 transition-colors">
          <div className="flex">
            <div className="mr-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src={tweet.avatar || "/placeholder.svg"}
                  alt={tweet.name}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold text-gray-900">{tweet.name}</span>
                <span className="ml-2 text-gray-500">{tweet.handle}</span>
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
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}

