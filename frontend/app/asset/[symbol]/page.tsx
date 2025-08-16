"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, TrendingDown, Play, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data - in real app this would come from API
const assetData = {
  symbol: "SWIFT",
  name: "Taylor Swift",
  type: "artist",
  price: 156.78,
  change: 12.45,
  changePercent: 8.6,
  volume: 2847392,
  marketCap: 15.2,
  description: "American singer-songwriter known for narrative songs about her personal life.",
  stats: {
    monthlyListeners: "83.2M",
    followers: "92.1M",
    topSongs: 15,
    albums: 10,
    lastRelease: "2022-10-21",
  },
}

const priceHistory = [
  { time: "09:00", price: 148.23 },
  { time: "10:00", price: 151.45 },
  { time: "11:00", price: 149.87 },
  { time: "12:00", price: 153.21 },
  { time: "13:00", price: 156.78 },
]

export default function AssetDetailPage({ params }: { params: { symbol: string } }) {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState("")
  const [orderMode, setOrderMode] = useState<"market" | "limit">("market")
  const [limitPrice, setLimitPrice] = useState("")

  const isPositive = assetData.change >= 0

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <RevealOnView className="mb-6">
            <Button asChild variant="ghost" className="text-white/70 hover:text-white">
              <Link href="/market">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Market
              </Link>
            </Button>
          </RevealOnView>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Asset Info & Chart */}
            <div className="lg:col-span-2 space-y-6">
              {/* Asset Header */}
              <RevealOnView>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl">
                        {assetData.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-2xl font-bold">{assetData.symbol}</h1>
                          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                            {assetData.type}
                          </Badge>
                        </div>
                        <p className="text-white/70">{assetData.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${assetData.price.toFixed(2)}</div>
                      <div
                        className={cn(
                          "flex items-center gap-1 text-lg font-medium",
                          isPositive ? "text-green-400" : "text-red-400",
                        )}
                      >
                        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {isPositive ? "+" : ""}
                        {assetData.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70">{assetData.description}</p>
                </div>
              </RevealOnView>

              {/* Price Chart */}
              <RevealOnView delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {priceHistory.map((point, idx) => (
                      <div key={point.time} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-sm mb-2"
                          style={{ height: `${(point.price / 160) * 100}%` }}
                        />
                        <span className="text-xs text-white/50">{point.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnView>

              {/* Spotify Stats */}
              <RevealOnView delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h2 className="text-xl font-semibold mb-4">Spotify Statistics</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <Users className="h-6 w-6 mx-auto mb-2 text-white/70" />
                      <div className="text-lg font-bold">{assetData.stats.monthlyListeners}</div>
                      <div className="text-sm text-white/60">Monthly Listeners</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <Play className="h-6 w-6 mx-auto mb-2 text-white/70" />
                      <div className="text-lg font-bold">{assetData.stats.followers}</div>
                      <div className="text-sm text-white/60">Followers</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2 text-white/70" />
                      <div className="text-lg font-bold">{assetData.stats.topSongs}</div>
                      <div className="text-sm text-white/60">Top Songs</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-white/70" />
                      <div className="text-lg font-bold">{assetData.stats.albums}</div>
                      <div className="text-sm text-white/60">Albums</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5 md:col-span-2">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-white/70" />
                      <div className="text-lg font-bold">{assetData.stats.lastRelease}</div>
                      <div className="text-sm text-white/60">Last Release</div>
                    </div>
                  </div>
                </div>
              </RevealOnView>
            </div>

            {/* Right Column - Trading Panel */}
            <div className="space-y-6">
              <RevealOnView delay={0.3}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Trade {assetData.symbol}</h2>

                  {/* Buy/Sell Toggle */}
                  <div className="flex rounded-lg bg-white/5 p-1 mb-4">
                    <button
                      onClick={() => setOrderType("buy")}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                        orderType === "buy" ? "bg-green-500 text-white" : "text-white/70 hover:text-white",
                      )}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setOrderType("sell")}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                        orderType === "sell" ? "bg-red-500 text-white" : "text-white/70 hover:text-white",
                      )}
                    >
                      Sell
                    </button>
                  </div>

                  {/* Order Type */}
                  <div className="flex rounded-lg bg-white/5 p-1 mb-4">
                    <button
                      onClick={() => setOrderMode("market")}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                        orderMode === "market" ? "bg-white/10 text-white" : "text-white/70 hover:text-white",
                      )}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderMode("limit")}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                        orderMode === "limit" ? "bg-white/10 text-white" : "text-white/70 hover:text-white",
                      )}
                    >
                      Limit
                    </button>
                  </div>

                  {/* Quantity Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  {/* Limit Price Input */}
                  {orderMode === "limit" && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white/70 mb-2">Limit Price</label>
                      <input
                        type="number"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-white/5 rounded-lg p-3 mb-4 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/70">Current Price:</span>
                      <span>${assetData.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/70">Quantity:</span>
                      <span>{quantity || "0"}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${((Number.parseFloat(quantity) || 0) * assetData.price).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    className={cn(
                      "w-full rounded-lg",
                      orderType === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600",
                    )}
                    disabled={!quantity}
                  >
                    {orderType === "buy" ? "Buy" : "Sell"} {assetData.symbol}
                  </Button>

                  {/* Market Stats */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="font-medium mb-3">Market Stats</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">24h Volume:</span>
                        <span>{assetData.volume.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Market Cap:</span>
                        <span>${assetData.marketCap.toFixed(1)}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">24h Change:</span>
                        <span className={isPositive ? "text-green-400" : "text-red-400"}>
                          {isPositive ? "+" : ""}
                          {assetData.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnView>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
