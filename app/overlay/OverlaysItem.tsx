
import { useEffect } from 'react'
import { IOverlays } from '@/store/interfaces'
import { useOverlaysStore } from '@/store/overlayStore'
import socket from '@/services/socket'
import { ScoreboardOverlay } from '@/components/overlays/ScoreboardOverlay'
import { FormationOverlay } from '@/components/overlays/FormationOverlay'
import GoalsDownOverlay from '@/components/overlays/GoalsDownOverlay'


interface IOverlaysItemProps {
  item: IOverlays
  gameId: string
}

interface ISocketPosition {
  x: number
  y: number
}

interface ISocketScale {
  scale: number
}

interface ISocketVisible {
  visible: boolean
}

interface ScorebugProps {
  item: IOverlays
}

export const OverlaysItem = ({ item, gameId }: IOverlaysItemProps) => {
  const { handlePositionOverlay, handleVisibleOverlay, handleScaleOverlay } =
    useOverlaysStore()

  useEffect(() => {
    const eventName = `server:handlePositionOverlay/${gameId}/${item.id}`
    const eventNameScale = `server:handleScaleOverlay/${gameId}/${item.id}`
    const eventNameVisible = `server:handleVisibleOverlay/${gameId}/${item.id}`

    const handlePosition = (imagesSocket: ISocketPosition) => {
      handlePositionOverlay(
        item.id,
        { x: imagesSocket.x, y: imagesSocket.y },
        false
      )
    }

    const handleScale = (imagesSocket: ISocketScale) => {
      handleScaleOverlay(item.id, imagesSocket.scale, false)
    }

    const handleVisible = (imagesSocket: ISocketVisible) => {
      handleVisibleOverlay(item.id, imagesSocket.visible, false)
    }

    socket.on(eventName, handlePosition)
    socket.on(eventNameScale, handleScale)
    socket.on(eventNameVisible, handleVisible)

    return () => {
      socket.off(eventName, handlePosition)
      socket.off(eventNameScale, handleScale)
      socket.off(eventNameVisible, handleVisible)
    }
  }, [gameId, item.id])

  return item.id === 'scoreboardUp' ? (
    <ScoreboardOverlay />
  ) : item.id === 'formation' ? (
    // <FormationOverlay />
    <></>
  ) : item.id === 'goalsDown' ? (
    <GoalsDownOverlay />
  ) : <></>
}

const ScoreBoard = ({ item }: ScorebugProps) => {
  return (
    <div className="flex-1 max-w-[100%] bg-black text-white max-[768px]:px-4 flex flex-col font-['Roboto_Condensed']">
      <ScoreboardOverlay />
    </div>
  )
}
