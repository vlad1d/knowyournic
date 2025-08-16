"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, Wifi, Zap, Users, Star, Flag, ExternalLink, Camera, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data - in real app this would come from API
const locationData = {
  id: "starbucks-union-sq",
  name: "Starbucks Union Square",
  address: "901 Market St, San Francisco, CA 94103",
  category: "customer",
  description: "Popular Starbucks location in the heart of Union Square with reliable Wi-Fi and plenty of seating.",
  hours: {
    monday: "5:30 AM - 10:00 PM",
    tuesday: "5:30 AM - 10:00 PM",
    wednesday: "5:30 AM - 10:00 PM",
    thursday: "5:30 AM - 10:00 PM",
    friday: "5:30 AM - 10:00 PM",
    saturday: "6:00 AM - 10:00 PM",
    sunday: "6:00 AM - 10:00 PM",
  },
  isOpen: true,
  phone: "(415) 398-1234",
  website: "https://starbucks.com",
  amenities: ["Outlets", "Seating", "Coffee", "Restrooms", "Air Conditioning"],
  accessibility: ["Wheelchair Accessible", "Wide Doorways"],
  wifiDetails: {
    networkName: "Starbucks WiFi",
    password: "None required",
    captivePortal: true,
    customerOnly: true,
    speedTests: [
      { date: "2024-01-15", download: 45.2, upload: 12.8, ping: 23 },
      { date: "2024-01-14", download: 52.1, upload: 15.3, ping: 19 },
      { date: "2024-01-13", download: 38.9, upload: 11.2, ping: 28 },
    ],
  },
  rating: 4.2,
  reviews: [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2024-01-14",
      comment: "Great Wi-Fi speed and plenty of outlets. Perfect for working!",
    },
    {
      id: 2,
      user: "Mike R.",
      rating: 4,
      date: "2024-01-12",
      comment: "Reliable connection, but can get crowded during lunch hours.",
    },
  ],
  photos: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
}

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "photos">("overview")

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/20"
      case "customer":
        return "bg-blue-500/20 text-blue-400 border-blue-500/20"
      case "municipal":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20"
      default:
        return "bg-white/10 text-white border-white/20"
    }
  }

  const averageSpeed =
    locationData.wifiDetails.speedTests.reduce((acc, test) => acc + test.download, 0) /
    locationData.wifiDetails.speedTests.length

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <RevealOnView className="mb-6">
            <Button asChild variant="ghost" className="text-white/70 hover:text-white">
              <Link href="/map">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Map
              </Link>
            </Button>
          </RevealOnView>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <RevealOnView>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{locationData.name}</h1>
                        <Badge
                          variant="secondary"
                          className={cn("capitalize", getCategoryColor(locationData.category))}
                        >
                          {locationData.category}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-sm",
                            locationData.isOpen
                              ? "bg-green-500/20 text-green-400 border-green-500/20"
                              : "bg-red-500/20 text-red-400 border-red-500/20",
                          )}
                        >
                          {locationData.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{locationData.address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{locationData.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-blue-400" />
                          <span>{averageSpeed.toFixed(0)} Mbps avg</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="rounded-full">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/70">{locationData.description}</p>
                </div>
              </RevealOnView>

              {/* Tabs */}
              <RevealOnView delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden">
                  <div className="flex border-b border-white/10">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "reviews", label: "Reviews" },
                      { id: "photos", label: "Photos" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          "flex-1 py-3 px-4 text-sm font-medium transition-colors",
                          activeTab === tab.id
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        {/* Wi-Fi Details */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Wifi className="h-5 w-5" />
                            Wi-Fi Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">Network Name</div>
                              <div className="font-medium">{locationData.wifiDetails.networkName}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">Password</div>
                              <div className="font-medium">{locationData.wifiDetails.password}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">Average Speed</div>
                              <div className="font-medium">{averageSpeed.toFixed(0)} Mbps</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">Access</div>
                              <div className="font-medium">
                                {locationData.wifiDetails.customerOnly ? "Customer Only" : "Public"}
                              </div>
                            </div>
                          </div>
                          {locationData.wifiDetails.captivePortal && (
                            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                                <Shield className="h-4 w-4" />
                                <span>Captive portal required - you'll need to accept terms to connect</span>
                              </div>
                            </div>
                          )}
                          {locationData.wifiDetails.customerOnly && (
                            <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <div className="flex items-center gap-2 text-blue-400 text-sm">
                                <Users className="h-4 w-4" />
                                <span>Intended for customers - please make a purchase</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Amenities */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                          <div className="flex flex-wrap gap-2">
                            {locationData.amenities.map((amenity) => (
                              <Badge key={amenity} variant="outline" className="bg-white/5 border-white/20">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Accessibility */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Accessibility</h3>
                          <div className="flex flex-wrap gap-2">
                            {locationData.accessibility.map((feature) => (
                              <Badge
                                key={feature}
                                variant="outline"
                                className="bg-green-500/10 border-green-500/20 text-green-400"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Speed Tests */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Recent Speed Tests</h3>
                          <div className="space-y-2">
                            {locationData.wifiDetails.speedTests.map((test, idx) => (
                              <div key={idx} className="bg-white/5 rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <div className="text-sm text-white/70">{test.date}</div>
                                  <div className="flex gap-4 text-sm">
                                    <span>↓ {test.download} Mbps</span>
                                    <span>↑ {test.upload} Mbps</span>
                                    <span>{test.ping}ms ping</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "reviews" && (
                      <div className="space-y-4">
                        {locationData.reviews.map((review) => (
                          <div key={review.id} className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{review.user}</span>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "h-3 w-3",
                                        i < review.rating ? "text-yellow-400 fill-current" : "text-white/30",
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-white/60">{review.date}</span>
                            </div>
                            <p className="text-white/70">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "photos" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {locationData.photos.map((photo, idx) => (
                          <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-white/5">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`${locationData.name} photo ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <div className="aspect-video rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="h-8 w-8 text-white/50 mx-auto mb-2" />
                            <p className="text-white/50 text-sm">Add Photo</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </RevealOnView>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hours */}
              <RevealOnView delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(locationData.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize text-white/70">{day}:</span>
                        <span>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnView>

              {/* Contact */}
              <RevealOnView delay={0.3}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-white/70 mb-1">Phone</div>
                      <div className="font-medium">{locationData.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Website</div>
                      <a
                        href={locationData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              {/* Actions */}
              <RevealOnView delay={0.4}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                  <h3 className="text-lg font-semibold mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full rounded-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Run Speed Test
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
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
