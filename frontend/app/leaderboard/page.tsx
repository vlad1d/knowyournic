import { Trophy, TrendingUp, Crown, Medal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import { cn } from "@/lib/utils"

const leaderboardData = [
  {
    rank: 1,
    username: "MusicMogul",
    netWorth: 2847392.45,
    totalReturn: 156.7,
    winRate: 78.5,
    avatar: "MM",
    badge: "crown",
  },
  {
    rank: 2,
    username: "SwiftTrader",
    netWorth: 2134567.89,
    totalReturn: 134.2,
    winRate: 72.3,
    avatar: "ST",
    badge: "gold",
  },
  {
    rank: 3,
    username: "BeatInvestor",
    netWorth: 1923847.12,
    totalReturn: 128.9,
    winRate: 69.8,
    avatar: "BI",
    badge: "silver",
  },
  {
    rank: 4,
    username: "RhythmRich",
    netWorth: 1756432.33,
    totalReturn: 115.4,
    winRate: 65.2,
    avatar: "RR",
    badge: "bronze",
  },
  {
    rank: 5,
    username: "MelodyMaster",
    netWorth: 1654321.78,
    totalReturn: 108.7,
    winRate: 63.9,
    avatar: "MM",
    badge: null,
  },
  {
    rank: 6,
    username: "SoundSavvy",
    netWorth: 1543210.45,
    totalReturn: 102.3,
    winRate: 61.4,
    avatar: "SS",
    badge: null,
  },
  {
    rank: 7,
    username: "TuneTrader",
    netWorth: 1432109.67,
    totalReturn: 98.9,
    winRate: 59.7,
    avatar: "TT",
    badge: null,
  },
  {
    rank: 8,
    username: "HarmonyHunter",
    netWorth: 1321098.23,
    totalReturn: 94.5,
    winRate: 57.8,
    avatar: "HH",
    badge: null,
  },
]

const getBadgeIcon = (badge: string | null) => {
  switch (badge) {
    case "crown":
      return <Crown className="h-4 w-4 text-yellow-400" />
    case "gold":
      return <Medal className="h-4 w-4 text-yellow-400" />
    case "silver":
      return <Medal className="h-4 w-4 text-gray-400" />
    case "bronze":
      return <Medal className="h-4 w-4 text-amber-600" />
    default:
      return null
  }
}

export default function LeaderboardPage() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <RevealOnView className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl font-bold">Leaderboard</h1>
            </div>
            <p className="text-xl text-white/70">Top music traders by net worth and performance</p>
          </RevealOnView>

          {/* Top 3 Podium */}
          <RevealOnView delay={0.1} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="md:order-1 md:mt-8">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-400/20 to-gray-600/20 p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center font-bold text-xl mx-auto">
                      {leaderboardData[1].avatar}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Medal className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{leaderboardData[1].username}</h3>
                  <div className="text-2xl font-bold mb-2">${leaderboardData[1].netWorth.toLocaleString()}</div>
                  <div className="text-green-400 font-medium">+{leaderboardData[1].totalReturn.toFixed(1)}%</div>
                  <div className="text-sm text-white/60 mt-2">Win Rate: {leaderboardData[1].winRate}%</div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="md:order-2">
                <div className="rounded-2xl border border-yellow-400/30 bg-gradient-to-b from-yellow-400/20 to-yellow-600/20 p-6 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="relative mb-4 mt-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-2xl mx-auto">
                      {leaderboardData[0].avatar}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-1">{leaderboardData[0].username}</h3>
                  <div className="text-3xl font-bold mb-2">${leaderboardData[0].netWorth.toLocaleString()}</div>
                  <div className="text-green-400 font-medium text-lg">
                    +{leaderboardData[0].totalReturn.toFixed(1)}%
                  </div>
                  <div className="text-sm text-white/60 mt-2">Win Rate: {leaderboardData[0].winRate}%</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="md:order-3 md:mt-8">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-amber-600/20 to-amber-800/20 p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center font-bold text-xl mx-auto">
                      {leaderboardData[2].avatar}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Medal className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{leaderboardData[2].username}</h3>
                  <div className="text-2xl font-bold mb-2">${leaderboardData[2].netWorth.toLocaleString()}</div>
                  <div className="text-green-400 font-medium">+{leaderboardData[2].totalReturn.toFixed(1)}%</div>
                  <div className="text-sm text-white/60 mt-2">Win Rate: {leaderboardData[2].winRate}%</div>
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Full Leaderboard Table */}
          <RevealOnView delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-semibold text-white/80">Rank</th>
                      <th className="text-left p-4 font-semibold text-white/80">Trader</th>
                      <th className="text-right p-4 font-semibold text-white/80">Net Worth</th>
                      <th className="text-right p-4 font-semibold text-white/80">Total Return</th>
                      <th className="text-right p-4 font-semibold text-white/80">Win Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((trader, idx) => (
                      <tr key={trader.username} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "font-bold text-lg",
                                trader.rank === 1 && "text-yellow-400",
                                trader.rank === 2 && "text-gray-400",
                                trader.rank === 3 && "text-amber-600",
                              )}
                            >
                              #{trader.rank}
                            </span>
                            {getBadgeIcon(trader.badge)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                                trader.rank === 1 && "bg-gradient-to-r from-yellow-400 to-yellow-600",
                                trader.rank === 2 && "bg-gradient-to-r from-gray-400 to-gray-600",
                                trader.rank === 3 && "bg-gradient-to-r from-amber-600 to-amber-800",
                                trader.rank > 3 && "bg-gradient-to-r from-purple-500 to-blue-500",
                              )}
                            >
                              {trader.avatar}
                            </div>
                            <div>
                              <div className="font-semibold">{trader.username}</div>
                              {trader.rank <= 3 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-white/10 text-white border-white/20 text-xs mt-1"
                                >
                                  Top Performer
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono">${trader.netWorth.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1 font-medium text-green-400">
                            <TrendingUp className="h-3 w-3" />+{trader.totalReturn.toFixed(1)}%
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium">{trader.winRate.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealOnView>

          {/* Your Rank */}
          <RevealOnView delay={0.3} className="mt-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
              <h2 className="text-xl font-semibold mb-4">Your Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-yellow-400">#47</div>
                  <div className="text-sm text-white/60">Current Rank</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold">$12,847</div>
                  <div className="text-sm text-white/60">Net Worth</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-green-400">+10.8%</div>
                  <div className="text-sm text-white/60">Total Return</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold">64.2%</div>
                  <div className="text-sm text-white/60">Win Rate</div>
                </div>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </main>
  )
}
