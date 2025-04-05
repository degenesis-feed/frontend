"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  LinkIcon,
  MoreHorizontal,
  MessageSquare,
  Repeat,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react"

interface Post {
  id: number
  content: string
  images?: string[]
  likes: number
  comments: number
  reposts: number
  timestamp: string
  bookmarked?: boolean
  liked?: boolean
}

export default function OwnFeedPage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content:
        "Just launched my new portfolio website! Check it out and let me know what you think 🚀 #webdev #portfolio",
      images: ["/placeholder.svg?height=300&width=600"],
      likes: 42,
      comments: 7,
      reposts: 3,
      timestamp: "2h ago",
      bookmarked: false,
      liked: true,
    },
    {
      id: 2,
      content:
        "Working on a new design system for my latest project. Excited to share more details soon! #design #ui #ux",
      likes: 28,
      comments: 5,
      reposts: 2,
      timestamp: "1d ago",
      bookmarked: true,
      liked: false,
    },
    {
      id: 3,
      content:
        "Had an amazing time at the tech conference yesterday. Met so many talented developers and learned a ton about the latest trends in web development. Looking forward to implementing some of these ideas in my upcoming projects! #techconf #networking",
      images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
      likes: 76,
      comments: 12,
      reposts: 8,
      timestamp: "2d ago",
      bookmarked: false,
      liked: true,
    },
  ])

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const toggleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600 relative">
          <Image src="/placeholder.svg?height=400&width=1200" alt="Cover photo" fill className="object-cover" />
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6 relative">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden h-32 w-32 bg-white shadow-md">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-end pt-4">
            <button className="px-4 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Edit profile
            </button>
          </div>

          {/* Name and Bio */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold">Alex Johnson</h1>
            <p className="text-gray-500">@alexjohnson</p>

            <p className="mt-4 text-gray-800">
              Frontend developer & UI/UX enthusiast. Building beautiful web experiences with React & Next.js. Always
              learning, always creating.
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
                <span className="font-bold">1,234</span> <span className="text-gray-500">Following</span>
              </div>
              <div>
                <span className="font-bold">5,678</span> <span className="text-gray-500">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-4 text-center font-medium ${activeTab === "posts" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${activeTab === "replies" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("replies")}
          >
            Replies
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${activeTab === "media" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${activeTab === "likes" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("likes")}
          >
            Likes
          </button>
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Profile"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900">Alex Johnson</span>
                    <span className="ml-2 text-gray-500">@alexjohnson</span>
                    <span className="mx-1 text-gray-500">·</span>
                    <span className="text-gray-500">{post.timestamp}</span>
                    <button className="ml-auto p-1 text-gray-500 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 text-gray-800">{post.content}</div>

                  {/* Post Images */}
                  {post.images && (
                    <div
                      className={`mt-3 grid ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2 rounded-xl overflow-hidden`}
                    >
                      {post.images.map((image, index) => (
                        <div
                          key={index}
                          className={`${post.images && post.images.length === 1 ? "col-span-2" : ""} aspect-video bg-gray-100 relative`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Post image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Engagement Buttons */}
                  <div className="mt-4 flex justify-between max-w-md">
                    <button className="flex items-center text-gray-500 hover:text-orange-500 group">
                      <div className="p-1.5 rounded-full group-hover:bg-orange-50 transition-colors">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <span className="ml-1 text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-green-500 group">
                      <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors">
                        <Repeat className="h-5 w-5" />
                      </div>
                      <span className="ml-1 text-sm">{post.reposts}</span>
                    </button>
                    <button
                      className={`flex items-center ${post.liked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"} group`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <div
                        className={`p-1.5 rounded-full ${post.liked ? "bg-pink-50" : "group-hover:bg-pink-50"} transition-colors`}
                      >
                        <Heart className={`h-5 w-5 ${post.liked ? "fill-current" : ""}`} />
                      </div>
                      <span className="ml-1 text-sm">{post.likes}</span>
                    </button>
                    <button
                      className={`flex items-center ${post.bookmarked ? "text-orange-500" : "text-gray-500 hover:text-orange-500"} group`}
                      onClick={() => toggleBookmark(post.id)}
                    >
                      <div
                        className={`p-1.5 rounded-full ${post.bookmarked ? "bg-orange-50" : "group-hover:bg-orange-50"} transition-colors`}
                      >
                        <Bookmark className={`h-5 w-5 ${post.bookmarked ? "fill-current" : ""}`} />
                      </div>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-orange-500 group">
                      <div className="p-1.5 rounded-full group-hover:bg-orange-50 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Post Analytics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Profile visits</span>
              <span className="font-medium">1,245</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Post impressions</span>
              <span className="font-medium">8,392</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: "90%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Engagement rate</span>
              <span className="font-medium">4.7%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: "47%" }}></div>
            </div>
          </div>
        </div>
        <button className="mt-4 text-orange-500 hover:text-orange-600 text-sm font-medium">
          View detailed analytics
        </button>
      </div>
    </div>
  )
}