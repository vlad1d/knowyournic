"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, MapPin, Wifi, Shield, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import DotGridShader from "@/components/DotGridShader"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"
import WiFiCard from "@/components/wifi-card"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")

  const topCities = ["New York", "San Francisco", "Los Angeles", "Chicago", "Boston", "Seattle"]

  const featuredHotspots = [
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
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <main className="bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
            {/* Left: Hero Content */}
            <div className="flex flex-col justify-center">
              <RevealOnView intensity="hero" className="space-y-6">
                <AnimatedHeading
                  className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
                  lines={["Find Wi-Fi", "Anywhere"]}
                />

                <p className="text-xl text-white/70 max-w-2xl">
                  Discover free and reliable Wi-Fi hotspots near you. From coffee shops to libraries, find the perfect
                  spot to stay connected.
                </p>

                {/* Hero Search */}
                <form onSubmit={handleSearch} className="max-w-lg">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find Wi-Fi near..."
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-lg"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                {/* Top Cities */}
                <div>
                  <p className="text-sm text-white/60 mb-3">Popular cities:</p>
                  <div className="flex flex-wrap gap-2">
                    {topCities.map((city) => (
                      <Link
                        key={city}
                        href={`/search?q=${encodeURIComponent(city)}`}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/map">
                      Browse Map
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                  >
                    <Link href="/submit">Submit Hotspot</Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div>
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm text-white/60">Wi-Fi Spots</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">200+</div>
                    <div className="text-sm text-white/60">Cities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">1M+</div>
                    <div className="text-sm text-white/60">Speed Tests</div>
                  </div>
                </div>
              </RevealOnView>
            </div>

            {/* Right: Featured Hotspots */}
            <div className="space-y-4">
              <RevealOnView delay={0.2}>
                <h3 className="text-lg font-semibold mb-4">🔥 Popular Nearby</h3>
              </RevealOnView>
              {featuredHotspots.map((hotspot, idx) => (
                <WiFiCard key={hotspot.id} {...hotspot} revealDelay={0.3 + idx * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <RevealOnView className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Wi-Fi Hotspots</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Interactive map showing thousands of verified Wi-Fi locations with real-time availability
            </p>
          </RevealOnView>

          <RevealOnView delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-2 overflow-hidden">
              <div className="aspect-[16/9] rounded-[1.35rem] bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <DotGridShader />
                </div>
                <div className="text-center relative z-10">
                  <MapPin className="h-16 w-16 text-white/60 mx-auto mb-4" />
                  <p className="text-white/70 mb-4">Interactive map preview</p>
                  <Button asChild className="rounded-full">
                    <Link href="/map">Open Full Map</Link>
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <RevealOnView className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Finding reliable Wi-Fi has never been easier</p>
          </RevealOnView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Search & Discover",
                description: "Search by location or browse our interactive map to find Wi-Fi hotspots near you.",
                step: "01",
              },
              {
                icon: Wifi,
                title: "Check Details",
                description: "View speed tests, hours, amenities, and user reviews to find the perfect spot.",
                step: "02",
              },
              {
                icon: MapPin,
                title: "Get Directions",
                description: "Get turn-by-turn directions and connect with confidence using our safety tips.",
                step: "03",
              },
            ].map((step, idx) => (
              <RevealOnView key={step.title} delay={idx * 0.1} className="group">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8 h-full text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <RevealOnView className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose WiFiSpot?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The most comprehensive and reliable Wi-Fi finder platform
            </p>
          </RevealOnView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Security tips and VPN recommendations for safe public Wi-Fi usage.",
              },
              {
                icon: Clock,
                title: "Real-Time Data",
                description: "Live updates on hours, availability, and connection quality.",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Verified by real users with reviews and speed test data.",
              },
              {
                icon: Wifi,
                title: "Speed Tested",
                description: "Actual speed measurements from our community of users.",
              },
            ].map((feature, idx) => (
              <RevealOnView key={feature.title} delay={idx * 0.1} className="group">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 h-full text-center">
                  <feature.icon className="h-10 w-10 text-white/80 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <RevealOnView className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/60 to-blue-900/60 p-8 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <DotGridShader />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Help Build the Network</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Know a great Wi-Fi spot that's not listed? Help others by submitting hotspot information.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/submit">
                    Submit a Hotspot
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                >
                  <Link href="/help">Learn More</Link>
                </Button>
              </div>
            </div>
          </RevealOnView>
        </div>
      </section>
    </main>
  )
}
