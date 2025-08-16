"use client"

import { useState } from "react"
import { Shield, Lock, Eye, AlertTriangle, Plus, Minus, HelpCircle, FileText } from "lucide-react"
import RevealOnView from "@/components/reveal-on-view"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const safetyTips = [
  {
    icon: Shield,
    title: "Use a VPN",
    description:
      "Always connect through a Virtual Private Network to encrypt your internet traffic and protect your data from potential eavesdroppers.",
    details:
      "We recommend services like NordVPN, ExpressVPN, or ProtonVPN. Many offer free tiers for basic protection.",
  },
  {
    icon: Lock,
    title: "Look for HTTPS",
    description:
      "Only visit websites that use HTTPS (look for the lock icon in your browser). This ensures your data is encrypted between your device and the website.",
    details:
      "Most modern browsers will warn you when visiting non-HTTPS sites. Pay attention to these warnings on public Wi-Fi.",
  },
  {
    icon: Eye,
    title: "Avoid Sensitive Activities",
    description:
      "Don't access banking, shopping, or other sensitive accounts on public Wi-Fi unless absolutely necessary and you're using a VPN.",
    details:
      "If you must access sensitive information, consider using your phone's mobile data instead of public Wi-Fi.",
  },
  {
    icon: AlertTriangle,
    title: "Beware of Fake Networks",
    description:
      "Criminals sometimes create fake Wi-Fi networks with names similar to legitimate ones. Always verify the network name with staff.",
    details:
      "Networks like 'Starbucks_Free' or 'Airport_WiFi' without proper authentication might be fake. When in doubt, ask.",
  },
]

const faqs = [
  {
    question: "How do I submit a new Wi-Fi hotspot?",
    answer:
      "Click the 'Submit Hotspot' button in the navigation or visit our submission page. You'll need to provide the location name, address, Wi-Fi details, and any relevant amenities. All submissions are reviewed before being added to our database.",
  },
  {
    question: "How do you verify the accuracy of Wi-Fi information?",
    answer:
      "We use a combination of community verification, automated checks, and partnerships with businesses. Users can report outdated information, and we regularly audit our database to ensure accuracy.",
  },
  {
    question: "Can I remove my business from WiFiSpot?",
    answer:
      "Yes, business owners can request removal of their location from our database. Contact us with proof of ownership and we'll process your request within 48 hours.",
  },
  {
    question: "How do speed tests work?",
    answer:
      "Users can run speed tests directly from our app, which measures download/upload speeds and latency. These results are anonymized and aggregated to provide average speeds for each location.",
  },
  {
    question: "Is WiFiSpot free to use?",
    answer:
      "Yes, WiFiSpot is completely free for users. We're supported by partnerships with businesses and optional donations from our community.",
  },
  {
    question: "How do I report incorrect information?",
    answer:
      "Each location page has a 'Report Issue' button. You can also contact us directly with corrections. We appreciate community help in keeping our data accurate.",
  },
  {
    question: "Can I use WiFiSpot offline?",
    answer:
      "You can save locations for offline viewing, but you'll need an internet connection to access real-time information like current hours and speed tests.",
  },
  {
    question: "How do you protect user privacy?",
    answer:
      "We don't track your location without permission, don't store personal browsing data, and only collect minimal information needed to provide our service. See our privacy policy for full details.",
  },
]

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"safety" | "faq" | "submit">("safety")

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <RevealOnView intensity="hero" className="text-center mb-12">
            <h1 className="text-4xl font-black leading-tight mb-4">Help & Safety</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Learn how to use public Wi-Fi safely and get answers to common questions
            </p>
          </RevealOnView>

          {/* Tabs */}
          <RevealOnView delay={0.1} className="mb-8">
            <div className="flex justify-center">
              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-1">
                <div className="flex">
                  {[
                    { id: "safety", label: "Wi-Fi Safety", icon: Shield },
                    { id: "faq", label: "FAQ", icon: HelpCircle },
                    { id: "submit", label: "Submit & Remove", icon: FileText },
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors",
                          activeTab === tab.id
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Content */}
          <div className="space-y-8">
            {activeTab === "safety" && (
              <>
                {/* Safety Introduction */}
                <RevealOnView delay={0.2}>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Shield className="h-6 w-6 text-green-400" />
                      Using Public Wi-Fi Safely
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Public Wi-Fi networks can be convenient, but they also pose security risks. Follow these essential
                      tips to protect your personal information and stay safe online.
                    </p>
                  </div>
                </RevealOnView>

                {/* Safety Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safetyTips.map((tip, idx) => (
                    <RevealOnView key={tip.title} delay={0.3 + idx * 0.1}>
                      <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <tip.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                            <p className="text-white/70 mb-3">{tip.description}</p>
                            <p className="text-white/60 text-sm">{tip.details}</p>
                          </div>
                        </div>
                      </div>
                    </RevealOnView>
                  ))}
                </div>

                {/* Additional Safety Info */}
                <RevealOnView delay={0.7}>
                  <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Important Reminder</h3>
                        <p className="text-white/80">
                          While we strive to provide accurate information about Wi-Fi hotspots, we cannot guarantee the
                          security of any public network. Always use your best judgment and follow security best
                          practices when connecting to public Wi-Fi.
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealOnView>
              </>
            )}

            {activeTab === "faq" && (
              <RevealOnView delay={0.2}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-semibold pr-4">{faq.question}</span>
                        {openFaq === idx ? (
                          <Minus className="h-5 w-5 text-white/70 flex-shrink-0" />
                        ) : (
                          <Plus className="h-5 w-5 text-white/70 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === idx && (
                        <div className="px-6 pb-6">
                          <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </RevealOnView>
            )}

            {activeTab === "submit" && (
              <div className="space-y-8">
                <RevealOnView delay={0.2}>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                    <h2 className="text-2xl font-bold mb-6">Submit a Wi-Fi Hotspot</h2>
                    <div className="space-y-4">
                      <p className="text-white/70">
                        Help grow our community database by submitting Wi-Fi hotspots you've discovered. Your
                        contributions help others find reliable internet access.
                      </p>
                      <div className="space-y-3">
                        <h3 className="font-semibold">What information do we need?</h3>
                        <ul className="space-y-2 text-white/70">
                          <li>• Location name and address</li>
                          <li>• Wi-Fi network name and password (if applicable)</li>
                          <li>• Hours of operation</li>
                          <li>• Available amenities (outlets, seating, etc.)</li>
                          <li>• Speed test results (optional but helpful)</li>
                        </ul>
                      </div>
                      <Button className="rounded-full">Submit New Hotspot</Button>
                    </div>
                  </div>
                </RevealOnView>

                <RevealOnView delay={0.3}>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                    <h2 className="text-2xl font-bold mb-6">Remove a Listing</h2>
                    <div className="space-y-4">
                      <p className="text-white/70">
                        Business owners can request removal of their location from our database. We respect your right
                        to control how your business information is shared.
                      </p>
                      <div className="space-y-3">
                        <h3 className="font-semibold">Removal process:</h3>
                        <ul className="space-y-2 text-white/70">
                          <li>• Contact us with your business details</li>
                          <li>• Provide proof of ownership or authorization</li>
                          <li>• We'll process your request within 48 hours</li>
                          <li>• You'll receive confirmation once removed</li>
                        </ul>
                      </div>
                      <Button variant="outline" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
                        Request Removal
                      </Button>
                    </div>
                  </div>
                </RevealOnView>

                <RevealOnView delay={0.4}>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
                    <h2 className="text-2xl font-bold mb-6">Report Issues</h2>
                    <p className="text-white/70 mb-4">
                      Found incorrect information? Help us keep our database accurate by reporting issues.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
                        Report Incorrect Info
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full bg-white/5 border-white/20 hover:bg-white/10"
                      >
                        <Link href="mailto:support@wifispot.com">Contact Support</Link>
                      </Button>
                    </div>
                  </div>
                </RevealOnView>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <RevealOnView delay={0.8} className="mt-16">
            <div className="text-center rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-white/70 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link href="mailto:support@wifispot.com">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
                  <Link href="/about">About Us</Link>
                </Button>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </main>
  )
}
