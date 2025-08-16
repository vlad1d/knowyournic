"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Map, Search, Info, HelpCircle, Wifi, Plus } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Browse", icon: Map },
  { href: "/search", label: "Search", icon: Search },
  { href: "/about", label: "About", icon: Info },
  { href: "/help", label: "Help", icon: HelpCircle },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 px-3 py-2">
              <Wifi className="h-6 w-6 text-white/80" />
              <div className="text-xl font-extrabold tracking-tight">wifinder</div>
              <div className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Submit Hotspot Button */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Submit Hotspot</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
