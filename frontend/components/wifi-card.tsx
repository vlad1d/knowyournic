import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPin, Clock, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import RevealOnView from "@/components/reveal-on-view"

type WiFiCardProps = {
  id: string
  name: string
  address: string
  category: "open" | "customer" | "municipal"
  distance?: string
  speed?: string
  hours?: string
  isOpen?: boolean
  amenities: string[]
  rating?: number
  revealDelay?: number
}

export default function WiFiCard({
  id,
  name,
  address,
  category,
  distance,
  speed,
  hours,
  isOpen = true,
  amenities,
  rating,
  revealDelay = 0,
}: WiFiCardProps) {
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

  const gradientFrom = category === "open" ? "#0f172a" : category === "customer" ? "#111827" : "#0b132b"
  const gradientTo = category === "open" ? "#10b981" : category === "customer" ? "#2563eb" : "#8b5cf6"

  return (
    <RevealOnView delay={revealDelay} className="group">
      <div
        className="rounded-2xl border border-white/10 p-1 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.6)] transition-all hover:shadow-[0_20px_80px_-10px_rgba(0,0,0,0.8)]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <div className="relative overflow-hidden rounded-[1.35rem] bg-black/60 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">{name}</h3>
                <Badge variant="secondary" className={cn("capitalize text-xs", getCategoryColor(category))}>
                  {category}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-white/70 mb-2">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{address}</span>
              </div>
              {distance && <div className="text-sm text-white/60">{distance} away</div>}
            </div>
            <div className="text-right flex-shrink-0 ml-3">
              {speed && (
                <div className="flex items-center gap-1 text-sm font-medium text-white">
                  <Zap className="h-3 w-3" />
                  {speed}
                </div>
              )}
              {rating && <div className="text-xs text-white/60 mt-1">⭐ {rating.toFixed(1)}</div>}
            </div>
          </div>

          {/* Status and Hours */}
          {hours && (
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-3 w-3 text-white/50" />
              <span className="text-xs text-white/70">{hours}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  isOpen
                    ? "bg-green-500/20 text-green-400 border-green-500/20"
                    : "bg-red-500/20 text-red-400 border-red-500/20",
                )}
              >
                {isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mb-4">
            {amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="bg-white/5 border-white/20 text-xs text-white">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="outline" className="bg-white/5 border-white/20 text-xs text-white">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button asChild size="sm" className="flex-1 rounded-full">
              <Link href={`/location/${id}`}>View Details</Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </RevealOnView>
  )
}
