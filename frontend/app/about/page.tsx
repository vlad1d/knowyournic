import { Users, Database, Award, Globe, Shield, Heart } from "lucide-react"
import RevealOnView from "@/components/reveal-on-view"
import DotGridShader from "@/components/DotGridShader"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Wi-Fi Locations", value: "50,000+" },
    { label: "Cities Covered", value: "200+" },
    { label: "Speed Tests", value: "1M+" },
    { label: "Active Users", value: "100K+" },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former Google engineer passionate about digital equity and connectivity.",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      bio: "Network infrastructure expert with 15+ years in telecommunications.",
    },
    {
      name: "Emily Watson",
      role: "Head of Community",
      bio: "Community builder focused on making technology accessible to everyone.",
    },
  ]

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <RevealOnView intensity="hero" className="text-center mb-16">
            <h1 className="text-5xl font-black leading-tight mb-6">Connecting Communities Through Wi-Fi</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We believe everyone deserves access to reliable internet. WiFiSpot helps people find and share Wi-Fi
              hotspots to bridge the digital divide.
            </p>
          </RevealOnView>

          {/* Mission */}
          <RevealOnView delay={0.1} className="mb-16">
            <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-5">
                <DotGridShader />
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-8 w-8 text-red-400" />
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  In an increasingly connected world, access to reliable internet shouldn't be a luxury. WiFiSpot was
                  born from the simple idea that by sharing information about Wi-Fi hotspots, we can help bridge the
                  digital divide and ensure everyone can stay connected.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Whether you're a student looking for a quiet place to study, a remote worker needing reliable
                  internet, or someone who simply can't afford home broadband, we're here to help you find the
                  connectivity you need.
                </p>
              </div>
            </div>
          </RevealOnView>

          {/* Stats */}
          <RevealOnView delay={0.2} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealOnView>

          {/* How We Source Data */}
          <RevealOnView delay={0.3} className="mb-16">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Database className="h-8 w-8 text-blue-400" />
                <h2 className="text-3xl font-bold">How We Source Our Data</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Contributions
                  </h3>
                  <p className="text-white/70 mb-4">
                    Our primary source of data comes from our amazing community of users who submit and verify Wi-Fi
                    hotspot information. Every submission is reviewed for accuracy.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Public APIs & Partnerships
                  </h3>
                  <p className="text-white/70 mb-4">
                    We partner with businesses, libraries, and municipalities to access official Wi-Fi location data and
                    keep our database current and comprehensive.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Process
                  </h3>
                  <p className="text-white/70 mb-4">
                    All submissions go through our verification process, including community voting and automated checks
                    to ensure data quality and accuracy.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Quality Assurance
                  </h3>
                  <p className="text-white/70 mb-4">
                    We regularly audit our data, remove outdated information, and encourage users to report changes to
                    maintain the highest quality database possible.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Team */}
          <RevealOnView delay={0.4} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                We're a small but passionate team dedicated to making internet access more equitable for everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={member.name} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-white/70 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </RevealOnView>

          {/* Press Kit */}
          <RevealOnView delay={0.5} className="mb-16">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Press Kit</h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Need information about WiFiSpot for media coverage? Download our press kit with logos, screenshots, and
                company information.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="rounded-full">Download Press Kit</Button>
                <Button variant="outline" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
                  Media Contact
                </Button>
              </div>
            </div>
          </RevealOnView>

          {/* Contact */}
          <RevealOnView delay={0.6}>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-white/70 mb-6">
                Have questions, suggestions, or want to partner with us? We'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link href="mailto:hello@wifispot.com">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
                  <Link href="/help">Support Center</Link>
                </Button>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </main>
  )
}
