import Image from "next/image"
import { Trophy, TrendingUp, Users, MessageSquare } from "lucide-react"

interface LeaderboardUser {
  id: number
  rank: number
  name: string
  handle: string
  avatar: string
  score: number
  followers: number
  tweets: number
  engagement: number
}

export default function LeaderboardPage() {
  const leaderboardUsers: LeaderboardUser[] = [
    {
      id: 1,
      rank: 1,
      name: "Kartik Talwar",
      handle: "@kartik.eth",
      avatar: "/feedme.webp?height=60&width=60",
      score: 9845,
      followers: 125000,
      tweets: 3420,
      engagement: 8.7,
    },
    {
      id: 2,
      rank: 2,
      name: "Vitalik Buterin",
      handle: "@vitalik.eth",
      avatar: "/feedme.webp?height=60&width=60",
      score: 8932,
      followers: 98500,
      tweets: 2876,
      engagement: 7.9,
    },
    {
      id: 3,
      rank: 3,
      name: "Sarah Williams",
      handle: "@sarahw",
      avatar: "/feedme.webp?height=60&width=60",
      score: 8721,
      followers: 87300,
      tweets: 4210,
      engagement: 6.8,
    },
    {
      id: 4,
      rank: 4,
      name: "Michael Brown",
      handle: "@michaelb",
      avatar: "/feedme.webp?height=60&width=60",
      score: 7654,
      followers: 76200,
      tweets: 1987,
      engagement: 9.2,
    },
    {
      id: 5,
      rank: 5,
      name: "Jessica Lee",
      handle: "@jessical",
      avatar: "/feedme.webp?height=60&width=60",
      score: 7321,
      followers: 65800,
      tweets: 2543,
      engagement: 8.1,
    },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="h-6 w-6 mr-2" />
          Top Influencers Leaderboard
        </h2>
        <p className="mt-2 opacity-90">The most influential users based on engagement, followers, and activity</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-12 text-sm font-medium text-gray-500 border-b border-gray-200 pb-4 mb-4">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-right">Score</div>
          <div className="col-span-2 text-right">Followers</div>
          <div className="col-span-2 text-right">Engagement</div>
        </div>

        {leaderboardUsers.map((user) => (
          <div
            key={user.id}
            className={`grid grid-cols-12 items-center py-4 ${
              user.rank <= 3 ? "bg-orange-50" : ""
            } hover:bg-gray-50 transition-colors rounded-lg px-2`}
          >
            <div className="col-span-1">
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                ${
                  user.rank === 1
                    ? "bg-yellow-400 text-white"
                    : user.rank === 2
                      ? "bg-gray-300 text-gray-800"
                      : user.rank === 3
                        ? "bg-amber-700 text-white"
                        : "bg-gray-100 text-gray-600"
                }
              `}
              >
                {user.rank}
              </div>
            </div>

            <div className="col-span-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.handle}</div>
              </div>
            </div>

            <div className="col-span-2 text-right font-bold text-gray-900">
              {user.score.toLocaleString()}
              <div className="text-xs text-gray-500 font-normal flex items-center justify-end">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{Math.floor(Math.random() * 10) + 1}%
              </div>
            </div>

            <div className="col-span-2 text-right">
              <div className="font-medium text-gray-900">{(user.followers / 1000).toFixed(1)}K</div>
              <div className="text-xs text-gray-500 flex items-center justify-end">
                <Users className="h-3 w-3 mr-1" />
                {user.tweets.toLocaleString()} tweets
              </div>
            </div>

            <div className="col-span-2 text-right">
              <div className="font-medium text-gray-900">{user.engagement}%</div>
              <div className="text-xs text-gray-500 flex items-center justify-end">
                <MessageSquare className="h-3 w-3 mr-1" />
                Avg. response
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

