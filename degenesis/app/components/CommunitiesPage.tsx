"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Users, Eye } from "lucide-react"
import { useRouter, useSearchParams} from 'next/navigation'

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
  const [verificationType, setVerificationType] = useState("")
  const [loading,] = useState(false)

  const [communities, setCommunities] = useState<Community[]>([
    {
      id: 1,
      name: "Tech Enthusiasts from Taiwan",
      description: "A community for tech lovers to discuss the latest trends and innovations.",
      members: 1245,
      image: "/placeholder.svg?height=80&width=80",
      joined: false,
    },
    {
      id: 2,
      name: "Web Developers from USA",
      description: "Connect with other web developers and share your knowledge and experiences.",
      members: 3782,
      image: "/placeholder.svg?height=80&width=80",
      joined: true,
    },
    {
      id: 3,
      name: "UI/UX Designers from Europe",
      description: "Share design inspiration, get feedback, and discuss design principles.",
      members: 952,
      image: "/placeholder.svg?height=80&width=80",
      joined: false,
    },
  ])

  const router = useRouter()
  const searchParams = useSearchParams();

const communityId = searchParams.get("communityId");

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

  const handleJoinClick = (communityId: number) => {
    if (!verificationType) {
      alert("Please select a verification type.")
      return
    }
  
    // Redirect to verification page with query params
    router.push(`/verification?type=${verificationType}&communityId=${communityId}`)
  }

  useEffect(() => {
    const stored = localStorage.getItem("feedme:communities");
    if (stored) {
      setCommunities(JSON.parse(stored));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("feedme:communities", JSON.stringify(communities));
  }, [communities]);
  
  

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
           {/* Verification Type Selector */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Select What You Want to Verify</h2>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={verificationType}
          onChange={(e) => setVerificationType(e.target.value)}
        >
          <option value="">-- Select Verification Type --</option>
          <option value="age">Age</option>
          <option value="nationality">Nationality</option>
          <option value="gender">Gender</option>
        </select>
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
                    src={"/feedme.webp"}
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
                    onClick={() => handleJoinClick(community.id)}
                    disabled={loading}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      community.joined
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    } transition-colors`}
                  >
                    {loading ? "Verifying..." : "Join"}
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
