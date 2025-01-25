"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { useTeamStore } from "@/store/useTeam"
import { useTimeStore } from "@/store/useTime"
import { useEventStore } from "@/store/useEvent"
import STActivoSVG from "./svg/logo-st-activo"

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
    <div className="relative font-['Roboto_Condensed']">
      <div className="w-[50vw]">
        <div className="relative">
          {/* Main Scoreboard */}
          <div className="flex items-stretch text-white">
            {/* Time */}
            <STActivoSVG />
            <div className="flex items-center justify-center bg-white text-2xl font-bold px-4 " style={{color: "#00003d"}}>
              {formatTime(time.minutes, time.seconds)}
            </div>
            {/* Home Team */}
           <div className="flex bg-[#16348c]">
            <div className="flex flex-col h-full w-3">
              <div className={`h-[50%] w-full`} style={{background: homeTeam.primaryColor}}></div>
              <div className={`h-[50%] w-full`} style={{background: homeTeam.secondaryColor}}></div>
            </div>
            <div className="flex items-center p-2 pl-4 pr-8 border-l-2 border-[#0a41f6]" style={{background: "linear-gradient(90deg, rgba(0,7,85,1) 0%, rgba(0,44,198,1) 100%)", clipPath: "polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0)"}}>
              <span className="font-bold text-xl">{homeTeam.name}</span>
            </div>

            {/* Score */}
            <div className="flex items-center justify-center text-white px-6 text-3xl font-bold">
              {homeTeam.score}
            </div>

            <div className="flex items-center justify-center text-white px-6 text-3xl font-bold border-l-2 border-[#0a41f6]">
              {awayTeam.score}
            </div>

            {/* Away Team */}
            <div className="flex items-center p-2 pr-4 pl-8 border-r-2 border-[#0a41f6]" style={{background: "linear-gradient(90deg, rgba(0,44,198,1) 0%, rgba(0,7,85,1) 100%)", clipPath:"polygon(100% 0, 100% 100%, 10% 100%, 0 50%, 10% 0)"}}>
              <span className="font-bold text-xl">{awayTeam.name}</span>
            </div>
            <div className="flex flex-col h-full w-3">
              <div className={`h-[50%] w-full`} style={{background: awayTeam.primaryColor}}></div>
              <div className={`h-[50%] w-full`} style={{background: awayTeam.secondaryColor}}></div>
            </div>
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

