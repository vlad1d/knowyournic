"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Building, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

type LocationResult = {
  id: string
  name: string
  address: string
  type: "business" | "landmark" | "address"
  coordinates?: { lat: number; lng: number }
}

type LocationSearchProps = {
  onLocationSelect: (location: LocationResult) => void
  placeholder?: string
  className?: string
}

export default function LocationSearch({
  onLocationSelect,
  placeholder = "Search for a location...",
  className,
}: LocationSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<LocationResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Geocoding search function using Nominatim
  const searchLocations = async (searchQuery: string): Promise<LocationResult[]> => {
    if (!searchQuery.trim()) return []

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=10&addressdetails=1`
      )
      
      if (!response.ok) {
        throw new Error('Geocoding request failed')
      }

      const data = await response.json()
      
      return data.map((item: any, index: number) => ({
        id: `${index}`,
        name: item.display_name.split(',')[0] || item.display_name,
        address: item.display_name,
        type: item.type === 'amenity' ? 'business' : 
              item.type === 'historic' ? 'landmark' : 'address',
        coordinates: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon)
        }
      }))
    } catch (error) {
      console.error('Geocoding error:', error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.length > 2) {
        const searchResults = await searchLocations(query)
        setResults(searchResults)
        setIsOpen(searchResults.length > 0)
        setSelectedIndex(-1)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 500) // Increased delay for API calls

    return () => clearTimeout(delayedSearch)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleLocationSelect(results[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleLocationSelect = (location: LocationResult) => {
    setQuery(location.name + " - " + location.address)
    setIsOpen(false)
    setSelectedIndex(-1)
    onLocationSelect(location)
  }

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "business":
        return <Building className="h-4 w-4 text-blue-400" />
      case "landmark":
        return <Navigation className="h-4 w-4 text-purple-400" />
      default:
        return <MapPin className="h-4 w-4 text-white/60" />
    }
  }

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/50"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/20 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
          {results.map((location, index) => (
            <button
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0",
                selectedIndex === index && "bg-white/10",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getLocationIcon(location.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">{location.name}</div>
                  <div className="text-sm text-white/70 truncate">{location.address}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.length > 2 && results.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/20 rounded-lg shadow-2xl z-50 p-4 text-center">
          <div className="text-white/70">No locations found</div>
          <div className="text-sm text-white/50 mt-1">Try a different search term</div>
        </div>
      )}
    </div>
  )
}
