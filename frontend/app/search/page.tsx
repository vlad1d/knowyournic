"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import WiFiCard from "@/components/wifi-card"
import { cn } from "@/lib/utils"

const BACKEND_API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_BASE

const mockResults = [
  {
    id: "starbucks-union-sq",
    name: "Starbucks Union Square",
    address: "901 Market St, San Francisco, CA",
    category: "customer" as const,
    distance: "0.2 miles",
    speed: "45 Mbps",
    hours: "5:30 AM - 10:00 PM",
    isOpen: true,
    amenities: ["Outlets", "Seating", "Coffee"],
    rating: 4.2,
  }
]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState("closest")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${BACKEND_API_BASE}/api/hotspots`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch results")
        return response.json()
      })
      .then((data) => {
        const mapped = data.map((h: any) => ({
          id: h.id,
          name: h.wifiName || "Unnamed Wi-Fi",
          address: h.location?.address || "Unknown address",
          category: h.category || "open",
          speed: h.latestSpeedTest?.download != null ? `${h.latestSpeedTest.download} Mbps` : undefined,
          hours: undefined,           // default to change!!
          isOpen: true,               // default
          amenities: [],              // default
          rating: 0,                  // default
          _raw: h,
        }));
        setResults(mapped)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load results")
      })
      .finally(() => setLoading(false))
  }, [])

  const sortOptions = [
    { value: "closest", label: "Closest" },
    { value: "rating", label: "Highest Rated" },
    { value: "speed", label: "Fastest" },
    { value: "name", label: "Name A-Z" },
  ]

  const filters = [
    { id: "open", label: "Open Now" },
    { id: "free", label: "Free Wi-Fi" },
    { id: "fast", label: "High Speed" },
    { id: "outlets", label: "Power Outlets" },
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const filtered = results.filter((result) => {
    if (!query) return true
    const q = query.toLowerCase()
    const name = (result.name || "").toLowerCase()
    const address = (result.address || "").toLowerCase()
    return name.includes(q) || address.includes(q)
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name": 
        return a.name.localeCompare(b.name)
      case "speed": {
        const sa = parseFloat((a.speed || "").toString()) || 0
        const sb = parseFloat((b.speed || "").toString()) || 0
        return sb - sa
      }
      case "rating": {
        const ra = a.rating || 0
        const rb = b.rating || 0
        return rb - ra
      } // to change!! sort by distance too
      default:
        return 0
    }
  })

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <RevealOnView className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-white/70">
              <a href="/" className="hover:text-white">
                Home
              </a>
              <span>/</span>
              <span>Search Results</span>
              {query && (
                <>
                  <span>/</span>
                  <span className="text-white">"{query}"</span>
                </>
              )}
            </nav>
          </RevealOnView>

          {/* Header */}
          <RevealOnView className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{query ? `Wi-Fi near "${query}"` : "Search Results"}</h1>
                <p className="text-white/70">{sorted.length} locations found</p>
              </div>
            </div>
          </RevealOnView>

          {/* Search and Filters */}
          <RevealOnView delay={0.1} className="mb-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/70 whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-neutral-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id)
                    return (
                      <Button
                        key={filter.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(filter.id)}
                        className={cn("rounded-full", !isSelected && "bg-white/5 border-white/20 hover:bg-white/10")}
                      >
                        {filter.label}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Active Filters */}
              {selectedFilters.length > 0 && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <span className="text-sm text-white/70">Active filters:</span>
                  {selectedFilters.map((filterId) => {
                    const filter = filters.find((f) => f.id === filterId)
                    return (
                      <Badge
                        key={filterId}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20 cursor-pointer hover:bg-white/20"
                        onClick={() => toggleFilter(filterId)}
                      >
                        {filter?.label} ×
                      </Badge>
                    )
                  })}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFilters([])}
                    className="text-white/70 hover:text-white text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </RevealOnView>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Results List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {sorted.map((result, idx) => (
                  <WiFiCard key={result.id} {...result} revealDelay={idx * 0.05} />
                ))}
              </div>

              {/* Load More */}
              <RevealOnView delay={0.3} className="text-center mt-8">
                <Button variant="outline" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
                  Load More Results
                </Button>
              </RevealOnView>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search Summary */}
              <RevealOnView delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="font-semibold mb-4">Search Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Total results:</span>
                      <span className="font-medium">{sorted.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Open now:</span>
                      <span className="font-medium text-green-400">{sorted.filter((r) => r.isOpen).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Average rating:</span>
                      <span className="font-medium">
                        {sorted.length ? (sorted.reduce((acc, r) => acc + (r.rating || 0), 0) / sorted.length).toFixed(1) : "0.0"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Within 1 mile:</span>
                      <span className="font-medium">{sorted.length}</span>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              {/* Refine Search */}
              <RevealOnView delay={0.3}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="font-semibold mb-4">Refine Search</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Distance</label>
                      <select className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                        <option value="1" className="bg-neutral-900">
                          Within 1 mile
                        </option>
                        <option value="5" className="bg-neutral-900">
                          Within 5 miles
                        </option>
                        <option value="10" className="bg-neutral-900">
                          Within 10 miles
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Minimum Speed</label>
                      <select className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                        <option value="0" className="bg-neutral-900">
                          Any speed
                        </option>
                        <option value="25" className="bg-neutral-900">
                          25+ Mbps
                        </option>
                        <option value="50" className="bg-neutral-900">
                          50+ Mbps
                        </option>
                        <option value="100" className="bg-neutral-900">
                          100+ Mbps
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              {/* Related Searches */}
              <RevealOnView delay={0.4}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="font-semibold mb-4">Related Searches</h3>
                  <div className="space-y-2">
                    {[
                      "Coffee shops with Wi-Fi",
                      "Libraries near me",
                      "24/7 Wi-Fi spots",
                      "Free Wi-Fi downtown",
                      "Coworking spaces",
                    ].map((search) => (
                      <button
                        key={search}
                        className="block w-full text-left text-sm text-white/70 hover:text-white py-1 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
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
