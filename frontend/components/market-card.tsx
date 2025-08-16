import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import RevealOnView from "@/components/reveal-on-view"

type MarketCardProps = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  type: "artist" | "genre" | "song"
  href: string
  revealDelay?: number
}

export default function MarketCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  type,
  href,
  revealDelay = 0,
}: MarketCardProps) {
  const isPositive = change >= 0
  const gradientFrom = type === "artist" ? "#0f172a" : type === "genre" ? "#111827" : "#0b132b"
  const gradientTo = type === "artist" ? "#6d28d9" : type === "genre" ? "#2563eb" : "#5bc0be"

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
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{symbol}</h3>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {type}
                </Badge>
              </div>
              <p className="text-sm text-white/70 truncate max-w-[200px]">{name}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">${price.toFixed(2)}</div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  isPositive ? "text-green-400" : "text-red-400",
                )}
              >
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {isPositive ? "+" : ""}
                {changePercent.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/50 mb-4">
            <span>Volume: {volume.toLocaleString()}</span>
            <span>
              {isPositive ? "+" : ""}${change.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button asChild size="sm" className="flex-1 rounded-full">
              <Link href={href}>View Details</Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-white/5 border-white/20 hover:bg-white/10">
              Trade
            </Button>
          </div>
        </div>
      </div>
    </RevealOnView>
  )
}
