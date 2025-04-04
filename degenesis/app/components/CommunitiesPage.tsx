"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Users, UserPlus, Eye } from "lucide-react"

interface Community {
  id: number
  name: string
  description: string
  members: number
  image: string
  joined: boolean
}

export default function CommunitiesPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: 1,
      name: "Tech Enthusiasts",
      description: "A community for tech lovers to discuss the latest trends and innovations.",
      members: 1245,
      image: "/placeholder.svg?height=80&width=80",
      joined: false,
    },
    {
      id: 2,
      name: "Web Developers",
      description: "Connect with other web developers and share your knowledge and experiences.",
      members: 3782,
      image: "/placeholder.svg?height=80&width=80",
      joined: true,
    },
    {
      id: 3,
      name: "UI/UX Designers",
      description: "Share design inspiration, get feedback, and discuss design principles.",
      members: 952,
      image: "/placeholder.svg?height=80&width=80",
      joined: false,
    },
  ])

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) return

    const newCommunity: Community = {
      id: Date.now(),
      name,
      description,
      members: 1,
      image: "/placeholder.svg?height=80&width=80",
      joined: true,
    }

    setCommunities([newCommunity, ...communities])
    setName("")
    setDescription("")
  }

  const toggleJoin = (id: number) => {
    setCommunities(
      communities.map((community) =>
        community.id === id
          ? {
              ...community,
              joined: !community.joined,
              members: community.joined ? community.members - 1 : community.members + 1,
            }
          : community,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Create Community Form */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Create a Community</h2>
        <form onSubmit={handleCreateCommunity}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Community Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter community name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="What's this community about?"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Create Community
          </button>
        </form>
      </div>

      {/* Communities List */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-bold">Communities</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {communities.map((community) => (
            <div key={community.id} className="p-6">
              <div className="flex items-start">
                <div className="h-20 w-20 rounded-lg bg-gray-200 overflow-hidden mr-4">
                  <Image
                    src={community.image || "/placeholder.svg"}
                    alt={community.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{community.name}</h3>
                  <p className="text-gray-600 mt-1">{community.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleJoin(community.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      community.joined
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    } transition-colors`}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {community.joined ? "Joined" : "Join"}
                  </button>
                  <button className="flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

