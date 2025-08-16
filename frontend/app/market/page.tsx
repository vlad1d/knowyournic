"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import { cn } from "@/lib/utils"
import Link from "next/link"

const marketData = [
  {
    symbol: "SWIFT",
    name: "Taylor Swift",
    price: 156.78,
    change: 12.45,
    changePercent: 8.6,
    volume: 2847392,
    type: "artist",
    marketCap: 15.2,
  },
  {
    symbol: "DRAKE",
    name: "Drake",
    price: 142.33,
    change: -5.67,
    changePercent: -3.8,
    volume: 2134567,
    type: "artist",
    marketCap: 14.8,
  },
  {
    symbol: "POP",
    name: "Pop Music Genre",
    price: 89.23,
    change: -2.34,
    changePercent: -2.6,
    volume: 1923847,
    type: "genre",
    marketCap: 8.9,
  },
  {
    symbol: "HIPHOP",
    name: "Hip Hop Genre",
    price: 95.67,
    change: 7.89,
    changePercent: 9.0,
    volume: 1756432,
    type: "genre",
    marketCap: 9.6,
  },
  {
    symbol: "FLOWERS",
    name: "Flowers - Miley Cyrus",
    price: 34.56,
    change: 5.67,
    changePercent: 19.6,
    volume: 892374,
    type: "song",
    marketCap: 3.5,
  },
  {
    symbol: "UNHOLY",
    name: "Unholy - Sam Smith",
    price: 28.9,
    change: -1.23,
    changePercent: -4.1,
    volume: 654321,
    type: "song",
    marketCap: 2.9,
  },
  {
    symbol: "WEEKND",
    name: "The Weeknd",
    price: 134.22,
    change: 3.45,
    changePercent: 2.6,
    volume: 1987654,
    type: "artist",
    marketCap: 13.4,
  },
  {
    symbol: "ROCK",
    name: "Rock Genre",
    price: 67.89,
    change: 1.23,
    changePercent: 1.8,
    volume: 1234567,
    type: "genre",
    marketCap: 6.8,
  },
]

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("marketCap")

  const filteredData = marketData
    .filter(
      (item) =>
        (selectedType === "all" || item.type === selectedType) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "marketCap":
          return b.marketCap - a.marketCap
        case "price":
          return b.price - a.price
        case "change":
          return b.changePercent - a.changePercent
        case "volume":
          return b.volume - a.volume
        default:
          return 0
      }
    })

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealOnView className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Market Overview</h1>
            <p className="text-xl text-white/70">Live prices for all tradeable music assets</p>
          </RevealOnView>

          {/* Filters */}
          <RevealOnView delay={0.1} className="mb-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>

                {/* Type Filter */}
                <div className="flex gap-2">
                  {["all", "artist", "genre", "song"].map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "rounded-full capitalize",
                        selectedType !== type && "bg-white/5 border-white/20 hover:bg-white/10",
                      )}
                    >
                      {type}
                    </Button>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="marketCap">Market Cap</option>
                  <option value="price">Price</option>
                  <option value="change">% Change</option>
                  <option value="volume">Volume</option>
                </select>
              </div>
            </div>
          </RevealOnView>

          {/* Market Table */}
          <RevealOnView delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-semibold text-white/80">Asset</th>
                      <th className="text-right p-4 font-semibold text-white/80">Price</th>
                      <th className="text-right p-4 font-semibold text-white/80">24h Change</th>
                      <th className="text-right p-4 font-semibold text-white/80">Volume</th>
                      <th className="text-right p-4 font-semibold text-white/80">Market Cap</th>
                      <th className="text-right p-4 font-semibold text-white/80">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, idx) => {
                      const isPositive = item.change >= 0
                      return (
                        <tr key={item.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                                {item.symbol.slice(0, 2)}
                              </div>
                              <div>
                                <div className="font-semibold">{item.symbol}</div>
                                <div className="text-sm text-white/60 flex items-center gap-2">
                                  {item.name}
                                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                                    {item.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right font-mono">${item.price.toFixed(2)}</td>
                          <td className="p-4 text-right">
                            <div
                              className={cn(
                                "flex items-center justify-end gap-1 font-medium",
                                isPositive ? "text-green-400" : "text-red-400",
                              )}
                            >
                              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {isPositive ? "+" : ""}
                              {item.changePercent.toFixed(2)}%
                            </div>
                            <div className="text-xs text-white/50">
                              {isPositive ? "+" : ""}${item.change.toFixed(2)}
                            </div>
                          </td>
                          <td className="p-4 text-right font-mono text-sm">{item.volume.toLocaleString()}</td>
                          <td className="p-4 text-right font-mono">${item.marketCap.toFixed(1)}B</td>
                          <td className="p-4 text-right">
                            <Button asChild size="sm" className="rounded-full">
                              <Link href={`/asset/${item.symbol.toLowerCase()}`}>Trade</Link>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </main>
  )
}
