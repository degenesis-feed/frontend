"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CommunityPage() {
  const { id } = useParams()
  interface Community {
    id: string
    name: string
    description: string
    members: number
  }

  const [community, setCommunity] = useState<Community | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("feedme:communities")
    if (stored) {
      const all = JSON.parse(stored)
      const found = all.find((c: any) => c.id.toString() === id)
      setCommunity(found)
    }
  }, [id])

  if (!community) return <p className="p-6">Loading community...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{community.name}</h1>
      <p className="text-gray-600 mt-2">{community.description}</p>
      <p className="text-gray-500 mt-1">{community.members} members</p>
    </div>
  )
}
