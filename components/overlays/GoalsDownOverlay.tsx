import { useEventStore } from '@/store/useEvent'
import { useTeamStore } from '@/store/useTeam'
import { useTimeStore } from '@/store/useTime'
import { useState, useEffect } from 'react'

interface EventGoal {
  logo: string
  playerName: string
  goalMessage: string
}
const GoalsDownOverlay = () => {
  const { homeTeam, awayTeam } = useTeamStore()
  const { time, period } = useTimeStore()
  const { events } = useEventStore()
  const [notification, setNotification] = useState<EventGoal | null>(null)

  useEffect(() => {
    if (events.length > 0) {
      const latestEvent = events[events.length - 1]

      if (latestEvent.type === 'goal') {
        const team = latestEvent.teamId === 'home' ? homeTeam : awayTeam
        const player = team.players.find((p) => p.id === latestEvent.playerId)

        if (player) {
          const message = `${player.number}. ${player.name}`
          const goalMessage = `${latestEvent.minute}' GOAL !!!!!!`

          const notification: EventGoal = {
            logo: team.logo ?? '/placeholder.svg',
            playerName: message,
            goalMessage,
          }

          setNotification(notification)

          // Remove notification after 5 seconds
          // setTimeout(() => {
          //   setNotification(null)
          // }, 5000)
        }
      }
    }
  }, [events, homeTeam, awayTeam])

  return (
    <div
      className="relative font-['Roboto_Condensed'] w-[50vw] h-[15vh]"
    >
      <div
        className="absolute -top-[4px] left-0 right-0 h-[4px]"
        style={{
          background: 'linear-gradient(90deg, #0534da 0%, #4bded8 100%)',
        }}
      ></div>
      <div className=" text-xl font-bold absolute top-0 -left-16 flex items-center h-[100%]">
        <img
          src="/logoEquipo.png"
          alt="Logo"
          className="h-[90%] w-full object-contain"
        />
      </div>
      <div className="flex flex-col h-[100%]">
        <div
          className="h-[50%] w-full flex justify-center items-center"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,7,85,1) 0%, rgba(0,44,198,1) 100%)',
          }}
        >
          <span className="text-white text-center text-2xl font-bold">
            {notification?.playerName}
          </span>
        </div>
        <div
          className="h-[50%] bg-[rgba(0,7,85,1)] w-full flex justify-center items-center"
        >
          <span className="text-white text-2xl font-bold">
            {notification?.goalMessage}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GoalsDownOverlay
