"use client"

import { useState } from "react"
import { Search, MapPin, List, Zap, Clock, Users, Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import WiFiCard from "@/components/wifi-card"
import { cn } from "@/lib/utils"
import ClientMap from "@/components/map"

const mockHotspots = [
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
  },
  {
    id: "sf-public-library",
    name: "SF Public Library Main",
    address: "100 Larkin St, San Francisco, CA",
    category: "municipal" as const,
    distance: "0.5 miles",
    speed: "78 Mbps",
    hours: "9:00 AM - 8:00 PM",
    isOpen: true,
    amenities: ["Free", "Quiet", "Accessible", "Outlets"],
    rating: 4.7,
  },
  {
    id: "dolores-park-wifi",
    name: "Dolores Park Free WiFi",
    address: "Dolores Park, San Francisco, CA",
    category: "open" as const,
    distance: "1.2 miles",
    speed: "23 Mbps",
    hours: "24/7",
    isOpen: true,
    amenities: ["Outdoor", "Free", "Park"],
    rating: 3.8,
  },
  {
    id: "blue-bottle-coffee",
    name: "Blue Bottle Coffee",
    address: "66 Mint St, San Francisco, CA",
    category: "customer" as const,
    distance: "0.8 miles",
    speed: "52 Mbps",
    hours: "6:00 AM - 7:00 PM",
    isOpen: true,
    amenities: ["Coffee", "Outlets", "Quiet"],
    rating: 4.5,
  },
]

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = [
    { id: "open", label: "Open Wi-Fi", icon: Zap },
    { id: "customer", label: "Customer Wi-Fi", icon: Users },
    { id: "municipal", label: "Municipal", icon: MapPin },
    { id: "24h", label: "24/7", icon: Clock },
    { id: "accessible", label: "Accessible", icon: Accessibility },
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealOnView className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Browse Wi-Fi Hotspots</h1>
                <p className="text-white/70">Discover reliable internet connections near you</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className={cn("rounded-full", viewMode !== "map" && "bg-white/5 border-white/20 hover:bg-white/10")}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Map
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={cn("rounded-full", viewMode !== "list" && "bg-white/5 border-white/20 hover:bg-white/10")}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>
            </div>
          </RevealOnView>

          {/* Search and Filters */}
          <RevealOnView delay={0.1} className="mb-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon
                    const isSelected = selectedFilters.includes(filter.id)
                    return (
                      <Button
                        key={filter.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(filter.id)}
                        className={cn("rounded-full", !isSelected && "bg-white/5 border-white/20 hover:bg-white/10")}
                      >
                        <Icon className="h-3 w-3 mr-1" />
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

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map/List View */}
            <div className="lg:col-span-2">
              <RevealOnView delay={0.2}>
                {viewMode === "map" ? (
                  <ClientMap position={[37.7749, -122.4194]} />
                ) : (
                  <div className="space-y-4">
                    {mockHotspots.map((hotspot, idx) => (
                      <WiFiCard key={hotspot.id} {...hotspot} revealDelay={idx * 0.05} />
                    ))}
                  </div>
                )}
              </RevealOnView>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Results Summary */}
              <RevealOnView delay={0.3}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="font-semibold mb-4">Search Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Total locations:</span>
                      <span className="font-medium">{mockHotspots.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Open now:</span>
                      <span className="font-medium text-green-400">{mockHotspots.filter((h) => h.isOpen).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Average speed:</span>
                      <span className="font-medium">49 Mbps</span>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              {/* Quick Filters */}
              <RevealOnView delay={0.4}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="font-semibold mb-4">Quick Filters</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      High Speed (50+ Mbps)
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Open Late (after 9 PM)
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Good for Work
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Accessibility className="h-4 w-4 mr-2" />
                      Wheelchair Accessible
                    </Button>
                  </div>
                </div>
              </RevealOnView>

              {/* Nearby Areas */}
              <RevealOnView delay={0.5}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="font-semibold mb-4">Nearby Areas</h3>
                  <div className="space-y-2">
                    {["Downtown", "Mission District", "Castro", "Haight-Ashbury", "Chinatown"].map((area) => (
                      <button
                        key={area}
                        className="block w-full text-left text-sm text-white/70 hover:text-white py-1 transition-colors"
                      >
                        {area}
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
