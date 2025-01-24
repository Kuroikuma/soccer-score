"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { useTeamStore } from "@/store/useTeam"
import { useTimeStore } from "@/store/useTime"
import { useEventStore } from "@/store/useEvent"

interface EventNotification {
  id: string
  message: string
  timestamp: number
}

export function ScoreboardOverlay() {
  const { homeTeam, awayTeam } = useTeamStore()
  const { time, period  } = useTimeStore()
  const { events } = useEventStore()
  const [notifications, setNotifications] = useState<EventNotification[]>([])
  const activePeriod = period.find((p) => p.active)?.name || "1st Half"

  // Format time as MM:SS
  const formatTime = (minutes: number, seconds: number) => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  // Handle new events
  useEffect(() => {
    if (events.length > 0) {
      const latestEvent = events[events.length - 1]
      const team = latestEvent.teamId === "home" ? homeTeam : awayTeam
      const player = team.players.find((p) => p.id === latestEvent.playerId)

      if (player) {
        const message = `${player.number} ${player.name}`
        const notification: EventNotification = {
          id: latestEvent.id,
          message,
          timestamp: Date.now(),
        }

        setNotifications((prev) => [...prev, notification])

        // Remove notification after 5 seconds
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== latestEvent.id))
        }, 5000)
      }
    }
  }, [events, homeTeam, awayTeam])

  return (
    <div className="relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Main Scoreboard */}
          <div className="grid grid-cols-[1fr,auto,1fr,auto] items-stretch bg-black text-white">
            {/* Home Team */}
            <div className="flex items-center bg-[#F7A74A] p-2">
              <img
                src={homeTeam.logo || "/placeholder.svg"}
                alt={homeTeam.name}
                className="h-8 w-8 mr-2 object-contain"
              />
              <span className="font-bold text-xl">{homeTeam.name}</span>
            </div>

            {/* Score */}
            <div className="flex items-center justify-center bg-white text-black px-6 text-3xl font-bold">
              {homeTeam.score}
            </div>

            {/* Away Team */}
            <div className="flex items-center bg-[#C41E3A] p-2">
              <img
                src={awayTeam.logo || "/placeholder.svg"}
                alt={awayTeam.name}
                className="h-8 w-8 mr-2 object-contain"
              />
              <span className="font-bold text-xl">{awayTeam.name}</span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-center bg-gray-200 text-black px-6 text-2xl font-bold">
              {formatTime(time.minutes, time.seconds)}
            </div>
          </div>

          {/* Event Display */}
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center bg-black/90 text-white mt-1">
              <div className="flex items-center bg-black p-2 flex-1">
                <div className="bg-gray-800 px-3 py-1 mr-3 text-xl font-bold">{notification.message.split(" ")[0]}</div>
                <div className="text-xl">{notification.message.split(" ").slice(1).join(" ")}</div>
                <ChevronUp className="ml-auto text-green-500" size={24} />
              </div>
              {time.stoppage > 0 && (
                <div className="bg-gray-200 text-black px-4 py-2 font-bold text-xl">+{time.stoppage}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

