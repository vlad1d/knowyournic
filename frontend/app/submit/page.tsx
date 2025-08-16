"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Wifi, Users, Camera, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import LocationSearch from "@/components/location-search"
import DotGridShader from "@/components/DotGridShader"
import { cn } from "@/lib/utils"
import Link from "next/link"

type LocationResult = {
  id: string
  name: string
  address: string
  type: "business" | "landmark" | "address"
  coordinates?: { lat: number; lng: number }
}

type FormData = {
  location: LocationResult | null
  wifiName: string
  wifiPassword: string
  category: "open" | "customer" | "municipal"
  description: string
  speedTest: {
    download: string
    upload: string
    ping: string
  }
  submitterInfo: {
    name: string
    email: string
    relationship: string
  }
}

const initialFormData: FormData = {
  location: null,
  wifiName: "",
  wifiPassword: "",
  category: "customer",
  description: "",
  speedTest: {
    download: "",
    upload: "",
    ping: "",
  },
  submitterInfo: {
    name: "",
    email: "",
    relationship: "",
  },
}

export default function SubmitHotspotPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 2

  const handleLocationSelect = (location: LocationResult) => {
    setFormData((prev) => ({ ...prev, location }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

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

  if (isSubmitted) {
    return (
      <main className="bg-neutral-950 text-white min-h-screen flex items-center justify-center">
        <div className="px-4 py-8 w-full">
          <div className="mx-auto max-w-md">
            <RevealOnView intensity="hero" className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Submission Received!</h1>
              <p className="text-white/70 mb-8">
                Thank you for contributing to our community. We'll review your submission and add it to our database
                within 24-48 hours.
              </p>
              <div className="space-y-4">
                <Button asChild className="w-full rounded-full">
                  <Link href="/map">Browse Wi-Fi Spots</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                >
                  <Link href="/submit">Submit Another</Link>
                </Button>
              </div>
            </RevealOnView>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <RevealOnView className="mb-6">
            <Button asChild variant="ghost" className="text-white/70 hover:text-white">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </RevealOnView>

          {/* Header */}
          <RevealOnView intensity="hero" className="text-center mb-12">
            <h1 className="text-4xl font-black leading-tight mb-4">Submit a Wi-Fi Hotspot</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Help others find reliable internet by sharing Wi-Fi locations you know about
            </p>
          </RevealOnView>

          {/* Progress Bar */}
          {/* <RevealOnView delay={0.1} className="mb-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/70">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-white/70">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-4 text-xs text-white/60">
                <span>Location</span>
                <span>Wi-Fi Details</span>
                <span>Amenities</span>
                <span>Review</span>
              </div>
            </div>
          </RevealOnView> */}

          {/* Form Steps */}
          <div className="space-y-8">
            {/* Step 1: Location */}
            {currentStep === 1 && (
              <RevealOnView delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-blue-400" />
                    <h2 className="text-2xl font-bold">Location Information</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Location Search */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Search for the location *</label>
                      <LocationSearch
                        onLocationSelect={handleLocationSelect}
                        placeholder="Start typing the business name or address..."
                      />
                      {formData.location && (
                        <div className="mt-3 p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <div>
                              <div className="font-medium">{formData.location.name}</div>
                              <div className="text-sm text-white/70">{formData.location.address}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-3">Wi-Fi Category *</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { value: "open", label: "Open Wi-Fi", desc: "Free public access" },
                          { value: "customer", label: "Customer Wi-Fi", desc: "For customers only" },
                          { value: "municipal", label: "Municipal", desc: "Government provided" },
                        ].map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, category: category.value as any }))}
                            className={cn(
                              "p-4 rounded-lg border text-left transition-all",
                              formData.category === category.value
                                ? "border-white/30 bg-white/10"
                                : "border-white/20 bg-white/5 hover:bg-white/10",
                            )}
                          >
                            <div className="font-medium mb-1">{category.label}</div>
                            <div className="text-sm text-white/60">{category.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Description (Optional)</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the location and Wi-Fi access..."
                        rows={3}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </RevealOnView>
            )}
            {/* Step 2: Review & Submit */}
            {currentStep === 2 && (
              <RevealOnView delay={0.2}>
                <div className="space-y-6">
                  {/* Review */}
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                    <h2 className="text-2xl font-bold mb-6">Review Your Submission</h2>

                    {formData.location && (
                      <div className="space-y-6">
                        {/* Location Summary */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                            <div>
                              <h3 className="font-semibold">{formData.location.name}</h3>
                              <p className="text-white/70 text-sm">{formData.location.address}</p>
                              <Badge
                                variant="secondary"
                                className={cn("mt-2 capitalize", getCategoryColor(formData.category))}
                              >
                                {formData.category} Wi-Fi
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Wi-Fi Details */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            Wi-Fi Information
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-white/70">Network:</span>
                              <span className="ml-2">{formData.wifiName || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="text-white/70">Password:</span>
                              <span className="ml-2">{formData.wifiPassword || "No password"}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Submitter Info */}
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                    <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Your Name *</label>
                        <input
                          type="text"
                          value={formData.submitterInfo.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              submitterInfo: { ...prev.submitterInfo, name: e.target.value },
                            }))
                          }
                          placeholder="John Doe"
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Your Email *</label>
                        <input
                          type="email"
                          value={formData.submitterInfo.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              submitterInfo: { ...prev.submitterInfo, email: e.target.value },
                            }))
                          }
                          placeholder="john@example.com"
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white/70 mb-2">Relationship to Location</label>
                        <select
                          value={formData.submitterInfo.relationship}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              submitterInfo: { ...prev.submitterInfo, relationship: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        >
                          <option value="" className="bg-neutral-900">
                            Select relationship
                          </option>
                          <option value="customer" className="bg-neutral-900">
                            Customer/Visitor
                          </option>
                          <option value="employee" className="bg-neutral-900">
                            Employee
                          </option>
                          <option value="owner" className="bg-neutral-900">
                            Business Owner
                          </option>
                          <option value="other" className="bg-neutral-900">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnView>
            )}

            {/* Navigation Buttons */}
            <RevealOnView delay={0.3}>
              <div className="flex justify-between items-center pt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className="rounded-full bg-white/5 border-white/20 hover:bg-white/10 disabled:opacity-50"
                >
                  Previous
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        index + 1 <= currentStep ? "bg-blue-400" : "bg-white/20",
                      )}
                    />
                  ))}
                </div>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                    disabled={currentStep === 1 && !formData.location}
                    className="rounded-full"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      !formData.location ||
                      !formData.wifiName ||
                      !formData.submitterInfo.name ||
                      !formData.submitterInfo.email
                    }
                    className="rounded-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Hotspot"}
                  </Button>
                )}
              </div>
            </RevealOnView>
          </div>

          {/* Help Text */}
          <RevealOnView delay={0.4} className="mt-12">
            <div className="text-center rounded-2xl border border-white/10 bg-neutral-900/60 p-6 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-5">
                <DotGridShader />
              </div>
              <div className="relative">
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-white/70 mb-4">
                  All submissions are reviewed by our team before being added to the database. This helps ensure
                  accuracy and quality.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                >
                  <Link href="/help">View Submission Guidelines</Link>
                </Button>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </main>
  )
}
