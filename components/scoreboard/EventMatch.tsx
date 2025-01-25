import { useEffect, useState } from 'react'
import { useEventStore } from '@/store/useEvent'
import { useTeamStore } from '@/store/useTeam'
import { useTimeStore } from '@/store/useTime'
import { ChevronUp } from 'lucide-react'

export interface EventNotification {
  type: 'yellowCard' | 'redCard',
  minute: number,
  logo: string,
  playerName: string,
}

export function EventMatch() {
  const { homeTeam, awayTeam } = useTeamStore()
  const { time, period } = useTimeStore()
  const { events } = useEventStore()
  const [notification, setNotification] = useState<EventNotification | null>(
    null
  )

  useEffect(() => {
    if (events.length > 0) {
      const latestEvent = events[events.length - 1]

      if (latestEvent.type === 'yellowCard' || latestEvent.type === 'redCard') {

        const team = latestEvent.teamId === 'home' ? homeTeam : awayTeam
        const player = team.players.find((p) => p.id === latestEvent.playerId)

        if (player) {
          const message = `${player.number} ${player.name}`
          const notification: EventNotification = {
            type: latestEvent.type,
            minute: latestEvent.minute,
            logo: team.logo ?? '/placeholder.svg',
            playerName: player.name,
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
      className="flex relative items-center w-full h-[50px] border-t-2"
      style={{
        // borderColor: 'linear-gradient(90deg, #0534da 0%, #4bded8 100%)',
        background:
          'linear-gradient(90deg, rgba(0,7,85,1) 0%, rgba(0,44,198,1) 100%)',
      }}
    >
      <div
        className="absolute -top-[2px] left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, #0534da 0%, #4bded8 100%)',
        }}
      ></div>
      {notification && (
        
          <div className="flex justify-between w-full items-center pr-4">
            <div className=" text-xl font-bold">
              <img src="/logoEquipo.png" alt="Logo" className="h-12 w-full object-contain" />
            </div>
            <div className="text-xl">
              {notification.playerName}
            </div>
            {notification.type === 'yellowCard' ? <div className='bg-yellow-500 h-9 w-6'></div> : <div className='bg-red-500'></div>}
          </div>
       
      )}
    </div>
  )
}
